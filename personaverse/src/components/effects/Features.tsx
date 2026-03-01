"use client";

import { motion } from "framer-motion";
import { 
  Bot, 
  Cpu, 
  Palette, 
  Store, 
  Shield, 
  Code, 
  Heart, 
  Trophy,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Persona Chat Hub",
    description: "Chat with AI personalities inspired by creator archetypes. From viral content creators to tech entrepreneurs, each persona has unique knowledge and personality.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Cpu,
    title: "Multi-Model Integration",
    description: "Switch seamlessly between GPT-4, Claude 3, Gemini, and open-source models. Our Fusion Mode combines multiple models for the best possible response.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "Persona Creator Tool",
    description: "Build your own AI persona with custom personality traits, voice, and tone. Upload text samples, adjust sliders, and bring your digital twin to life.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Store,
    title: "Persona Marketplace",
    description: "Buy, sell, and discover premium AI personas. Creators earn revenue from their personas while users access specialized expertise.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "AI Safety & Ethics",
    description: "Built with safety first. No unauthorized impersonation, full user consent, data encryption, and compliance with right-of-publicity laws.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: Code,
    title: "Developer API",
    description: "Embed personas in your apps, websites, and games. Full API access with comprehensive documentation and SDKs for all major platforms.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Heart,
    title: "Digital Legacy Mode",
    description: "Preserve your personality for future generations. Create a lasting digital legacy that your family can interact with for years to come.",
    color: "from-rose-500 to-red-500",
  },
  {
    icon: Trophy,
    title: "Battle Arena",
    description: "Watch AI personas debate topics in real-time. Vote on winners, climb leaderboards, and share epic AI battles with your friends.",
    color: "from-yellow-500 to-amber-500",
  },
];

export function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Powerful Features</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Everything you need to{" "}
            <span className="gradient-text">create, chat, and monetize</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            From casual users to enterprise developers, PersonaVerse provides the tools 
            to build the future of AI-powered conversations.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full glass-card rounded-2xl p-6 card-lift relative overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
