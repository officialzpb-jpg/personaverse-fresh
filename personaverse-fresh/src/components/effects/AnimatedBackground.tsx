"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize stars
    const starCount = 200;
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * canvas.width * 2,
      y: (Math.random() - 0.5) * canvas.height * 2,
      z: Math.random() * 1000,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 2 + 0.5,
    }));

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const animate = () => {
      // Pitch black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        // Move star closer (decrease z)
        star.z -= star.speed * 2;

        // Reset star if it passes the viewer
        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
        }

        // Project 3D position to 2D screen
        const scale = 500 / star.z;
        const x = star.x * scale + centerX;
        const y = star.y * scale + centerY;

        // Calculate size and opacity based on distance
        const size = star.size * scale * 0.5;
        const opacity = Math.min(1, (1000 - star.z) / 500);

        // Draw star
        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.5, size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Draw streak/trail for fast-moving stars
        if (star.speed > 1.5 && star.z < 800) {
          const prevScale = 500 / (star.z + star.speed * 10);
          const prevX = star.x * prevScale + centerX;
          const prevY = star.y * prevScale + centerY;

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(prevX, prevY);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
          ctx.lineWidth = size * 0.5;
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, background: "#000000" }}
    />
  );
}

// Optional: Add some colored nebula clouds in the background
export function NebulaClouds() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, transparent 60%)",
          filter: "blur(100px)",
          top: "20%",
          left: "10%",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(30, 144, 255, 0.3) 0%, transparent 60%)",
          filter: "blur(100px)",
          bottom: "10%",
          right: "20%",
        }}
      />
    </div>
  );
}

export function CombinedBackground() {
  return (
    <>
      <StarfieldBackground />
      <NebulaClouds />
    </>
  );
}
