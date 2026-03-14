"use client";

import { useState, useEffect, useRef } from "react";

export function StartupAnimation({ onComplete }: { onComplete: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user has already seen the animation this session
    const hasSeenAnimation = sessionStorage.getItem("hasSeenStartupAnimation");
    if (hasSeenAnimation) {
      onComplete();
      return;
    }

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // If autoplay fails, skip animation
        handleComplete();
      });
    }
  }, [onComplete]);

  const handleComplete = () => {
    sessionStorage.setItem("hasSeenStartupAnimation", "true");
    setIsPlaying(false);
    setTimeout(onComplete, 500); // Allow fade out animation
  };

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  if (!isPlaying) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-500 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <video
        ref={videoRef}
        src="/startup.mp4"
        className="w-full h-full object-cover"
        playsInline
        muted
        onLoadedData={handleLoaded}
        onEnded={handleComplete}
        onError={handleComplete}
      />
      
      {/* Skip button */}
      <button
        onClick={handleComplete}
        className="absolute bottom-8 right-8 px-4 py-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
      >
        Skip →
      </button>
    </div>
  );
}
