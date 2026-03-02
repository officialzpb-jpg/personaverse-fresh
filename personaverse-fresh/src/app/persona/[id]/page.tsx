"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Loader2 } from "lucide-react";

interface Persona {
  id: string;
  name: string;
  description: string;
  avatar: string;
  systemPrompt: string;
}

export default function PersonaChatPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [persona, setPersona] = useState<Persona | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPersona();
  }, [params.id]);

  const fetchPersona = async () => {
    try {
      const response = await fetch(`/api/personas/${params.id}`, {
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Persona not found");
      }
      
      const data = await response.json();
      setPersona(data.persona);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load persona");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-16">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      </main>
    );
  }

  if (error || !persona) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-16">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">{error || "Persona not found"}</h1>
            <a href="/my-personas" className="text-purple-400 hover:text-purple-300">
              Back to My Personas
            </a>
          </div>
        </div>
      </main>
    );
  }

  const isImageAvatar = persona.avatar?.startsWith("data:") || persona.avatar?.startsWith("http");

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-16 h-screen">
        <ChatInterface
          persona={{
            id: persona.id,
            name: persona.name,
            avatar: isImageAvatar ? "🤖" : persona.avatar,
            color: "from-purple-500 to-blue-500",
            description: persona.description,
            systemPrompt: persona.systemPrompt,
          }}
          embedded
        />
      </div>
    </main>
  );
}
