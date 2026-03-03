"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Loader2 } from "lucide-react";

interface AudioPlayerProps {
  text: string;
  voice?: string;
}

export function AudioPlayer({ text, voice = "alloy" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateAndPlay = async () => {
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
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice }),
      });

      if (!response.ok) throw new Error("Failed to generate audio");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      // Play the audio
      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onended = () => setIsPlaying(false);
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      
      await audio.play();
    } catch (error) {
      console.error("Audio playback error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
