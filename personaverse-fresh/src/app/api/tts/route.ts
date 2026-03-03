import { NextRequest, NextResponse } from "next/server";
import { generateSpeech, ELEVENLABS_VOICES } from "@/lib/tts";

export async function POST(req: NextRequest) {
  try {
    const { text, voice = "alloy" } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const voiceId = ELEVENLABS_VOICES[voice] || ELEVENLABS_VOICES.alloy;
    const audioBuffer = await generateSpeech(text, voiceId);

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("TTS API error:", error);
    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    );
  }
}
