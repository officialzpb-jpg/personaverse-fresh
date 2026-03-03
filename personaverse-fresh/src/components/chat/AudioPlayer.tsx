"use client";

import { useState, useRef } from "react";
import { Volume2, Play, Pause, Loader2, AlertCircle } from "lucide-react";

interface AudioPlayerProps {
  text: string;
  voice?: string;
  personaId?: string;
}

export function AudioPlayer({ text, voice = "alloy", personaId }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateAndPlay = async () => {
    console.log("AudioPlayer clicked");
    setError(null);
    
    if (audioUrl) {
      // Already have audio, just play/pause
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
      return;
    }

    // Generate new audio
    setIsLoading(true);
    try {
      console.log("Fetching TTS for text:", text.substring(0, 50) + "...");
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice, personaId }),
      });

      console.log("TTS response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("TTS error:", errorData);
        throw new Error(errorData.error || "Failed to generate audio");
      }

      const blob = await response.blob();
      console.log("Audio blob size:", blob.size);
      
      if (blob.size === 0) {
        throw new Error("Empty audio received");
      }
      
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      // Play the audio
      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onended = () => {
        console.log("Audio ended");
        setIsPlaying(false);
      };
      audio.onplay = () => {
        console.log("Audio playing");
        setIsPlaying(true);
      };
      audio.onpause = () => {
        console.log("Audio paused");
        setIsPlaying(false);
      };
      audio.onerror = (e) => {
        console.error("Audio error:", e);
        setError("Playback error");
        setIsPlaying(false);
      };
      
      await audio.play();
    } catch (error: any) {
      console.error("Audio playback error:", error);
      setError(error.message || "Failed to play");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <button
        onClick={() => setError(null)}
        className="p-1.5 hover:bg-white/10 rounded transition-colors"
        title={error}
      >
        <AlertCircle className="w-4 h-4 text-red-400" />
      </button>
    );
  }

  return (
    <button
      onClick={generateAndPlay}
      disabled={isLoading}
      className="p-1.5 hover:bg-white/10 rounded transition-colors"
      title={isPlaying ? "Pause" : "Play audio"}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
      ) : isPlaying ? (
        <Pause className="w-4 h-4 text-purple-400" />
      ) : (
        <Volume2 className="w-4 h-4 text-gray-400" />
      )}
    </button>
  );
}
