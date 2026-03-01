"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Shield, 
  Lock, 
  UserCheck, 
  FileText, 
  Scale,
  Eye,
  Server,
  AlertTriangle,
  Check,
  Mail
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const safetyFeatures = [
  {
    icon: UserCheck,
    title: "No Unauthorized Impersonation",
    description: "We strictly prohibit creating AI personas of real individuals without their explicit written consent. Every creator persona is verified.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All conversations are encrypted in transit and at rest. Your data is protected with industry-standard AES-256 encryption.",
  },
  {
    icon: Eye,
    title: "Transparent Data Usage",
    description: "We clearly explain how your data is used. We never sell your personal information to third parties.",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "SOC 2 Type II certified infrastructure with regular security audits and penetration testing.",
  },
  {
    icon: Scale,
    title: "Right of Publicity Compliance",
    description: "We ensure all creator personas comply with right-of-publicity laws and have proper licensing agreements in place.",
  },
  {
    icon: AlertTriangle,
    title: "Content Moderation",
    description: "AI-powered and human-reviewed moderation systems to prevent harmful content and misuse.",
  },
];

const policies = [
  {
    title: "Privacy Policy",
    icon: FileText,
    description: "How we collect, use, and protect your personal information.",
    href: "#privacy",
  },
  {
    title: "Terms of Service",
    icon: Scale,
    description: "The rules and guidelines for using PersonaVerse.",
    href: "#terms",
  },
  {
    title: "Creator Agreement",
    icon: UserCheck,
    description: "Terms for creators building and monetizing personas.",
    href: "#creator",
  },
  {
    title: "Acceptable Use",
    icon: Shield,
    description: "What is and isn't allowed on our platform.",
    href: "#acceptable-use",
  },
];

export default function TrustPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />
      
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-gray-300">Trust & Safety</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Your Safety Is Our{" "}
            <span className="text-emerald-400">Priority</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            We&apos;re committed to building a safe, ethical, and trustworthy platform 
            for AI-powered conversations. Learn about our safety measures and policies.
          </motion.p>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Safety &{" "}
              <span className="text-emerald-400">Ethics</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our comprehensive approach to keeping PersonaVerse safe and ethical for everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-400" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section id="privacy" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Legal{" "}
              <span className="text-emerald-400">Policies</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={policy.href}>
                  <div className="glass rounded-2xl p-6 card-lift group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                        <policy.icon className="w-6 h-6 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{policy.title}</h3>
                        <p className="text-sm text-gray-400">{policy.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy-detail" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Privacy Policy Summary</h2>
            
            <div className="space-y-6 text-gray-300">
              <p>
                At PersonaVerse, we take your privacy seriously. This summary explains how we handle your data:
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Data Collection:</strong> We collect only what&apos;s necessary 
                    to provide our services - account info, chat history, and usage data.
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Data Usage:</strong> Your data is used to improve 
                    our AI models and provide personalized experiences. We never sell your data.
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Data Retention:</strong> Chat histories are retained 
                    for 90 days by default. You can delete your data at any time.
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Your Rights:</strong> You can access, export, 
                    or delete your data at any time from your account settings.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-emerald-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Questions or Concerns?</h2>
            
            <p className="text-gray-400 mb-6">
              Our trust and safety team is here to help. Reach out anytime.
            </p>
            
            <a
              href="mailto:safety@personaverse.ai"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-semibold text-white hover:from-emerald-500 hover:to-teal-500 transition-all"
            >
              Contact Safety Team
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
