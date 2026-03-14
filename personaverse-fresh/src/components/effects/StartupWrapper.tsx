"use client";

import { useState } from "react";
import { StartupAnimation } from "@/components/effects/StartupAnimation";

export function StartupWrapper({ children }: { children: React.ReactNode }) {
  const [showAnimation, setShowAnimation] = useState(true);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  return (
    <>
      {showAnimation && (
        <StartupAnimation onComplete={handleAnimationComplete} />
      )}
      <div className={showAnimation ? "hidden" : ""}>
        {children}
      </div>
    </>
  );
}
