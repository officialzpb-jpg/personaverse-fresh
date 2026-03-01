# PersonaVerse AI Infrastructure - Production Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT REQUEST                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  RATE LIMITER (Redis)                                       │
│  - IP-based throttling                                      │
│  - Abuse detection                                          │
│  - Auto-block suspicious patterns                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  AUTH MIDDLEWARE                                            │
│  - Validate JWT token                                       │
│  - Extract user tier                                        │
│  - Check usage limits                                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  INTELLIGENT ROUTER                                         │
│  - Select optimal model based on tier + complexity          │
│  - Check cache first                                        │
│  - Fallback logic                                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  AI PROVIDERS                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │  GPT-4   │ │  Claude  │ │  Gemini  │ │  Cheap   │       │
│  │  $0.03   │ │  $0.008  │ │  $0.001  │ │  $0.0001 │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  COST TRACKER                                               │
│  - Log tokens used                                          │
│  - Calculate cost                                           │
│  - Update user quota                                        │
│  - Cache response                                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  RESPONSE TO CLIENT                                         │
└─────────────────────────────────────────────────────────────┘
```

## Model Pricing (Per 1K Tokens)

| Model | Input | Output | Tier Access |
|-------|-------|--------|-------------|
| GPT-4 | $0.03 | $0.06 | Pro+ |
| Claude 3 | $0.008 | $0.024 | Pro+ |
| Gemini Pro | $0.001 | $0.002 | All |
| GPT-3.5 | $0.0005 | $0.0015 | All |
| Local/Llama | $0.0001 | $0.0001 | Free+ |

## Tier Configuration

```typescript
const TIER_CONFIG = {
  free: {
    models: ['local', 'gpt-3.5'],
    dailyMessages: 20,
    monthlyTokens: 10000,
    fusionMode: false,
    maxResponseLength: 500,
  },
  pro: {
    models: ['local', 'gpt-3.5', 'gemini', 'claude'],
    dailyMessages: 200,
    monthlyTokens: 100000,
    fusionMode: false,
    maxResponseLength: 2000,
  },
  creator: {
    models: ['local', 'gpt-3.5', 'gemini', 'claude', 'gpt-4'],
    dailyMessages: Infinity,
    monthlyTokens: 500000,
    fusionMode: true,
    maxResponseLength: 4000,
  },
};
```

## Database Schema

```sql
-- User usage tracking
CREATE TABLE user_usage (
  user_id UUID PRIMARY KEY,
  tier VARCHAR(20) NOT NULL,
  daily_messages_used INT DEFAULT 0,
  daily_reset_at TIMESTAMP,
  monthly_tokens_used INT DEFAULT 0,
  monthly_reset_at TIMESTAMP,
  total_cost DECIMAL(10,4) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Request logging
CREATE TABLE request_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_usage(user_id),
  model VARCHAR(50) NOT NULL,
  prompt_tokens INT NOT NULL,
  completion_tokens INT NOT NULL,
  cost DECIMAL(10,6) NOT NULL,
  cached BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rate limiting
CREATE TABLE rate_limits (
  ip_address INET PRIMARY KEY,
  request_count INT DEFAULT 0,
  window_start TIMESTAMP DEFAULT NOW(),
  blocked_until TIMESTAMP
);
```
