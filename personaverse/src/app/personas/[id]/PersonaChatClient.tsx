"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Navbar } from "@/components/layout/Navbar";
import { 
  ArrowLeft, 
  Share2, 
  Star, 
  Zap
} from "lucide-react";
import Link from "next/link";
import { personasData } from "./data";

export default function PersonaChatClient() {
  const params = useParams();
  const personaId = params.id as string;
  const persona = personasData[personaId];

  if (!persona) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-16">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Persona not found</h1>
            <Link href="/personas" className="text-purple-400 hover:text-purple-300">
              Browse all personas
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      <div className="pt-16 flex h-screen">
        {/* Persona Info Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex w-96 flex-col border-r border-white/5 bg-[#0a0a0a] overflow-y-auto"
        >
          {/* Back Link */}
          <div className="p-4 border-b border-white/5">
            <Link
              href="/personas"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to personas
            </Link>
          </div>

          {/* Persona Header */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${persona.color} flex items-center justify-center text-4xl`}>
                {persona.avatar}
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white">{persona.name}</h1>
                <p className="text-purple-400">{persona.role}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-white">{persona.stats.rating}</span>
                  <span className="text-sm text-gray-500">({persona.stats.chats} chats)</span>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">{persona.longDescription}</p>

            <div className="flex flex-wrap gap-2">
              {persona.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/5">
            <div className="text-center">
              <div className="text-xl font-bold text-white">{persona.stats.chats}</div>
              <div className="text-xs text-gray-500">Chats</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{persona.stats.users}</div>
              <div className="text-xs text-gray-500">Users</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{persona.stats.rating}</div>
              <div className="text-xs text-gray-500">Rating</div>
            </div>
          </div>

          {/* Abilities */}
          <div className="p-6 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white mb-4">Specialties</h3>
            <ul className="space-y-2">
              {persona.abilities.map((ability) => (
                <li key={ability} className="flex items-center gap-2 text-sm text-gray-400">
                  <Zap className="w-4 h-4 text-purple-400" />
                  {ability}
                </li>
              ))}
            </ul>
          </div>

          {/* Sample Conversations */}
          <div className="p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Example Conversations</h3>
            <div className="space-y-4">
              {persona.sampleConversations.map((conv, index) => (
                <div key={index} className="glass rounded-xl p-4">
                  <p className="text-sm text-gray-300 mb-2"><span className="text-purple-400">You:</span> {conv.user}</p>
                  <p className="text-sm text-gray-400"><span className="text-green-400">{persona.name}:</span> {conv.response}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 mt-auto">
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 glass rounded-lg text-sm text-white hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 glass rounded-lg text-sm text-white hover:bg-white/10 transition-colors">
                <Star className="w-4 h-4" />
                Favorite
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatInterface 
            persona={{
              id: personaId,
              name: persona.name,
              avatar: persona.avatar,
              color: persona.color,
              description: persona.description,
            }}
            embedded
          />
        </div>
      </div>
    </main>
  );
}
