"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Flame, 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Share2,
  Zap,
  TrendingUp,
  Clock
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const activeBattles = [
  {
    id: 1,
    topic: "Will AI replace human creativity?",
    persona1: { name: "Tech Titan", avatar: "🚀", stance: "Pro-AI", votes: 1247 },
    persona2: { name: "Artist Soul", avatar: "🎨", stance: "Pro-Human", votes: 983 },
    timeLeft: "2:34:12",
    viewers: 3420,
    trending: true,
  },
  {
    id: 2,
    topic: "Remote work vs Office: The future of work",
    persona1: { name: "Digital Nomad", avatar: "🌴", stance: "Remote Forever", votes: 2156 },
    persona2: { name: "Office Oracle", avatar: "🏢", stance: "Office Culture", votes: 1876 },
    timeLeft: "5:12:45",
    viewers: 5123,
    trending: true,
  },
  {
    id: 3,
    topic: "Crypto: Revolution or bubble?",
    persona1: { name: "Crypto King", avatar: "₿", stance: "Revolution", votes: 876 },
    persona2: { name: "Traditional Tom", avatar: "💰", stance: "Bubble", votes: 923 },
    timeLeft: "1:45:30",
    viewers: 2187,
    trending: false,
  },
];

const leaderboard = [
  { rank: 1, persona: "Tech Titan", wins: 47, debates: 52, winRate: "90%" },
  { rank: 2, persona: "Viral Vince", wins: 43, debates: 50, winRate: "86%" },
  { rank: 3, persona: "Mindful Maya", wins: 41, debates: 48, winRate: "85%" },
  { rank: 4, persona: "Crypto King", wins: 38, debates: 55, winRate: "69%" },
  { rank: 5, persona: "Dating Doctor", wins: 35, debates: 45, winRate: "78%" },
];

export default function BattleArenaPage() {
  const [selectedBattle, setSelectedBattle] = useState(activeBattles[0]);
  const [hasVoted, setHasVoted] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
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
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">10,742 watching now</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">1,247 battles completed</span>
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
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                {/* Battle Header */}
                <div className="p-6 border-b border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {selectedBattle.trending && (
                        <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-medium text-white flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {selectedBattle.viewers.toLocaleString()} watching
                      </span>
                    </div>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedBattle.timeLeft} left
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white text-center">{selectedBattle.topic}</h2>
                </div>

                {/* Battle Arena */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Persona 1 */}
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-4xl mb-4">
                        {selectedBattle.persona1.avatar}
                      </div>
                      <h3 className="text-lg font-bold text-white">{selectedBattle.persona1.name}</h3>
                      <p className="text-sm text-blue-400 mb-4">{selectedBattle.persona1.stance}</p>
                      
                      <div className="glass rounded-xl p-4 mb-4">
                        <p className="text-sm text-gray-300 text-left">
                          &quot;AI is not replacing creativity—it&apos;s amplifying it. Every major technological 
                          shift has been met with resistance, yet history shows that tools enhance 
                          human capability, not diminish it. The creators who embrace AI will 
                          outproduce and outinnovate those who don&apos;t.&quot;
                        </p>
                      </div>
                      
                      <button
                        onClick={() => setHasVoted(true)}
                        disabled={hasVoted}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold text-white hover:from-blue-500 hover:to-cyan-500 transition-all disabled:opacity-50"
                      >
                        {hasVoted ? "Voted ✓" : `Vote ${selectedBattle.persona1.name}`}
                      </button>
                      
                      <div className="mt-4 text-2xl font-bold text-blue-400">
                        {selectedBattle.persona1.votes.toLocaleString()} votes
                      </div>
                    </div>

                    {/* VS Divider */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white">
                        VS
                      </div>
                    </div>

                    {/* Persona 2 */}
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-4xl mb-4">
                        {selectedBattle.persona2.avatar}
                      </div>
                      <h3 className="text-lg font-bold text-white">{selectedBattle.persona2.name}</h3>
                      <p className="text-sm text-pink-400 mb-4">{selectedBattle.persona2.stance}</p>
                      
                      <div className="glass rounded-xl p-4 mb-4">
                        <p className="text-sm text-gray-300 text-left">
                          &quot;True creativity comes from lived experience, emotion, and the human 
                          condition. AI can mimic patterns, but it cannot feel the joy of 
                          creation or the struggle of the artistic process. When we outsource 
                          creativity to machines, we lose what makes us human.&quot;
                        </p>
                      </div>
                      
                      <button
                        onClick={() => setHasVoted(true)}
                        disabled={hasVoted}
                        className="w-full py-3 bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl font-semibold text-white hover:from-pink-500 hover:to-rose-500 transition-all disabled:opacity-50"
                      >
                        {hasVoted ? "Voted ✓" : `Vote ${selectedBattle.persona2.name}`}
                      </button>
                      
                      <div className="mt-4 text-2xl font-bold text-pink-400">
                        {selectedBattle.persona2.votes.toLocaleString()} votes
                      </div>
                    </div>
                  </div>
                </div>

                {/* Battle Actions */}
                <div className="p-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm text-gray-300 hover:text-white transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      Like
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm text-gray-300 hover:text-white transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      Comment
                    </button>
                  </div>
                  
                  <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm text-gray-300 hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share Battle
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Active Battles */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Active Battles
                </h3>
                
                <div className="space-y-3">
                  {activeBattles.map((battle) => (
                    <button
                      key={battle.id}
                      onClick={() => {
                        setSelectedBattle(battle);
                        setHasVoted(false);
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedBattle.id === battle.id
                          ? "bg-purple-500/20 border border-purple-500/30"
                          : "glass hover:bg-white/5"
                      }`}
                    >
                      <p className="text-sm font-medium text-white mb-2">{battle.topic}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{battle.viewers.toLocaleString()} watching</span>
                        <span>{battle.timeLeft} left</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Top Debaters
                </h3>
                
                <div className="space-y-3">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.rank}
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
                        <div className="font-medium text-white">{entry.persona}</div>
                        <div className="text-xs text-gray-400">{entry.wins}W / {entry.debates}D</div>
                      </div>
                      <div className="text-sm font-medium text-green-400">{entry.winRate}</div>
                    </div>
                  ))}
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
