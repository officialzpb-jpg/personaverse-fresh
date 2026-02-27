"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  DollarSign, 
  Settings,
  TrendingUp,
  BarChart3,
  Plus,
  MoreVertical,
  Sparkles
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const stats = [
  { label: "Total Chats", value: "1,247", change: "+12%", icon: MessageSquare },
  { label: "Active Personas", value: "3", change: "+1", icon: Users },
  { label: "Earnings", value: "$0.00", change: "—", icon: DollarSign },
  { label: "Avg. Rating", value: "4.8", change: "+0.2", icon: TrendingUp },
];

const recentChats = [
  { persona: "Tech Titan", user: "Anonymous", message: "How do I find product-market fit?", time: "2 min ago" },
  { persona: "Mindful Maya", user: "Sarah K.", message: "Tips for daily meditation?", time: "15 min ago" },
  { persona: "Viral Vince", user: "Mike R.", message: "What's trending on TikTok?", time: "1 hour ago" },
];

const myPersonas = [
  { name: "Tech Mentor", role: "Career Coach", chats: 456, rating: 4.9, status: "Active" },
  { name: "Code Helper", role: "Dev Assistant", chats: 234, rating: 4.7, status: "Active" },
  { name: "Startup Advisor", role: "Business", chats: 128, rating: 4.8, status: "Draft" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 glass border-r border-white/5 min-h-screen hidden lg:block">
          <div className="p-4">
            <div className="flex items-center gap-3 px-4 py-3 bg-purple-500/20 rounded-xl mb-2">
              <LayoutDashboard className="w-5 h-5 text-purple-400" />
              <span className="font-medium text-white">Dashboard</span>
            </div>
            
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span>Chats</span>
            </Link>
            
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
              <Users className="w-5 h-5" />
              <span>My Personas</span>
            </Link>
            
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
              <DollarSign className="w-5 h-5" />
              <span>Earnings</span>
            </Link>
            
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </Link>
            
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome back, Zay</h1>
                <p className="text-gray-400">Here&apos;s what&apos;s happening with your personas</p>
              </div>
              
              <Link
                href="/create"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-medium text-white hover:from-purple-500 hover:to-blue-500 transition-all"
              >
                <Plus className="w-4 h-4" />
                Create Persona
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-green-400">{stat.change}</span>
                  </div>
                  
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Chats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Recent Chats</h2>
                  <Link href="#" className="text-sm text-purple-400 hover:text-purple-300">View all</Link>
                </div>
                
                <div className="space-y-4">
                  {recentChats.map((chat, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 glass rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-medium text-white">
                        {chat.persona[0]}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">{chat.persona}</span>
                          <span className="text-xs text-gray-500">{chat.time}</span>
                        </div>
                        
                        <p className="text-sm text-gray-400 truncate">{chat.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* My Personas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">My Personas</h2>
                  <Link href="#" className="text-sm text-purple-400 hover:text-purple-300">Manage</Link>
                </div>
                
                <div className="space-y-4">
                  {myPersonas.map((persona, index) => (
                    <div key={index} className="flex items-center justify-between p-4 glass rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">
                          🤖
                        </div>
                        
                        <div>
                          <div className="font-medium text-white">{persona.name}</div>
                          <div className="text-sm text-gray-400">{persona.role}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-white">{persona.chats} chats</div>
                          <div className="text-xs text-gray-400">⭐ {persona.rating}</div>
                        </div>
                        
                        <span className={`px-2 py-1 rounded-lg text-xs ${
                          persona.status === "Active" 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {persona.status}
                        </span>
                        
                        <button className="text-gray-400 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Upgrade CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                
                <div>
                  <h3 className="font-semibold text-white">Upgrade to Pro</h3>
                  <p className="text-sm text-gray-400">Unlock unlimited chats, all AI models, and persona creation</p>
                </div>
              </div>
              
              <Link
                href="/pricing"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-medium text-white hover:from-purple-500 hover:to-blue-500 transition-all whitespace-nowrap"
              >
                View Plans
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
