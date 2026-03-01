"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Code, 
  Copy, 
  Check, 
  Book, 
  Zap,
  Shield,
  Globe,
  Server,
  Play
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const codeExample = `import { PersonaVerse } from '@personaverse/sdk';

const client = new PersonaVerse({
  apiKey: 'your_api_key'
});

// Create a chat session
const session = await client.chat.create({
  personaId: 'tech-titan',
  model: 'gpt-4'
});

// Send a message
const response = await session.send({
  message: 'What advice would you give to a first-time founder?'
});

console.log(response.text);`;

const features = [
  {
    icon: Zap,
    title: "RESTful API",
    description: "Simple, intuitive REST API with comprehensive endpoints for all features.",
  },
  {
    icon: Globe,
    title: "SDKs Available",
    description: "Official SDKs for JavaScript, Python, Ruby, Go, and more.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption and audit logs.",
  },
  {
    icon: Server,
    title: "99.9% Uptime",
    description: "Reliable infrastructure with automatic failover and load balancing.",
  },
];

const endpoints = [
  { method: "GET", path: "/v1/personas", description: "List all available personas" },
  { method: "POST", path: "/v1/chat", description: "Create a new chat session" },
  { method: "POST", path: "/v1/chat/{id}/message", description: "Send a message" },
  { method: "GET", path: "/v1/chat/{id}/history", description: "Get chat history" },
  { method: "POST", path: "/v1/personas", description: "Create a custom persona" },
  { method: "GET", path: "/v1/models", description: "List available AI models" },
];

const pricingTiers = [
  { name: "Free", calls: "100/month", price: "$0" },
  { name: "Pro", calls: "1,000/month", price: "$15/mo" },
  { name: "Creator", calls: "50,000/month", price: "$99/mo" },
  { name: "Enterprise", calls: "Unlimited", price: "Custom" },
];

export default function DevelopersPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("javascript");

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />
      
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              >
                <Code className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-gray-300">Developer API</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Build with{" "}
                <span className="gradient-text">AI Personalities</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-400 mb-8"
              >
                Integrate AI personas into your apps, websites, and games. 
                Simple API, powerful capabilities, enterprise-grade reliability.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="#docs"
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all"
                >
                  <Book className="w-5 h-5" />
                  Documentation
                </Link>
                
                <Link
                  href="#playground"
                  className="flex items-center gap-2 px-8 py-4 glass rounded-xl font-semibold text-white hover:bg-white/10 transition-all"
                >
                  <Play className="w-5 h-5" />
                  API Playground
                </Link>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              {/* Code Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex gap-2">
                  {["javascript", "python", "curl"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveTab(lang)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        activeTab === lang
                          ? "bg-purple-500/20 text-purple-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={copyCode}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Code Content */}
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 card-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="docs" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              API{" "}
              <span className="gradient-text">Reference</span>
            </h2>
            <p className="text-gray-400">
              Simple, predictable REST API endpoints
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left p-4 text-gray-400 font-medium">Method</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Endpoint</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Description</th>
                    <th className="text-left p-4 text-gray-400 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map((endpoint, index) => (
                    <tr key={index} className="border-b border-white/5 last:border-0">
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          endpoint.method === "GET" ? "bg-green-500/20 text-green-400" :
                          endpoint.method === "POST" ? "bg-blue-500/20 text-blue-400" :
                          "bg-purple-500/20 text-purple-400"
                        }`}>
                          {endpoint.method}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-sm text-white">{endpoint.path}</td>
                      <td className="p-4 text-gray-400">{endpoint.description}</td>
                      <td className="p-4">
                        <Link href="#" className="text-purple-400 hover:text-purple-300 text-sm">
                          View docs →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              API{" "}
              <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-400">
              Generous free tier, scale as you grow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{tier.name}</h3>
                <div className="text-3xl font-bold text-white mb-2">{tier.price}</div>
                <p className="text-sm text-gray-400">{tier.calls}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
