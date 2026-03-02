"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  MessageSquare, 
  Trash2, 
  Clock, 
  ChevronRight,
  Loader2,
  Bot
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface Chat {
  id: string;
  personaId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

const PERSONA_NAMES: Record<string, string> = {
  "viral-vince": "Viral Vince",
  "tech-titan": "Tech Titan",
  "mindful-maya": "Mindful Maya",
  "game-guru": "Game Guru",
  "dating-doctor": "Dating Doctor",
  "code-wizard": "Code Wizard",
  "fit-felix": "Fit Felix",
  "chef-carlos": "Chef Carlos",
  "lingua-lisa": "Lingua Lisa",
  "money-mike": "Money Mike",
  "travel-tara": "Travel Tara",
  "style-sam": "Style Sam",
  "site-assistant": "PersonaVerse Assistant",
};

export default function ChatsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchChats();
    }
  }, [status, router]);

  const fetchChats = async () => {
    try {
      const response = await fetch("/api/chats");
      if (!response.ok) throw new Error("Failed to fetch chats");
      const data = await response.json();
      setChats(data.chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteChat = async (chatId: string) => {
    setDeletingId(chatId);
    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setChats(chats.filter((chat) => chat.id !== chatId));
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return minutes === 0 ? "Just now" : `${minutes}m ago`;
      }
      return `${hours}h ago`;
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Chat History</h1>
            <p className="text-gray-400">Resume your conversations with AI personas</p>
          </motion.div>

          {chats.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-12 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No chats yet</h3>
              <p className="text-gray-400 mb-6">Start chatting with AI personas to see your history here.</p>
              <Link
                href="/personas"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all"
              >
                <Bot className="w-5 h-5" />
                Browse Personas
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {chats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl p-4 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-purple-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">
                        {chat.title || `Chat with ${PERSONA_NAMES[chat.personaId] || "AI"}`}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>{PERSONA_NAMES[chat.personaId] || "AI Assistant"}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(chat.updatedAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/chat/${chat.id}`}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Link>

                      <button
                        onClick={() => deleteChat(chat.id)}
                        disabled={deletingId === chat.id}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                      >
                        {deletingId === chat.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
