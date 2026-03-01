"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Tag,
  User
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const featuredPost = {
  title: "Introducing Fusion Mode: The Future of AI Conversations",
  excerpt: "We're excited to announce Fusion Mode, a revolutionary feature that combines responses from multiple AI models to give you the best possible answer every time.",
  image: "🔄",
  category: "Product",
  author: "Sarah Kim",
  date: "Feb 20, 2025",
  readTime: "5 min read",
};

const posts = [
  {
    id: 1,
    title: "How Creators Are Earning $10K+ Monthly with AI Personas",
    excerpt: "Discover the strategies top creators use to monetize their digital presence through PersonaVerse.",
    category: "Creator Stories",
    author: "Alex Chen",
    date: "Feb 18, 2025",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "The Ethics of AI Personas: Our Commitment to Responsible AI",
    excerpt: "An in-depth look at our safety measures and ethical guidelines for AI persona creation.",
    category: "Safety",
    author: "Emily Rodriguez",
    date: "Feb 15, 2025",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Building the Perfect AI Persona: A Complete Guide",
    excerpt: "Learn how to create engaging, helpful AI personalities that users love to chat with.",
    category: "Tutorial",
    author: "Marcus Johnson",
    date: "Feb 12, 2025",
    readTime: "12 min read",
  },
  {
    id: 4,
    title: "GPT-4 vs Claude 3: Which Model Should You Choose?",
    excerpt: "A detailed comparison of the top AI models available on PersonaVerse.",
    category: "Tech",
    author: "David Kim",
    date: "Feb 10, 2025",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "PersonaVerse Raises $10M Series A Funding",
    excerpt: "We're thrilled to announce our latest funding round and what's next for the platform.",
    category: "Company",
    author: "Alex Chen",
    date: "Feb 8, 2025",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "5 Ways AI Personas Are Transforming Education",
    excerpt: "From personalized tutoring to 24/7 homework help, see how students are benefiting.",
    category: "Education",
    author: "Lisa Thompson",
    date: "Feb 5, 2025",
    readTime: "6 min read",
  },
];

const categories = [
  "All",
  "Product",
  "Creator Stories",
  "Safety",
  "Tutorial",
  "Tech",
  "Company",
  "Education",
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />
      
      {/* Hero */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">Blog</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Latest{" "}
              <span className="gradient-text">Updates</span>
            </h1>
            
            <p className="text-gray-400 max-w-2xl mx-auto">
              News, tutorials, and insights from the PersonaVerse team
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 glass rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="#">
              <div className="glass-card rounded-2xl overflow-hidden card-lift">
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-auto bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                    <div className="text-8xl">{featuredPost.image}</div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                        {featuredPost.category}
                      </span>
                      
                      <span className="text-sm text-gray-400">{featuredPost.date}</span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-4 hover:text-purple-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-gray-400 mb-6">{featuredPost.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="glass rounded-2xl p-6 card-lift h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 bg-white/5 text-gray-400 rounded-lg text-xs">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2 hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-gray-400 mb-4 flex-1">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 text-center"
          >
            <Tag className="w-12 h-12 text-purple-400 mx-auto mb-6" />
            
            <h2 className="text-2xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
            
            <p className="text-gray-400 mb-6">
              Get the latest updates, tutorials, and creator stories delivered to your inbox.
            </p>
            
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
