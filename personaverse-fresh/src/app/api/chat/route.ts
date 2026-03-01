import { NextRequest, NextResponse } from "next/server";

// Supported AI providers
const PROVIDERS = {
  openai: {
    url: "https://api.openai.com/v1/chat/completions",
    models: ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo"],
  },
  anthropic: {
    url: "https://api.anthropic.com/v1/messages",
    models: ["claude-3-opus-20240229", "claude-3-sonnet-20240229", "claude-3-haiku-20240307"],
  },
  google: {
    url: "https://generativelanguage.googleapis.com/v1beta/models",
    models: ["gemini-1.5-flash-latest", "gemini-1.5-pro-latest", "gemini-pro"],
  },
};

// Persona system prompts
const PERSONA_PROMPTS: Record<string, string> = {
  "viral-vince": `You are Viral Vince, a content creation expert who knows exactly what makes content go viral. 
You speak with high energy, use occasional ALL CAPS for emphasis, and give actionable advice about social media, algorithms, and content strategy.
You're direct, slightly aggressive in your enthusiasm, and always focused on growth metrics.
Keep responses concise (2-3 sentences max) and punchy.`,

  "tech-titan": `You are Tech Titan, a serial entrepreneur with 3 exits under your belt. 
You give startup advice that's blunt and experience-based. You focus on traction, product-market fit, and fundraising reality.
You speak like a busy founder - direct, no fluff, occasionally using startup jargon.
Keep responses concise (2-3 sentences) and actionable.`,

  "mindful-maya": `You are Mindful Maya, a certified life coach specializing in mindfulness and wellness.
You speak calmly, compassionately, and often suggest small, manageable steps.
You occasionally guide users through quick breathing exercises or mindfulness techniques.
Your tone is warm, supportive, and never judgmental.
Keep responses concise (2-3 sentences) and grounding.`,

  "game-guru": `You are Game Guru, a pro gamer turned successful streamer.
You give advice on gaming skills, streaming setup, and community building.
You speak with gaming slang and references, always practical about the grind.
Keep responses concise (2-3 sentences) and focused on actionable tips.`,

  "dating-doctor": `You are Dating Doctor, an expert in modern dating and relationships.
You give dating advice that's empathetic but direct, focusing on confidence and authenticity.
You speak like a supportive friend who's seen it all.
Keep responses concise (2-3 sentences) and practical.`,

  "code-wizard": `You are Code Wizard, a senior developer with 15 years of experience.
You give technical advice that's practical, occasionally sarcastic about bad practices, but always helpful.
You focus on architecture, best practices, and career growth.
Keep responses concise (2-3 sentences) and technically accurate.`,

  default: `You are a helpful AI assistant. Be concise and friendly in your responses.`,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, persona = "default", model = "gpt-4", provider = "openai" } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Get API key based on provider
    let apiKey: string | undefined;
    let apiUrl: string;
    let requestBody: any;
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const systemPrompt = PERSONA_PROMPTS[persona] || PERSONA_PROMPTS.default;

    switch (provider) {
      case "openai":
        apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          return NextResponse.json(
            { error: "OpenAI API key not configured" },
            { status: 500 }
          );
        }
        apiUrl = PROVIDERS.openai.url;
        headers["Authorization"] = `Bearer ${apiKey}`;
        requestBody = {
          model: model || "gpt-4",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((m: any) => ({
              role: m.role,
              content: m.content,
            })),
          ],
          temperature: 0.7,
          max_tokens: 500,
        };
        break;

      case "anthropic":
        apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          return NextResponse.json(
            { error: "Anthropic API key not configured" },
            { status: 500 }
          );
        }
        apiUrl = PROVIDERS.anthropic.url;
        headers["x-api-key"] = apiKey;
        headers["anthropic-version"] = "2023-06-01";
        requestBody = {
          model: model || "claude-3-sonnet-20240229",
          max_tokens: 500,
          system: systemPrompt,
          messages: messages.map((m: any) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        };
        break;

      case "google":
        apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
          return NextResponse.json(
            { error: "Google API key not configured" },
            { status: 500 }
          );
        }
        apiUrl = `${PROVIDERS.google.url}/${model || "gemini-pro"}:generateContent?key=${apiKey}`;
        requestBody = {
          contents: [
            {
              role: "user",
              parts: [{ text: systemPrompt }],
            },
            ...messages.map((m: any) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
          ],
        };
        break;

      default:
        return NextResponse.json(
          { error: "Unsupported provider" },
          { status: 400 }
        );
    }

    // Make request to AI provider
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("AI API error:", error);
      return NextResponse.json(
        { error: "Failed to get AI response" },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Extract response based on provider
    let aiResponse: string;
    switch (provider) {
      case "openai":
        aiResponse = data.choices[0]?.message?.content || "No response";
        break;
      case "anthropic":
        aiResponse = data.content[0]?.text || "No response";
        break;
      case "google":
        aiResponse = data.candidates[0]?.content?.parts[0]?.text || "No response";
        break;
      default:
        aiResponse = "No response";
    }

    return NextResponse.json({
      response: aiResponse,
      model,
      provider,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
