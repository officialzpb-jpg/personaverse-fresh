// OpenAI TTS Service
// Much cheaper than ElevenLabs: $0.015 per 1,000 characters

export const OPENAI_VOICES = {
  alloy: "alloy",      // Neutral, balanced
  echo: "echo",        // Warm, approachable
  fable: "fable",      // British accent, refined
  onyx: "onyx",        // Deep, authoritative
  nova: "nova",        // Energetic, friendly
  shimmer: "shimmer",  // Clear, optimistic
} as const;

// Map personas to voices that fit their personality
export const PERSONA_VOICES: Record<string, string> = {
  // Energetic/Casual personas
  "viral-vince": "nova",
  "game-guru": "echo",
  "fit-felix": "nova",
  "travel-tara": "nova",
  "dating-doctor": "nova",
  
  // Professional/Authoritative personas
  "tech-titan": "onyx",
  "code-wizard": "onyx",
  "money-mike": "onyx",
  
  // Calm/Nurturing personas
  "mindful-maya": "alloy",
  "chef-carlos": "echo",
  
  // Refined/Educated personas
  "lingua-lisa": "shimmer",
  "style-sam": "fable",
  
  // Default
  "default": "alloy",
  "site-assistant": "alloy",
};

export function getVoiceForPersona(personaId: string): string {
  return PERSONA_VOICES[personaId] || OPENAI_VOICES.alloy;
}

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
