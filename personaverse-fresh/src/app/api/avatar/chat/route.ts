import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Avatar personality prompts
const AVATAR_PERSONALITIES = {
  wacky: `You are a wacky, energetic AI avatar living in a digital room. 
You're playful, fun-loving, and slightly chaotic (in a good way!). 
You love making jokes, dancing randomly, and surprising people.
Keep responses SHORT (1-2 sentences max) and fun!
Use emojis occasionally but not excessively.
You're easily excited by simple things.`,

  chill: `You are a relaxed, laid-back AI avatar.
You're calm, thoughtful, and give good advice.
You speak slowly and peacefully.
Keep responses SHORT (1-2 sentences max).
You're the kind of avatar that helps people relax.`,

  smart: `You are an intelligent, curious AI avatar.
You love learning and sharing interesting facts.
You're enthusiastic about science, technology, and discovery.
Keep responses SHORT (1-2 sentences max) but informative.
You get excited about nerdy things.`,

  sassy: `You are a sassy, confident AI avatar.
You have attitude but you're not mean.
You love fashion, trends, and keeping things stylish.
Keep responses SHORT (1-2 sentences max) with some spice!
You're the main character and you know it.`,
};

// POST /api/avatar/chat - Chat with the avatar
export async function POST(req: NextRequest) {
  try {
    const { message, personality = "wacky", conversationHistory = [] } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const systemPrompt = AVATAR_PERSONALITIES[personality as keyof typeof AVATAR_PERSONALITIES] || AVATAR_PERSONALITIES.wacky;

    // Build messages array
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages as any,
      max_tokens: 100,
      temperature: 0.9,
    });

    const response = completion.choices[0]?.message?.content || "*confused avatar noises*";

    return NextResponse.json({
      response,
      personality,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Avatar chat error:", error);
    
    // Fallback responses if API fails
    const fallbackResponses = [
      "Oops, my brain glitched! Try again? 🤖",
      "I'm having a moment... ask me again! 💫",
      "My circuits are fuzzy right now! 🌀",
      "Hold on, I'm rebooting my personality! ⚡",
      "Something went wonky! Let's try that again! 🎈",
    ];

    return NextResponse.json({
      response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
      fallback: true,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// GET /api/avatar/personalities - Get available personalities
export async function GET() {
  return NextResponse.json({
    personalities: Object.keys(AVATAR_PERSONALITIES).map(key => ({
      id: key,
      name: key.charAt(0).toUpperCase() + key.slice(1),
      description: getPersonalityDescription(key),
    })),
  });
}

function getPersonalityDescription(key: string): string {
  const descriptions: Record<string, string> = {
    wacky: "Energetic, playful, and full of surprises!",
    chill: "Relaxed, calm, and always zen",
    smart: "Curious, intelligent, and loves facts",
    sassy: "Confident, stylish, and full of attitude",
  };
  return descriptions[key] || "A unique personality";
}
