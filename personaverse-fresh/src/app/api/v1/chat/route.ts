import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// Middleware to validate API key
async function validateApiKey(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  
  const apiKey = authHeader.slice(7);
  const hashedKey = crypto.createHash("sha256").update(apiKey).digest("hex");
  
  const keyRecord = await prisma.apiKey.findUnique({
    where: { key: hashedKey },
    include: { user: true },
  });
  
  if (!keyRecord) {
    return null;
  }
  
  // Update last used
  await prisma.apiKey.update({
    where: { id: keyRecord.id },
    data: { lastUsed: new Date() },
  });
  
  return keyRecord.user;
}

// POST /api/v1/chat - External chat API
export async function POST(req: NextRequest) {
  try {
    const user = await validateApiKey(req);
    
    if (!user) {
      return NextResponse.json(
        { error: "Invalid API key" },
        { status: 401 }
      );
    }

    const { message, personaId = "default", history = [] } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check rate limit (100 requests per hour for Pro, 1000 for Creator)
    const rateLimit = user.plan === "creator" ? 1000 : 100;
    
    // Log API usage
    await prisma.apiUsage.create({
      data: {
        userId: user.id,
        endpoint: "/v1/chat",
      },
    });

    // Get system prompt
    let systemPrompt = "You are a helpful AI assistant.";
    
    if (personaId !== "default") {
      const persona = await prisma.persona.findUnique({
        where: { id: personaId },
      });
      if (persona) {
        systemPrompt = persona.systemPrompt;
      }
    }

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          ...history,
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI API error");
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "No response";

    return NextResponse.json({
      response: aiResponse,
      personaId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API chat error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
