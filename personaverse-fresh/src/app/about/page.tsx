"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Sparkles, 
  Target, 
  Rocket,
  Globe,
  Heart,
  Zap,
  ArrowRight,
  Shield
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const values = [
  {
    icon: Heart,
    title: "Human-Centered",
    description: "Technology should enhance human connection, not replace it. We build tools that bring people closer together.",
  },
  {
    icon: Zap,
    title: "Innovation First",
    description: "We&apos;re pushing the boundaries of what&apos;s possible with AI, always exploring new ways to create value for our users.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "We prioritize ethical AI development and user safety above all else. Responsible innovation is our commitment.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "AI should be accessible to everyone. We&apos;re building a platform that serves creators and users from all walks of life.",
  },
];

const milestones = [
  { year: "2023", title: "PersonaVerse Founded", description: "Started with a vision to humanize AI interactions" },
  { year: "2024", title: "Beta Launch", description: "First 10,000 users join the platform" },
  { year: "2024", title: "Creator Program", description: "Launched monetization for AI persona creators" },
  { year: "2025", title: "Multi-Model Support", description: "Added GPT-4, Claude, and Gemini integration" },
  { year: "2025", title: "Global Expansion", description: "Available in 50+ countries with localized personas" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />
      
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Our Story</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Building the Future of{" "}
            <span className="gradient-text">Human-AI Connection</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400"
          >
            PersonaVerse was founded with a simple belief: AI should feel personal, 
            engaging, and accessible to everyone. We&apos;re creating a world where 
            anyone can have meaningful conversations with AI that truly understands them.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-300">Our Mission</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Democratizing Access to{" "}
                <span className="gradient-text">Expert Knowledge</span>
              </h2>
              
              <p className="text-gray-400 mb-6">
                We believe everyone deserves access to personalized guidance, mentorship, 
                and expertise. By creating AI personas that embody the knowledge and 
                personality of experts, we&apos;re making high-quality advice accessible 24/7.
              </p>
              
              <p className="text-gray-400">
                Whether you&apos;re a founder seeking startup advice, a student looking for 
                tutoring, or someone who wants to learn from the best, PersonaVerse 
                connects you with AI personalities that can help you grow.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">10K+</div>
                  <div className="text-sm text-gray-400">AI Personas</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">5K+</div>
                  <div className="text-sm text-gray-400">Creators</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">50+</div>
                  <div className="text-sm text-gray-400">Countries</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our{" "}
              <span className="gradient-text">Values</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our{" "}
              <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="w-24 flex-shrink-0 text-right">
                  <div className="text-lg font-bold text-purple-400">{milestone.year}</div>
                </div>
                
                <div className="w-px bg-gradient-to-b from-purple-500 to-blue-500 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-500" />
                </div>
                
                <div className="flex-1 pb-8">
                  <div className="glass rounded-xl p-4">
                    <h3 className="font-semibold text-white mb-1">{milestone.title}</h3>
                    <p className="text-sm text-gray-400">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <Rocket className="w-12 h-12 text-purple-400 mx-auto mb-6" />
            
            <h2 className="text-3xl font-bold text-white mb-4">Join the Future</h2>
            
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Be part of the revolution in human-AI interaction. Start chatting, 
              creating, or building with PersonaVerse today.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/careers"
                className="px-8 py-4 glass rounded-xl font-semibold text-white hover:bg-white/10 transition-all"
              >
                View Careers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
