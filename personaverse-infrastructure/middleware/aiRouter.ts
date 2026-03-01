// middleware/aiRouter.ts
import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Model pricing per 1K tokens
const MODEL_PRICING = {
  'gpt-4': { input: 0.03, output: 0.06 },
  'claude-3-opus': { input: 0.015, output: 0.075 },
  'claude-3-sonnet': { input: 0.003, output: 0.015 },
  'gemini-pro': { input: 0.001, output: 0.002 },
  'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },
  'local-llama': { input: 0.0001, output: 0.0001 },
};

// Tier configurations
const TIER_CONFIG = {
  free: {
    models: ['local-llama', 'gpt-3.5-turbo'],
    dailyMessages: 20,
    monthlyTokens: 10000,
    fusionMode: false,
    maxResponseTokens: 500,
  },
  pro: {
    models: ['local-llama', 'gpt-3.5-turbo', 'gemini-pro', 'claude-3-sonnet'],
    dailyMessages: 200,
    monthlyTokens: 100000,
    fusionMode: false,
    maxResponseTokens: 2000,
  },
  creator: {
    models: ['local-llama', 'gpt-3.5-turbo', 'gemini-pro', 'claude-3-sonnet', 'claude-3-opus', 'gpt-4'],
    dailyMessages: Infinity,
    monthlyTokens: 500000,
    fusionMode: true,
    maxResponseTokens: 4000,
  },
};

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limiter: 10 requests per 10 seconds per IP
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

interface UserSession {
  userId: string;
  tier: 'free' | 'pro' | 'creator';
  dailyMessagesUsed: number;
  monthlyTokensUsed: number;
}

export class AIRouter {
  private redis: Redis;

  constructor() {
    this.redis = redis;
  }

