"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Bot, Zap, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Now with Fusion Mode — ensemble AI responses</span>
            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">NEW</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="block text-white">Chat with AI Personalities.{" "}</span>
            <span className="block gradient-text mt-2">Switch AI Models.{" "}</span>
            <span className="block text-white mt-2">Create Your Digital Twin.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            The first platform where personalities, creators, and AI models converge.
            GPT, Claude, Gemini — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/signup"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all duration-200 glow-purple"
            >
              Start Chatting Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/create"
              className="flex items-center gap-2 px-8 py-4 glass rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-200"
            >
              <Bot className="w-5 h-5" />
              Create Your Persona
            </Link>
            <Link
              href="/creators"
              className="flex items-center gap-2 px-8 py-4 glass rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-200"
            >
              <Users className="w-5 h-5" />
              For Creators
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {[
              { value: "50K+", label: "Active Users" },
              { value: "10K+", label: "AI Personas" },
              { value: "5", label: "AI Models" },
              { value: "$2M+", label: "Creator Earnings" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Demo Chat Widget */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-1">
            <div className="bg-[#0a0a0a] rounded-xl overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Tech Entrepreneur Persona</div>
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Online
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Model:</span>
                  <select className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white">
                    <option>GPT-4</option>
                    <option>Claude 3</option>
                    <option>Gemini</option>
                    <option>Fusion Mode</option>
                  </select>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 h-64 overflow-y-auto">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">You</span>
                  </div>
                  <div className="glass rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm text-gray-300">What advice would you give to a first-time founder?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-gray-200">
                      Three things: 1) Validate before you build — talk to 50 potential customers first. 
                      2) Speed is your only advantage as a startup, so ship fast and iterate. 
                      3) Your first idea is probably wrong, so stay flexible and pivot when data tells you to.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">You</span>
                  </div>
                  <div className="glass rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm text-gray-300">How do I know when to pivot vs. persevere?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-gray-200 typing-cursor">
                      Look at your retention curve...
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="px-4 py-3 border-t border-white/5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                    readOnly
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white hover:from-purple-500 hover:to-blue-500 transition-all">
                    <Zap className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
