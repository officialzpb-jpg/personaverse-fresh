"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  Bot,
  Clock,
  Settings
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useEffect, useState } from "react";

interface Chat {
  id: string;
  personaId: string;
  title: string;
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
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recentChats, setRecentChats] = useState<Chat[]>([]);
  const [stats, setStats] = useState({
    totalChats: 0,
    totalPersonas: 12,
    favoritePersona: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchRecentChats();
    }
  }, [status, router]);

  const fetchRecentChats = async () => {
    try {
      const response = await fetch("/api/chats");
      if (response.ok) {
        const data = await response.json();
        setRecentChats(data.chats?.slice(0, 5) || []);
        setStats(prev => ({
          ...prev,
          totalChats: data.chats?.length || 0,
        }));
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-16">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="animate-pulse text-purple-500">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {session?.user?.name || "User"}!
            </h1>
            <p className="text-gray-400 text-lg">
              Ready to chat with your favorite AI personas?
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <Link
              href="/personas"
              className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">Browse Personas</h3>
              <p className="text-gray-400 text-sm">Explore 12 unique AI personalities</p>
            </Link>

            <Link
              href="/chats"
              className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">Chat History</h3>
              <p className="text-gray-400 text-sm">Continue your conversations</p>
            </Link>

            <Link
              href="/create"
              className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">Create Persona</h3>
              <p className="text-gray-400 text-sm">Build your own AI character</p>
            </Link>
          </motion.div>

          {/* Stats & Recent Chats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Your Stats</h2>
              
              <div className="space-y-4">
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stats.totalChats}</div>
                      <div className="text-sm text-gray-400">Total Chats</div>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stats.totalPersonas}</div>
                      <div className="text-sm text-gray-400">Available Personas</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Chats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Chats</h2>
                <Link
                  href="/chats"
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  View all
                </Link>
              </div>

              {recentChats.length === 0 ? (
                <div className="glass-card rounded-xl p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No chats yet. Start chatting with a persona!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentChats.map((chat) => (
                    <Link
                      key={chat.id}
                      href={`/chat/${chat.id}`}
                      className="glass-card rounded-xl p-4 hover:bg-white/5 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">
                            {chat.title || `Chat with ${PERSONA_NAMES[chat.personaId] || "AI"}`}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>{PERSONA_NAMES[chat.personaId] || "AI"}</span>
                            <span>•</span>
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(chat.updatedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
