"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Calendar,
  Star,
  Loader2
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface Stats {
  totalChats: number;
  chatsThisMonth: number;
  totalMessages: number;
  mostPopularPersona: string | null;
  userPersonas: number;
}

interface Activity {
  date: string;
  count: number;
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

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchAnalytics();
    }
  }, [status, router]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics", {
        credentials: "include",
      });
      
      if (!response.ok) throw new Error("Failed to fetch");
      
      const data = await response.json();
      setStats(data.stats);
      setActivity(data.activity);
    } catch (error) {
      console.error("Error fetching analytics:", error);
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

  const maxActivity = Math.max(...activity.map(a => a.count), 1);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Track your PersonaVerse activity and engagement</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={MessageSquare}
              label="Total Chats"
              value={stats?.totalChats || 0}
              color="purple"
            />
            <StatCard
              icon={Calendar}
              label="This Month"
              value={stats?.chatsThisMonth || 0}
              color="blue"
            />
            <StatCard
              icon={TrendingUp}
              label="Total Messages"
              value={stats?.totalMessages || 0}
              color="green"
            />
            <StatCard
              icon={Users}
              label="Your Personas"
              value={stats?.userPersonas || 0}
              color="orange"
            />
          </div>

          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Activity (Last 7 Days)</h2>
            </div>

            <div className="flex items-end gap-2 h-48">
              {activity.map((day, index) => (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-lg transition-all hover:from-purple-500 hover:to-blue-400"
                    style={{
                      height: `${(day.count / maxActivity) * 100}%`,
                      minHeight: day.count > 0 ? '4px' : '0',
                    }}
                  />
                  <span className="text-xs text-gray-400">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'narrow' })}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Most Popular Persona */}
          {stats?.mostPopularPersona && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">Most Popular Persona</h2>
              </div>
              
              <p className="text-2xl font-semibold text-white">
                {PERSONA_NAMES[stats.mostPopularPersona] || stats.mostPopularPersona}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: any; 
  label: string; 
  value: number; 
  color: string;
}) {
  const colors: Record<string, string> = {
    purple: "from-purple-500 to-blue-500",
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    orange: "from-orange-500 to-red-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-white">{value.toLocaleString()}</p>
        </div>
      </div>
    </motion.div>
  );
}
