import { NextRequest, NextResponse } from "next/server";
import { generateSpeech, getVoiceForPersona } from "@/lib/tts";

export async function POST(req: NextRequest) {
  try {
    const { text, voice = "alloy", personaId } = await req.json();

    console.log("TTS request received:", { textLength: text?.length, voice, personaId });

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    // Use persona-specific voice if personaId is provided
    const voiceToUse = personaId ? getVoiceForPersona(personaId) : voice;
    console.log("Using voice:", voiceToUse, "for persona:", personaId);
    console.log("OpenAI API Key exists:", !!process.env.OPENAI_API_KEY);

    const audioBuffer = await generateSpeech(text, voiceToUse);
    console.log("Audio generated, size:", audioBuffer.length);

    return new Response(audioBuffer as any, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error("TTS API error:", error);
    console.error("Error message:", error.message);
    return NextResponse.json(
      { error: "Failed to generate speech", details: error.message },
      { status: 500 }
    );
  }
}
