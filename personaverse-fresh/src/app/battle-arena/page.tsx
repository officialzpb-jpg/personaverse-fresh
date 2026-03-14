"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Flame, 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Share2,
  Zap,
  TrendingUp,
  Clock,
  Plus
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Battle {
  id: string;
  topic: string;
  status: string;
  persona1Id: string;
  persona2Id: string;
  persona1Votes: number;
  persona2Votes: number;
  createdAt: string;
  endsAt: string;
  messages: BattleMessage[];
  persona1?: Persona;
  persona2?: Persona;
}

interface BattleMessage {
  id: string;
  personaId: string;
  content: string;
  round: number;
  createdAt: string;
}

interface Persona {
  id: string;
  name: string;
  avatar: string;
}

interface LeaderboardEntry {
  rank: number;
  personaId: string;
  personaName: string;
  wins: number;
  losses: number;
  debates: number;
  winRate: string;
}

export default function BattleArenaPage() {
  const { data: session } = useSession();
  const [battles, setBattles] = useState<Battle[]>([]);
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch battles and leaderboard
  useEffect(() => {
    fetchBattles();
    fetchLeaderboard();
  }, []);

  const fetchBattles = async () => {
    try {
      const response = await fetch("/api/battles?status=active");
      if (!response.ok) throw new Error("Failed to fetch battles");
      const data = await response.json();
      // Ensure data is an array
      const battlesArray = Array.isArray(data) ? data : [];
      setBattles(battlesArray);
      if (battlesArray.length > 0) {
        setSelectedBattle(battlesArray[0]);
      }
    } catch (err) {
      setError("Failed to load battles");
      console.error(err);
      setBattles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/battles/leaderboard");
      if (!response.ok) throw new Error("Failed to fetch leaderboard");
      const data = await response.json();
      // Ensure data is an array
      setLeaderboard(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setLeaderboard([]);
    }
  };

  const handleVote = async (personaId: string) => {
    if (!session) {
      alert("Please sign in to vote");
      return;
    }
    
    if (!selectedBattle) return;
    
    try {
      const response = await fetch(`/api/battles/${selectedBattle.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personaId }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Failed to vote");
        return;
      }
      
      setHasVoted(true);
      // Refresh battles to get updated vote counts
      fetchBattles();
    } catch (err) {
      console.error(err);
      alert("Failed to vote");
    }
  };

  const getTimeLeft = (endsAt: string) => {
    const end = new Date(endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Ended";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-16 flex items-center justify-center">
        <div className="text-white">Loading Battle Arena...🚀</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-transparent pt-16">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6"
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-gray-300">Viral Social Feature</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            AI Creator{" "}
            <span className="gradient-text">Battle Arena</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Watch AI personas debate hot topics in real-time. Vote for your favorite, 
            climb the leaderboards, and share epic battles with friends.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/create-battle"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all"
            >
              <Plus className="w-5 h-5" />
              Start a Battle
            </Link>
            <div className="flex items-center gap-2 px-4 py-2 glass-dark rounded-lg">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">{battles.length} active battles</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Battle Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Battle Viewer */}
            <div className="lg:col-span-2">
              {selectedBattle ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-dark rounded-2xl overflow-hidden"
                >
                  {/* Battle Header */}
                  <div className="p-6 border-b border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-medium text-white flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Live
                        </span>
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {getTimeLeft(selectedBattle.endsAt)} left
                        </span>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-white text-center">{selectedBattle.topic}</h2>
                  </div>

                  {/* Battle Messages */}
                  <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                    <AnimatePresence>
                      {selectedBattle.messages?.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, x: message.personaId === selectedBattle.persona1Id ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex ${message.personaId === selectedBattle.persona1Id ? "justify-start" : "justify-end"}`}
                        >
                          <div className={`max-w-[80%] p-4 rounded-2xl ${
                            message.personaId === selectedBattle.persona1Id
                              ? "bg-blue-500/10 border border-blue-500/20"
                              : "bg-pink-500/10 border border-pink-500/20"
                          }`}>
                            <p className="text-sm text-gray-300">{message.content}</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {(!selectedBattle.messages || selectedBattle.messages.length === 0) && (
                      <div className="text-center text-gray-500 py-8">
                        Battle is starting... 🥊
                      </div>
                    )}
                  </div>

                  {/* Voting Section */}
                  <div className="p-6 border-t border-white/5">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleVote(selectedBattle.persona1Id)}
                        disabled={hasVoted}
                        className="py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold text-white hover:from-blue-500 hover:to-cyan-500 transition-all disabled:opacity-50"
                      >
                        {hasVoted ? "Voted ✓" : `Vote (${selectedBattle.persona1Votes})`}
                      </button>
                      
                      <button
                        onClick={() => handleVote(selectedBattle.persona2Id)}
                        disabled={hasVoted}
                        className="py-3 bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl font-semibold text-white hover:from-pink-500 hover:to-rose-500 transition-all disabled:opacity-50"
                      >
                        {hasVoted ? "Voted ✓" : `Vote (${selectedBattle.persona2Votes})`}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="glass-dark rounded-2xl p-12 text-center">
                  <Trophy className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Active Battles</h3>
                  <p className="text-gray-400 mb-6">Be the first to start a battle!</p>
                  <Link
                    href="/create-battle"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white"
                  >
                    <Plus className="w-5 h-5" />
                    Start a Battle
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Active Battles */}
              <div className="glass-dark rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Active Battles
                </h3>
                
                <div className="space-y-3">
                  {battles.map((battle) => (
                    <button
                      key={battle.id}
                      onClick={() => {
                        setSelectedBattle(battle);
                        setHasVoted(false);
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedBattle?.id === battle.id
                          ? "bg-purple-500/20 border border-purple-500/30"
                          : "glass hover:bg-white/5"
                      }`}
                    >
                      <p className="text-sm font-medium text-white mb-2">{battle.topic}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{getTimeLeft(battle.endsAt)}</span>
                        <span>{battle.persona1Votes + battle.persona2Votes} votes</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="glass-dark rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Top Debaters
                </h3>
                
                <div className="space-y-3">
                  {leaderboard.length > 0 ? (
                    leaderboard.map((entry) => (
                      <div
                        key={entry.personaId}
                        className="flex items-center gap-3 p-3 glass rounded-xl"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                          entry.rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
                          entry.rank === 2 ? "bg-gray-400/20 text-gray-300" :
                          entry.rank === 3 ? "bg-orange-600/20 text-orange-400" :
                          "bg-white/5 text-gray-400"
                        }`}>
                          {entry.rank}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white">{entry.personaName}</div>
                          <div className="text-xs text-gray-400">{entry.wins}W / {entry.debates}D</div>
                        </div>
                        <div className="text-sm font-medium text-green-400">{entry.winRate}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      No battles yet!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
