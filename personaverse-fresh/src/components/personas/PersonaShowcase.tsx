"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle, Star, TrendingUp } from "lucide-react";

const personas = [
  {
    id: 1,
    name: "Viral Vince",
    role: "Content Creator",
    description: "Master of viral content strategy. Knows what makes people click, share, and engage.",
    avatar: "🔥",
    color: "from-orange-500 to-red-500",
    stats: { chats: "12.5K", rating: "4.9" },
    tags: ["Social Media", "Growth", "Trends"],
    trending: true,
  },
  {
    id: 2,
    name: "Tech Titan",
    role: "Entrepreneur",
    description: "Serial founder with 3 exits. Advice on fundraising, product-market fit, and scaling.",
    avatar: "🚀",
    color: "from-blue-500 to-cyan-500",
    stats: { chats: "8.2K", rating: "4.8" },
    tags: ["Startups", "VC", "Leadership"],
    trending: false,
  },
  {
    id: 3,
    name: "Mindful Maya",
    role: "Life Coach",
    description: "Certified life coach specializing in mindfulness, productivity, and mental wellness.",
    avatar: "🧘",
    color: "from-emerald-500 to-teal-500",
    stats: { chats: "15.1K", rating: "4.9" },
    tags: ["Wellness", "Mindfulness", "Growth"],
    trending: true,
  },
  {
    id: 4,
    name: "Game Guru",
    role: "Gaming Streamer",
    description: "Pro gamer turned streamer. Tips on content, community building, and gaming strategy.",
    avatar: "🎮",
    color: "from-purple-500 to-pink-500",
    stats: { chats: "9.8K", rating: "4.7" },
    tags: ["Gaming", "Streaming", "Esports"],
    trending: false,
  },
  {
    id: 5,
    name: "Dating Doctor",
    role: "Relationship Coach",
    description: "Expert in modern dating, communication skills, and building meaningful connections.",
    avatar: "💝",
    color: "from-pink-500 to-rose-500",
    stats: { chats: "11.3K", rating: "4.8" },
    tags: ["Dating", "Relationships", "Social"],
    trending: true,
  },
  {
    id: 6,
    name: "Code Wizard",
    role: "Senior Developer",
    description: "Full-stack expert. Help with architecture, debugging, and career advice for devs.",
    avatar: "⚡",
    color: "from-indigo-500 to-violet-500",
    stats: { chats: "6.7K", rating: "4.9" },
    tags: ["Coding", "Architecture", "Career"],
    trending: false,
  },
];

export function PersonaShowcase() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[150px]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4"
            >
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-gray-300">Trending Now</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              Meet Our{" "}
              <span className="gradient-text">Top Personas</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 mt-2 max-w-xl"
            >
              Discover AI personalities crafted by experts. Each with unique knowledge, 
              personality, and expertise.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/personas"
              className="group inline-flex items-center gap-2 px-6 py-3 glass rounded-xl font-medium text-white hover:bg-white/10 transition-all"
            >
              View All Personas
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/personas/${persona.id}`}>
                <div className="group glass-card rounded-2xl p-6 card-lift relative overflow-hidden">
                  {/* Trending Badge */}
                  {persona.trending && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-medium text-white flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  )}
                  
                  {/* Avatar & Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${persona.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                      {persona.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {persona.name}
                      </h3>
                      <p className="text-sm text-purple-400">{persona.role}</p>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{persona.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {persona.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <MessageCircle className="w-4 h-4" />
                        {persona.stats.chats}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {persona.stats.rating}
                      </div>
                    </div>
                    
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
