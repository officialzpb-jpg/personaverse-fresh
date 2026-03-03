import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

// Default voices mapping
export const ELEVENLABS_VOICES: Record<string, string> = {
  alloy: "21m00Tcm4TlvDq8ikWAM",    // Rachel
  echo: "EXAVITQu4vr4xnSDxMaL",     // Josh
  fable: "XB0fDUnXU5powFXDhCwa",    // Adam
  onyx: "AZnzlk1XvdvUeBnXmlld",     // Sam
  nova: "TX3AE5NoiNoCH9MekJET",     // Bella
  shimmer: "yoZ06aMxZJJ28mfd3POQ",  // Antoni
};

export async function generateSpeech(text: string, voiceId: string): Promise<Buffer> {
  try {
    const audio = await client.generate({
      voice: voiceId,
      text,
      model_id: "eleven_monolingual_v1",
    });

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of audio) {
      chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks);
  } catch (error) {
    console.error("TTS generation error:", error);
    throw new Error("Failed to generate speech");
  }
}

export async function getVoices() {
  try {
    const voices = await client.voices.getAll();
    return voices.voices.map((voice) => ({
      id: voice.voice_id,
      name: voice.name,
      preview: voice.preview_url,
    }));
  } catch (error) {
    console.error("Get voices error:", error);
    return [];
  }
}
