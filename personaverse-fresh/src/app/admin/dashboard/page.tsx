"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  DollarSign,
  TrendingUp,
  LogOut,
  Shield,
  BarChart3,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Server,
  Zap,
  Clock
} from "lucide-react";

// Mock data - in production this would come from your backend
const mockAnalytics = {
  totalUsers: 5243,
  activeUsers: 1847,
  totalChats: 45231,
  totalRevenue: 28450,
  newUsersToday: 47,
  chatsToday: 892,
  revenueToday: 485,
  conversionRate: 3.2,
  avgSessionDuration: "12m 34s",
  bounceRate: 42.1,
  topPersonas: [
    { name: "Tech Titan", chats: 4521, rating: 4.9 },
    { name: "Viral Vince", chats: 3892, rating: 4.8 },
    { name: "Mindful Maya", chats: 3241, rating: 4.9 },
    { name: "Dating Doctor", chats: 2891, rating: 4.7 },
    { name: "Game Guru", chats: 2156, rating: 4.6 },
  ],
  recentActivity: [
    { action: "New user signup", user: "john@example.com", time: "2 min ago" },
    { action: "Persona created", user: "sarah@example.com", time: "5 min ago" },
    { action: "Pro subscription", user: "mike@example.com", time: "12 min ago" },
    { action: "Chat session", user: "emma@example.com", time: "18 min ago" },
  ],
  serverStatus: {
    uptime: "99.9%",
    cpu: 34,
    memory: 62,
    disk: 45,
  }
};

const statsCards = [
  { title: "Total Users", value: mockAnalytics.totalUsers, change: "+12%", icon: Users, color: "blue" },
  { title: "Active Users", value: mockAnalytics.activeUsers, change: "+8%", icon: Activity, color: "green" },
  { title: "Total Chats", value: mockAnalytics.totalChats, change: "+24%", icon: MessageSquare, color: "purple" },
  { title: "Revenue", value: `$${mockAnalytics.totalRevenue.toLocaleString()}`, change: "+18%", icon: DollarSign, color: "amber" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem("adminSession");
    if (!session) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="glass border-r border-white/5 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <div className="font-bold text-white">Admin</div>
                <div className="text-xs text-gray-400">Dashboard</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "users", label: "Users", icon: Users },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
            { id: "personas", label: "Personas", icon: MessageSquare },
            { id: "revenue", label: "Revenue", icon: DollarSign },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-amber-600/20 to-orange-600/20 text-amber-400 border border-amber-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="glass border-b border-white/5 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 glass rounded-lg text-gray-400 hover:text-white"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 glass rounded-lg text-gray-400 hover:text-white relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-sm font-bold text-white">
                  A
                </div>
                <div className="text-sm">
                  <div className="text-white font-medium">Admin</div>
                  <div className="text-gray-400">Super Admin</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`
                      }
                      >
                        <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                      </div>
                      <span className="flex items-center gap-1 text-sm text-green-400">
                        <ArrowUpRight className="w-4 h-4" />
                        {stat.change}
                      </span>
                    </div>
                    
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.title}</div>
                  </motion.div>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Top Personas */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="lg:col-span-2 glass rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">Top Performing Personas</h2>
                    <button className="text-sm text-amber-400 hover:text-amber-300">View All</button>
                  </div>
                  
                  <div className="space-y-4">
                    {mockAnalytics.topPersonas.map((persona, index) => (
                      <div key={persona.name} className="flex items-center gap-4 p-4 glass rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white">
                          {index + 1}
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-medium text-white">{persona.name}</div>
                          <div className="text-sm text-gray-400">{persona.chats.toLocaleString()} chats</div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-white">{persona.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Server Status & Activity */}
                <div className="space-y-6">
                  {/* Server Status */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Server className="w-5 h-5 text-green-400" />
                      <h2 className="text-lg font-semibold text-white">Server Status</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">CPU Usage</span>
                          <span className="text-white">{mockAnalytics.serverStatus.cpu}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                            style={{ width: `${mockAnalytics.serverStatus.cpu}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Memory</span>
                          <span className="text-white">{mockAnalytics.serverStatus.memory}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                            style={{ width: `${mockAnalytics.serverStatus.memory}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Uptime</span>
                          <span className="text-green-400 font-medium">{mockAnalytics.serverStatus.uptime}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Clock className="w-5 h-5 text-purple-400" />
                      <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                    </div>
                    
                    <div className="space-y-3">
                      {mockAnalytics.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 text-sm">
                          <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5"></div>
                          <div className="flex-1">
                            <div className="text-white">{activity.action}</div>
                            <div className="text-gray-400">{activity.user}</div>
                          </div>
                          <div className="text-gray-500">{activity.time}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs would go here */}
          {activeTab !== "overview" && (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 flex items-center justify-center mb-4">
                <Settings className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
              <p className="text-gray-400">This section is under development.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
