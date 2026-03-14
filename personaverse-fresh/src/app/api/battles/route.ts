import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/battles - Get all battles
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "active";
    
    const battles = await prisma.battle.findMany({
      where: { status },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
        _count: {
          select: { votes: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(battles);
  } catch (error) {
    console.error("Error fetching battles:", error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST /api/battles - Create a new battle
export async function POST(req: NextRequest) {
  try {
    const { topic, persona1Id, persona2Id, duration = 24 } = await req.json();
    
    if (!topic || !persona1Id || !persona2Id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Get persona details for AI generation
    const [persona1, persona2] = await Promise.all([
      prisma.persona.findUnique({ where: { id: persona1Id } }),
      prisma.persona.findUnique({ where: { id: persona2Id } }),
    ]);
    
    if (!persona1 || !persona2) {
      return NextResponse.json(
        { error: "One or both personas not found" },
        { status: 404 }
      );
    }
    
    const endsAt = new Date();
    endsAt.setHours(endsAt.getHours() + duration);
    
    const battle = await prisma.battle.create({
      data: {
        topic,
        persona1Id,
        persona2Id,
        endsAt,
        status: "active",
      },
      include: {
        messages: true,
      },
    });
    
    // Start AI debate asynchronously (don't await, let it run in background)
    generateDebate(battle.id, persona1, persona2, topic).catch(console.error);
    
    return NextResponse.json(battle);
  } catch (error) {
    console.error("Error creating battle:", error);
    return NextResponse.json(
      { error: "Failed to create battle" },
      { status: 500 }
    );
  }
}

// Generate AI debate messages
async function generateDebate(
  battleId: string,
  persona1: { id: string; name: string; systemPrompt: string },
  persona2: { id: string; name: string; systemPrompt: string },
  topic: string
) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY not set");
      // Add placeholder messages if no API key
      await addPlaceholderMessages(battleId, persona1, persona2, topic);
      return;
    }
    
    // Round 1: Opening statements
    const msg1 = await generateAIResponse(apiKey, persona1.systemPrompt, topic, 1, null);
    await createMessage(battleId, persona1.id, msg1, 1);
    
    await delay(1000);
    
    const msg2 = await generateAIResponse(apiKey, persona2.systemPrompt, topic, 1, msg1);
    await createMessage(battleId, persona2.id, msg2, 1);
    
    await delay(2000);
    
    // Round 2: Counter arguments
    const msg3 = await generateAIResponse(apiKey, persona1.systemPrompt, topic, 2, msg2);
    await createMessage(battleId, persona1.id, msg3, 2);
    
    await delay(1000);
    
    const msg4 = await generateAIResponse(apiKey, persona2.systemPrompt, topic, 2, msg3);
    await createMessage(battleId, persona2.id, msg4, 2);
    
    await delay(2000);
    
    // Round 3: Closing statements
    const msg5 = await generateAIResponse(apiKey, persona1.systemPrompt, topic, 3, msg4);
    await createMessage(battleId, persona1.id, msg5, 3);
    
    await delay(1000);
    
    const msg6 = await generateAIResponse(apiKey, persona2.systemPrompt, topic, 3, msg5);
    await createMessage(battleId, persona2.id, msg6, 3);
    
    // Mark battle as completed
    await prisma.battle.update({
      where: { id: battleId },
      data: { status: "completed" },
    });
    
    console.log(`Debate ${battleId} completed`);
  } catch (error) {
    console.error("Error generating debate:", error);
  }
}

async function generateAIResponse(
  apiKey: string,
  systemPrompt: string,
  topic: string,
  round: number,
  previousMessage: string | null
): Promise<string> {
  const roundNames = ["", "opening", "counter", "closing"];
  const roundName = roundNames[round];
  
  let userPrompt = `Give your ${roundName} argument on: "${topic}". Keep it under 100 words, be persuasive and engaging.`;
  
  if (previousMessage) {
    userPrompt += ` Respond to: "${previousMessage.substring(0, 200)}..."`;
  }
  
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Use cheaper model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 150,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0]?.message?.content || "No response generated.";
  } catch (error) {
    console.error("OpenAI error:", error);
    return getPlaceholderResponse(round, !!previousMessage);
  }
}

async function createMessage(battleId: string, personaId: string, content: string, round: number) {
  try {
    await prisma.battleMessage.create({
      data: {
        battleId,
        personaId,
        content,
        round,
      },
    });
  } catch (error) {
    console.error("Error creating message:", error);
  }
}

async function addPlaceholderMessages(
  battleId: string,
  persona1: { id: string; name: string },
  persona2: { id: string; name: string },
  topic: string
) {
  const messages = [
    { personaId: persona1.id, content: `${persona1.name} opens the debate on "${topic}" with a strong argument...`, round: 1 },
    { personaId: persona2.id, content: `${persona2.name} counters with an equally compelling point...`, round: 1 },
    { personaId: persona1.id, content: `${persona1.name} doubles down on their position...`, round: 2 },
    { personaId: persona2.id, content: `${persona2.name} delivers a powerful rebuttal...`, round: 2 },
    { personaId: persona1.id, content: `${persona1.name} makes their final case...`, round: 3 },
    { personaId: persona2.id, content: `${persona2.name} closes with a memorable conclusion...`, round: 3 },
  ];
  
  for (const msg of messages) {
    await createMessage(battleId, msg.personaId, msg.content, msg.round);
    await delay(500);
  }
}

function getPlaceholderResponse(round: number, hasPrevious: boolean): string {
  const responses = [
    "I strongly believe in my position and here's why...",
    "That's an interesting point, but consider this...",
    "In conclusion, my argument stands firm because..."
  ];
  return responses[round - 1] || "I have more to say on this topic.";
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
