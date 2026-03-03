// ElevenLabs TTS Service
// Free tier: 10,000 characters/month, 3 custom voices

// Voice mapping for personas - using ElevenLabs voice IDs
export const ELEVENLABS_VOICES: Record<string, string> = {
  // Gender-specific voices for better matching
  
  // Female voices
  "nova": "XB0fDUnXU5powFXDhCwa",      // Bella - warm, friendly
  "shimmer": "Xb7hH8MSUJpSbSDYk0k2",   // Antoni - bright, optimistic
  
  // Male voices  
  "echo": "AZnzlk1XvdvUeBnXmlld",      // Adam - calm, professional
  "fable": "CYw3kZ02Hs0563khs1Fj",     // Josh - British, refined
  "onyx": "D38z5RcWu1voky8WS1ja",      // Sam - deep, authoritative
  
  // Neutral
  "alloy": "21m00Tcm4TlvDq8ikWAM",     // Rachel - neutral, clear
};

// Map personas to voices that match their personality AND gender
export const PERSONA_VOICES: Record<string, string> = {
  // Male personas - deep/authoritative voices
  "tech-titan": "onyx",        // Deep, authoritative
  "code-wizard": "onyx",       // Deep, authoritative
  "money-mike": "onyx",        // Deep, authoritative
  "game-guru": "echo",         // Warm, approachable
  "chef-carlos": "echo",       // Warm, approachable
  "dating-doctor": "fable",    // British, refined
  
  // Female personas - warm/friendly voices
  "viral-vince": "nova",       // Energetic, friendly (using female voice for variety)
  "mindful-maya": "shimmer",   // Bright, optimistic
  "lingua-lisa": "shimmer",    // Bright, optimistic
  "travel-tara": "nova",       // Warm, friendly
  "style-sam": "shimmer",      // Bright, optimistic
  "fit-felix": "nova",         // Energetic, friendly
  
  // Default
  "default": "alloy",
  "site-assistant": "alloy",
};

export function getVoiceForPersona(personaId: string): string {
  return PERSONA_VOICES[personaId] || ELEVENLABS_VOICES.alloy;
}

export async function generateSpeech(text: string, voice: string): Promise<Buffer> {
  try {
    const voiceId = ELEVENLABS_VOICES[voice] || ELEVENLABS_VOICES.alloy;
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_flash_v2_5",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("ElevenLabs TTS error:", error);
      throw new Error(error.detail?.message || "Failed to generate speech");
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("TTS generation error:", error);
    throw error;
  }
}
