import { NextRequest, NextResponse } from "next/server";
import { generateSpeech, ELEVENLABS_VOICES } from "@/lib/tts";

export async function POST(req: NextRequest) {
  try {
    const { text, voice = "alloy" } = await req.json();

    console.log("TTS request received:", { textLength: text?.length, voice });

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const voiceId = ELEVENLABS_VOICES[voice] || ELEVENLABS_VOICES.alloy;
    console.log("Using voice ID:", voiceId);
    console.log("ElevenLabs API Key exists:", !!process.env.ELEVENLABS_API_KEY);

    const audioBuffer = await generateSpeech(text, voiceId);
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