  // Main routing logic
  async routeRequest(
    request: NextRequest,
    userSession: UserSession,
    prompt: string,
    requestedModel?: string
  ): Promise<NextResponse> {
    try {
      // 1. Rate limiting
      const ip = request.ip ?? '127.0.0.1';
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);
      
      if (!success) {
        return NextResponse.json(
          { error: 'Rate limit exceeded', retryAfter: reset },
          { status: 429 }
        );
      }

      // 2. Check usage limits
      const limitCheck = await this.checkUsageLimits(userSession);
      if (!limitCheck.allowed) {
        return NextResponse.json(
          { 
            error: limitCheck.reason,
            upgradeUrl: '/pricing',
            currentUsage: limitCheck.currentUsage,
            limit: limitCheck.limit,
          },
          { status: 403 }
        );
      }

      // 3. Select optimal model
      const model = await this.selectModel(
        userSession.tier,
        requestedModel,
        prompt
      );

      // 4. Check cache
      const cacheKey = this.generateCacheKey(prompt, model);
      const cached = await this.getCachedResponse(cacheKey);
      if (cached) {
        await this.logUsage(userSession, model, 0, 0, true);
        return NextResponse.json({
          ...cached,
          cached: true,
          model,
        });
      }

      // 5. Call AI provider
      const response = await this.callModel(model, prompt, userSession.tier);

      // 6. Calculate cost
      const cost = this.calculateCost(
        model,
        response.promptTokens,
        response.completionTokens
      );

      // 7. Log usage
      await this.logUsage(
        userSession,
        model,
        response.promptTokens,
        response.completionTokens,
        false,
        cost
      );

      // 8. Cache response (only for paid tiers)
      if (userSession.tier !== 'free') {
        await this.cacheResponse(cacheKey, response);
      }

      // 9. Return response
      return NextResponse.json({
        content: response.content,
        model,
        tokens: {
          prompt: response.promptTokens,
          completion: response.completionTokens,
          total: response.promptTokens + response.completionTokens,
        },
        cost,
        remaining: {
          dailyMessages: limitCheck.remainingDaily,
          monthlyTokens: limitCheck.remainingMonthly,
        },
      });

    } catch (error) {
      console.error('AI Router Error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }

  // Select optimal model based on tier and requirements
  private async selectModel(
    tier: string,
    requestedModel: string | undefined,
    prompt: string
  ): Promise<string> {
    const config = TIER_CONFIG[tier as keyof typeof TIER_CONFIG];
    const allowedModels = config.models;

    // If user requested specific model, check if allowed
    if (requestedModel && allowedModels.includes(requestedModel)) {
      return requestedModel;
    }

    // Analyze prompt complexity
    const complexity = this.analyzeComplexity(prompt);

    // Route based on complexity and cost
    if (complexity < 3) {
      // Simple query - use cheapest
      return allowedModels[0];
    } else if (complexity < 7 && allowedModels.length > 2) {
      // Medium complexity - use mid-tier
      return allowedModels[Math.floor(allowedModels.length / 2)];
    } else {
      // Complex query - use best available
      return allowedModels[allowedModels.length - 1];
    }
  }

  // Analyze prompt complexity (1-10 scale)
  private analyzeComplexity(prompt: string): number {
    let score = 5; // Base complexity

    // Length factor
    if (prompt.length < 50) score -= 2;
    if (prompt.length > 500) score += 2;

    // Complexity indicators
    const complexIndicators = [
      'explain', 'analyze', 'compare', 'evaluate',
      'code', 'debug', 'architecture', 'design',
      'creative', 'write', 'story', 'poem',
    ];
    
    complexIndicators.forEach(indicator => {
      if (prompt.toLowerCase().includes(indicator)) score += 1;
    });

    // Cap at 10
    return Math.min(10, Math.max(1, score));
  }

  // Check usage limits
  private async checkUsageLimits(userSession: UserSession): Promise<{
    allowed: boolean;
    reason?: string;
    currentUsage?: any;
    limit?: any;
    remainingDaily?: number;
    remainingMonthly?: number;
  }> {
    const config = TIER_CONFIG[userSession.tier as keyof typeof TIER_CONFIG];

    // Check daily message limit
    if (config.dailyMessages !== Infinity) {
      if (userSession.dailyMessagesUsed >= config.dailyMessages) {
        return {
          allowed: false,
          reason: 'Daily message limit reached',
          currentUsage: userSession.dailyMessagesUsed,
          limit: config.dailyMessages,
          remainingDaily: 0,
          remainingMonthly: config.monthlyTokens - userSession.monthlyTokensUsed,
        };
      }
    }

    // Check monthly token limit
    if (userSession.monthlyTokensUsed >= config.monthlyTokens) {
      return {
        allowed: false,
        reason: 'Monthly token limit reached',
        currentUsage: userSession.monthlyTokensUsed,
        limit: config.monthlyTokens,
        remainingDaily: config.dailyMessages === Infinity 
          ? Infinity 
          : config.dailyMessages - userSession.dailyMessagesUsed,
        remainingMonthly: 0,
      };
    }

    return {
      allowed: true,
      remainingDaily: config.dailyMessages === Infinity 
        ? Infinity 
        : config.dailyMessages - userSession.dailyMessagesUsed,
      remainingMonthly: config.monthlyTokens - userSession.monthlyTokensUsed,
    };
  }

  // Calculate cost
  private calculateCost(
    model: string,
    promptTokens: number,
    completionTokens: number
  ): number {
    const pricing = MODEL_PRICING[model as keyof typeof MODEL_PRICING];
    if (!pricing) return 0;

    const inputCost = (promptTokens / 1000) * pricing.input;
    const outputCost = (completionTokens / 1000) * pricing.output;
    
    return Number((inputCost + outputCost).toFixed(6));
  }

  // Log usage to database
  private async logUsage(
    userSession: UserSession,
    model: string,
    promptTokens: number,
    completionTokens: number,
    cached: boolean,
    cost?: number
  ): Promise<void> {
    const pipeline = this.redis.pipeline();

    // Increment daily messages
    pipeline.incr(`user:${userSession.userId}:daily_messages`);
    
    // Increment monthly tokens
    pipeline.incrby(
      `user:${userSession.userId}:monthly_tokens`,
      promptTokens + completionTokens
    );

    // Add to total cost
    if (cost) {
      pipeline.incrbyfloat(`user:${userSession.userId}:total_cost`, cost);
    }

    // Log request (keep last 1000)
    pipeline.lpush(
      `user:${userSession.userId}:requests`,
      JSON.stringify({
        model,
        promptTokens,
        completionTokens,
        cost,
        cached,
        timestamp: Date.now(),
      })
    );
    pipeline.ltrim(`user:${userSession.userId}:requests`, 0, 999);

    await pipeline.exec();
  }

  // Cache response
  private async cacheResponse(
    key: string,
    response: any
  ): Promise<void> {
    // Cache for 1 hour
    await this.redis.setex(key, 3600, JSON.stringify(response));
  }

  // Get cached response
  private async getCachedResponse(key: string): Promise<any | null> {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached as string) : null;
  }

  // Generate cache key
  private generateCacheKey(prompt: string, model: string): string {
    const crypto = require('crypto');
    const hash = crypto
      .createHash('md5')
      .update(`${prompt}:${model}`)
      .digest('hex');
    return `cache:${hash}`;
  }

  // Call AI model (placeholder - implement actual API calls)
  private async callModel(
    model: string,
    prompt: string,
    tier: string
  ): Promise<{
    content: string;
    promptTokens: number;
    completionTokens: number;
  }> {
    // This is where you'd integrate with actual AI providers
    // For now, return placeholder
    
    const config = TIER_CONFIG[tier as keyof typeof TIER_CONFIG];
    
    // Simulate token counting
    const promptTokens = Math.ceil(prompt.length / 4);
    const maxTokens = config.maxResponseTokens;
    const completionTokens = Math.min(
      Math.ceil(maxTokens * 0.7),
      maxTokens
    );

    return {
      content: `[Response from ${model}]`,
      promptTokens,
      completionTokens,
    };
  }
}

// Export singleton instance
export const aiRouter = new AIRouter();
