"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  MessageSquare, 
  Sparkles, 
  Zap, 
  Users,
  TrendingUp,
  Star,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const suggestedPersonas = [
  {
    id: "viral-vince",
    name: "Viral Vince",
    avatar: "🔥",
    color: "from-orange-500 to-red-500",
    description: "Content creation expert",
    tag: "Trending",
  },
  {
    id: "tech-titan",
    name: "Tech Titan",
    avatar: "🚀",
    color: "from-blue-500 to-cyan-500",
    description: "Startup advisor",
    tag: "Popular",
  },
  {
    id: "mindful-maya",
    name: "Mindful Maya",
    avatar: "🧘",
    color: "from-emerald-500 to-teal-500",
    description: "Wellness coach",
    tag: "New",
  },
  {
    id: "code-wizard",
    name: "Code Wizard",
    avatar: "⚡",
    color: "from-indigo-500 to-violet-500",
    description: "Senior developer",
    tag: "Tech",
  },
];

const quickPrompts = [
  "Help me write a viral tweet",
  "Explain quantum computing simply",
  "Give me startup advice",
  "Help me debug my code",
  "Create a workout plan",
  "Write a poem about AI",
];

export default function ChatPage() {
  const [selectedPersona, setSelectedPersona] = useState(suggestedPersonas[0]);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      <div className="pt-16 flex h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex w-80 flex-col border-r border-white/5 bg-[#0a0a0a]"
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/5">
            <Link
              href="/personas"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Browse all personas
            </Link>
          </div>

          {/* Suggested Personas */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Suggested Personas
            </h3>
            <div className="space-y-2">
              {suggestedPersonas.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => setSelectedPersona(persona)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    selectedPersona.id === persona.id
                      ? "bg-white/10 border border-purple-500/30"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${persona.color} flex items-center justify-center text-lg`}>
                    {persona.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-white">{persona.name}</div>
                    <div className="text-xs text-gray-500">{persona.description}</div>
                  </div>
                  {persona.tag && (
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                      {persona.tag}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Quick Prompts */}
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 mt-8">
              Quick Prompts
            </h3>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/5">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-white">Pro Tip</span>
              </div>
              <p className="text-xs text-gray-400">
                Switch between AI models mid-conversation to get different perspectives on complex topics.
              </p>
            </div>
          </div>
        </motion.aside>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatInterface 
            persona={{
              id: selectedPersona.id,
              name: selectedPersona.name,
              avatar: selectedPersona.avatar,
              color: selectedPersona.color,
              description: selectedPersona.description,
            }}
            embedded
          />
        </div>
      </div>
    </main>
  );
}
