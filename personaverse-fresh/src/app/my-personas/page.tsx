"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Bot, 
  MessageSquare, 
  Plus,
  Loader2,
  Trash2
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface Persona {
  id: string;
  name: string;
  description: string;
  avatar: string;
  isPublic: boolean;
  createdAt: string;
}

export default function MyPersonasPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      fetchPersonas();
    }
  }, [status, router]);

  const fetchPersonas = async () => {
    try {
      const response = await fetch("/api/personas", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setPersonas(data.personas || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-16">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Personas</h1>
              <p className="text-gray-400">Chat with your custom AI personas</p>
            </div>
            <Link href="/create" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New
            </Link>
          </div>

          {personas.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <Bot className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No personas yet</h3>
              <Link href="/create" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white">
                <Plus className="w-5 h-5" />
                Create Persona
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personas.map((persona) => (
                <div key={persona.id} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-3xl overflow-hidden">
                      {persona.avatar.startsWith("data:") ? (
                        <img src={persona.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        persona.avatar
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{persona.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${persona.isPublic ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                        {persona.isPublic ? "Public" : "Private"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{persona.description}</p>
                  <Link href={`/persona/${persona.id}`} className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-center text-white transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
