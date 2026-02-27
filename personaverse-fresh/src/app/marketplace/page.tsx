"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ShoppingBag, 
  TrendingUp, 
  Star, 
  Crown,
  Zap
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const categories = [
  { name: "Business", count: 234, icon: "💼" },
  { name: "Dating", count: 189, icon: "💕" },
  { name: "Education", count: 312, icon: "📚" },
  { name: "Entertainment", count: 456, icon: "🎬" },
  { name: "Wellness", count: 278, icon: "🧘" },
  { name: "Creative", count: 198, icon: "🎨" },
];

const trendingPersonas = [
  {
    id: 1,
    name: "Executive Coach Pro",
    creator: "Leadership Labs",
    price: 29.99,
    rating: 4.9,
    reviews: 128,
    sales: 542,
    image: "👔",
    color: "from-blue-500 to-indigo-500",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Dating Mastery",
    creator: "Relationship Experts",
    price: 19.99,
    rating: 4.8,
    reviews: 256,
    sales: 892,
    image: "💝",
    color: "from-pink-500 to-rose-500",
    badge: "Trending",
  },
  {
    id: 3,
    name: "Code Interview Prep",
    creator: "Tech Interview Pro",
    price: 39.99,
    rating: 4.9,
    reviews: 89,
    sales: 423,
    image: "💻",
    color: "from-green-500 to-emerald-500",
    badge: null,
  },
  {
    id: 4,
    name: "Fitness AI Trainer",
    creator: "FitLife AI",
    price: 24.99,
    rating: 4.7,
    reviews: 167,
    sales: 678,
    image: "💪",
    color: "from-orange-500 to-red-500",
    badge: "New",
  },
];

const topCreators = [
  { name: "Leadership Labs", earnings: "$45K", personas: 12 },
  { name: "Relationship Experts", earnings: "$38K", personas: 8 },
  { name: "Tech Interview Pro", earnings: "$32K", personas: 5 },
  { name: "FitLife AI", earnings: "$28K", personas: 6 },
];

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />
      
      {/* Hero */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-amber-600/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <ShoppingBag className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">Persona Marketplace</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Premium{" "}
              <span className="gradient-text">AI Personas</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Buy professional-grade AI personas created by experts. 
              Or create and sell your own to earn revenue.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all"
              >
                Start Selling
              </Link>
              <Link
                href="#trending"
                className="px-8 py-3 glass rounded-xl font-semibold text-white hover:bg-white/10 transition-all"
              >
                Browse Personas
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "2,500+", label: "Premium Personas" },
              { value: "$2M+", label: "Creator Earnings" },
              { value: "50K+", label: "Happy Customers" },
              { value: "4.8★", label: "Average Rating" },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6 text-center">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-white mb-6"
          >
            Browse by Category
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/marketplace/category/${category.name.toLowerCase()}`}>
                  <div className="glass rounded-xl p-6 text-center card-lift group">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                    <h3 className="font-semibold text-white mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-400">{category.count} personas</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section id="trending" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-bold text-white">Trending Now</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingPersonas.map((persona, index) => (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/marketplace/${persona.id}`}>
                  <div className="glass-card rounded-2xl overflow-hidden card-lift group">
                    {/* Image Area */}
                    <div className={`h-32 bg-gradient-to-br ${persona.color} flex items-center justify-center relative`}>
                      <div className="text-6xl">{persona.image}</div>
                      
                      {persona.badge && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-xs font-medium text-white">
                          {persona.badge}
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">{persona.name}</h3>
                      <p className="text-sm text-gray-400 mb-3">by {persona.creator}</p>
                      
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-white">{persona.rating}</span>
                        <span className="text-sm text-gray-500">({persona.reviews})</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-white">${persona.price}</span>
                        </div>
                        
                        <div className="text-sm text-gray-400">{persona.sales} sold</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Program CTA */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-4">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-white">Creator Program</span>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  Create & Sell Your Own Personas
                </h2>
                
                <p className="text-gray-300 mb-6">
                  Join thousands of creators earning revenue from their AI personas. 
                  Keep 70% of every sale. We handle hosting, payments, and distribution.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/creators"
                    className="px-6 py-3 bg-white text-purple-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Top Creators This Month</h3>
                
                <div className="space-y-3">
                  {topCreators.map((creator, index) => (
                    <div key={creator.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white text-sm">
                          {index + 1}
                        </div>
                        <span className="text-white">{creator.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-semibold">{creator.earnings}</div>
                        <div className="text-xs text-gray-400">{creator.personas} personas</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
