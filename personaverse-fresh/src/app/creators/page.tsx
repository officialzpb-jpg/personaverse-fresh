"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Crown, 
  DollarSign, 
  Users, 
  BarChart3, 
  Zap,
  Check,
  ArrowRight
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const benefits = [
  {
    icon: DollarSign,
    title: "70% Revenue Share",
    description: "Keep the majority of earnings from every chat and persona sale. We handle infrastructure, you focus on creating.",
  },
  {
    icon: Users,
    title: "Built-in Audience",
    description: "Access our growing community of 50K+ users actively looking for AI personas to chat with.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track earnings, chat volume, user engagement, and growth metrics in real-time.",
  },
  {
    icon: Zap,
    title: "Fan Automation",
    description: "Let your AI persona handle fan questions, DMs, and engagement while you focus on creating content.",
  },
];

const successStories = [
  {
    name: "Sarah Chen",
    role: "Lifestyle Influencer",
    avatar: "SC",
    earnings: "$12,400",
    followers: "250K",
    quote: "My AI persona handles 80% of fan DMs now. I can focus on creating while still connecting with my audience.",
  },
  {
    name: "Marcus Johnson",
    role: "Tech Educator",
    avatar: "MJ",
    earnings: "$8,900",
    followers: "180K",
    quote: "Students love getting instant help from my AI. It's like having a teaching assistant available 24/7.",
  },
  {
    name: "Emma Rodriguez",
    role: "Fitness Coach",
    avatar: "ER",
    earnings: "$15,200",
    followers: "320K",
    quote: "My clients get personalized workout advice anytime. The engagement has increased my course sales by 3x.",
  },
];

const features = [
  "Custom branding for your persona",
  "Multi-platform integration",
  "Revenue analytics & reporting",
  "Priority support channel",
  "Early access to new features",
  "API access for custom integrations",
  "Marketing promotion on our platform",
  "Dedicated success manager",
];

export default function CreatorsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />
      
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              >
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-gray-300">Creator Program</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Turn Your Influence Into{" "}
                <span className="gradient-text">AI-Powered Income</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-400 mb-8"
              >
                Create your AI persona, let fans chat with it 24/7, and earn revenue 
                while you sleep. Join thousands of creators already monetizing their digital presence.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/signup?plan=creator"
                  className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all"
                >
                  Apply as Creator
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="#how-it-works"
                  className="px-8 py-4 glass rounded-xl font-semibold text-white hover:bg-white/10 transition-all"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="text-center mb-6">
                <div className="text-5xl font-bold gradient-text mb-2">$2M+</div>
                <p className="text-gray-400">Paid to creators this year</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">5,000+</div>
                  <p className="text-sm text-gray-400">Active Creators</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <p className="text-sm text-gray-400">Daily Chats</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Creators Choose{" "}
              <span className="gradient-text">PersonaVerse</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to monetize your digital presence and engage with fans at scale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 card-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Creator{" "}
              <span className="gradient-text">Success Stories</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white">
                    {story.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{story.name}</div>
                    <div className="text-sm text-gray-400">{story.role}</div>
                  </div>
                </div>
                
                <blockquote className="text-gray-300 mb-4 italic">&quot;{story.quote}&quot;</blockquote>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <div className="text-lg font-bold text-green-400">{story.earnings}</div>
                    <div className="text-xs text-gray-400">Monthly earnings</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{story.followers}</div>
                    <div className="text-xs text-gray-400">Followers</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Everything You Need to{" "}
                <span className="gradient-text">Succeed</span>
              </h2>
              
              <p className="text-gray-400 mb-8">
                Our Creator plan includes all the tools and support you need to build 
                a thriving AI persona business.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 mb-4">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">Creator Plan</span>
                </div>
                
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-white">$99</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-gray-400">Revenue Share</span>
                  <span className="text-green-400 font-semibold">70%</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-gray-400">API Calls</span>
                  <span className="text-white">50,000/mo</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-gray-400">Support</span>
                  <span className="text-white">Dedicated</span>
                </div>
              </div>
              
              <Link
                href="/signup?plan=creator"
                className="block w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white text-center hover:from-purple-500 hover:to-blue-500 transition-all"
              >
                Apply Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
