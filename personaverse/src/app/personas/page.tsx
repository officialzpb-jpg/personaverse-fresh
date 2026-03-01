"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Star, 
  TrendingUp,
  Zap,
  Users,
  Sparkles
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const categories = [
  "All",
  "Business",
  "Creative",
  "Education",
  "Entertainment",
  "Lifestyle",
  "Tech",
];

const personas = [
  {
    id: 1,
    name: "Viral Vince",
    role: "Content Creator",
    description: "Master of viral content strategy. Knows what makes people click, share, and engage.",
    avatar: "🔥",
    color: "from-orange-500 to-red-500",
    category: "Creative",
    stats: { chats: "12.5K", rating: "4.9" },
    tags: ["Social Media", "Growth", "Trends"],
    trending: true,
    featured: true,
  },
  {
    id: 2,
    name: "Tech Titan",
    role: "Entrepreneur",
    description: "Serial founder with 3 exits. Advice on fundraising, product-market fit, and scaling.",
    avatar: "🚀",
    color: "from-blue-500 to-cyan-500",
    category: "Business",
    stats: { chats: "8.2K", rating: "4.8" },
    tags: ["Startups", "VC", "Leadership"],
    trending: false,
    featured: true,
  },
  {
    id: 3,
    name: "Mindful Maya",
    role: "Life Coach",
    description: "Certified life coach specializing in mindfulness, productivity, and mental wellness.",
    avatar: "🧘",
    color: "from-emerald-500 to-teal-500",
    category: "Lifestyle",
    stats: { chats: "15.1K", rating: "4.9" },
    tags: ["Wellness", "Mindfulness", "Growth"],
    trending: true,
    featured: false,
  },
  {
    id: 4,
    name: "Game Guru",
    role: "Gaming Streamer",
    description: "Pro gamer turned streamer. Tips on content, community building, and gaming strategy.",
    avatar: "🎮",
    color: "from-purple-500 to-pink-500",
    category: "Entertainment",
    stats: { chats: "9.8K", rating: "4.7" },
    tags: ["Gaming", "Streaming", "Esports"],
    trending: false,
    featured: false,
  },
  {
    id: 5,
    name: "Dating Doctor",
    role: "Relationship Coach",
    description: "Expert in modern dating, communication skills, and building meaningful connections.",
    avatar: "💝",
    color: "from-pink-500 to-rose-500",
    category: "Lifestyle",
    stats: { chats: "11.3K", rating: "4.8" },
    tags: ["Dating", "Relationships", "Social"],
    trending: true,
    featured: false,
  },
  {
    id: 6,
    name: "Code Wizard",
    role: "Senior Developer",
    description: "Full-stack expert. Help with architecture, debugging, and career advice for devs.",
    avatar: "⚡",
    color: "from-indigo-500 to-violet-500",
    category: "Tech",
    stats: { chats: "6.7K", rating: "4.9" },
    tags: ["Coding", "Architecture", "Career"],
    trending: false,
    featured: true,
  },
  {
    id: 7,
    name: "Professor Pixel",
    role: "Digital Art Teacher",
    description: "Learn digital art, design principles, and creative software from a pro.",
    avatar: "🎨",
    color: "from-amber-500 to-orange-500",
    category: "Creative",
    stats: { chats: "4.2K", rating: "4.8" },
    tags: ["Art", "Design", "Creative"],
    trending: false,
    featured: false,
  },
  {
    id: 8,
    name: "Finance Felix",
    role: "Financial Advisor",
    description: "Personal finance, investing, and wealth building strategies for everyone.",
    avatar: "💰",
    color: "from-green-500 to-emerald-500",
    category: "Business",
    stats: { chats: "7.5K", rating: "4.7" },
    tags: ["Finance", "Investing", "Wealth"],
    trending: false,
    featured: false,
  },
  {
    id: 9,
    name: "History Hank",
    role: "History Enthusiast",
    description: "Passionate about history. Deep dives into events, figures, and civilizations.",
    avatar: "📚",
    color: "from-amber-700 to-yellow-600",
    category: "Education",
    stats: { chats: "3.1K", rating: "4.9" },
    tags: ["History", "Education", "Stories"],
    trending: false,
    featured: false,
  },
];

export default function PersonasPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPersonas = personas.filter((persona) => {
    const matchesCategory = activeCategory === "All" || persona.category === activeCategory;
    const matchesSearch = persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         persona.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPersonas = personas.filter((p) => p.featured);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />
      
      {/* Hero */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">{personas.length}+ AI Personalities</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Meet Our{" "}
              <span className="gradient-text">AI Personas</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Chat with AI personalities crafted by experts. Each with unique knowledge, 
              personality, and expertise to help you learn, grow, and be entertained.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search personas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "glass text-gray-300 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Personas */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Featured Personas</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredPersonas.map((persona, index) => (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/personas/${persona.id}`}>
                  <div className="glass-card rounded-2xl p-6 card-lift group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${persona.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                        {persona.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">{persona.name}</h3>
                        <p className="text-sm text-purple-400">{persona.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-4">{persona.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-sm text-gray-400">
                          <MessageCircle className="w-4 h-4" />
                          {persona.stats.chats}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-400">
                          <Star className="w-4 h-4 text-yellow-400" />
                          {persona.stats.rating}
                        </span>
                      </div>
                      
                      <span className="px-3 py-1 bg-white/5 rounded-lg text-xs text-gray-400">
                        {persona.category}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Personas */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <Zap className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">All Personas</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPersonas.map((persona, index) => (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/personas/${persona.id}`}>
                  <div className="glass rounded-2xl p-6 card-lift group relative overflow-hidden">
                    {persona.trending && (
                      <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-medium text-white flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </div>
                    )}
                    
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${persona.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                        {persona.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-white group-hover:text-purple-400 transition-colors">{persona.name}</h3>
                        <p className="text-sm text-purple-400">{persona.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{persona.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {persona.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <MessageCircle className="w-3 h-3" />
                          {persona.stats.chats}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Star className="w-3 h-3 text-yellow-400" />
                          {persona.stats.rating}
                        </span>
                      </div>
                      
                      <span className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-400">
                        {persona.category}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPersonas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No personas found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
