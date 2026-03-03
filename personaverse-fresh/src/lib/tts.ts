// OpenAI TTS Service
// Much cheaper than ElevenLabs: $0.015 per 1,000 characters

export const OPENAI_VOICES = {
  alloy: "alloy",
  echo: "echo", 
  fable: "fable",
  onyx: "onyx",
  nova: "nova",
  shimmer: "shimmer",
} as const;

export async function generateSpeech(text: string, voice: string): Promise<Buffer> {
  try {
    const voiceId = OPENAI_VOICES[voice as keyof typeof OPENAI_VOICES] || "alloy";
    
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        voice: voiceId,
        input: text,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("OpenAI TTS error:", error);
      throw new Error(error.error?.message || "Failed to generate speech");
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("TTS generation error:", error);
    throw error;
  }
}
