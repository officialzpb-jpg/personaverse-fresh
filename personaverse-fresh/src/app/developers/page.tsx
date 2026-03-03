"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  Key, 
  Book, 
  Terminal,
  Copy,
  Check
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const CODE_EXAMPLE = `curl -X POST https://www.personaverse.space/api/v1/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Hello, how are you?",
    "personaId": "viral-vince",
    "history": []
  }'`;

const RESPONSE_EXAMPLE = `{
  "response": "Hey! I'm doing great, thanks for asking! Ready to make some content go viral? 🔥",
  "personaId": "viral-vince",
  "timestamp": "2026-03-03T10:30:00.000Z"
}`;

export default function DevelopersPage() {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(CODE_EXAMPLE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Code className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">Developer API</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Build with{" "}
              <span className="gradient-text">PersonaVerse</span>
            </h1>
            
            <p className="text-lg text-gray-400">
              Integrate AI personas into your applications with our simple REST API.
            </p>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <FeatureCard
              icon={Key}
              title="API Keys"
              description="Generate secure API keys to access our services"
            />
            <FeatureCard
              icon={Terminal}
              title="REST API"
              description="Simple HTTP endpoints for easy integration"
            />
            <FeatureCard
              icon={Book}
              title="Documentation"
              description="Comprehensive guides and examples"
            />
          </div>

          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. Get Your API Key</h3>
                <p className="text-gray-400">
                  Upgrade to Pro or Creator plan to generate API keys from your dashboard.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. Make Your First Request</h3>
                <div className="relative">
                  <pre className="bg-black/50 rounded-xl p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">{CODE_EXAMPLE}</code>
                  </pre>
                  <button
                    onClick={copyCode}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3. Response Format</h3>
                <pre className="bg-black/50 rounded-xl p-4 overflow-x-auto">
                  <code className="text-sm text-gray-300">{RESPONSE_EXAMPLE}</code>
                </pre>
              </div>
            </div>
          </motion.div>

          {/* API Endpoints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">API Endpoints</h2>
            
            <div className="space-y-4">
              <Endpoint
                method="POST"
                path="/api/v1/chat"
                description="Chat with any AI persona"
              />
              <Endpoint
                method="GET"
                path="/api/v1/personas"
                description="List available personas"
              />
              <Endpoint
                method="GET"
                path="/api/v1/personas/:id"
                description="Get persona details"
              />
            </div>
            
            <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-sm text-purple-300">
                <strong>Rate Limits:</strong> Pro plan: 100 requests/hour, Creator plan: 1000 requests/hour
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 text-center"
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </motion.div>
  );
}

function Endpoint({ method, path, description }: { method: string; path: string; description: string }) {
  const methodColors: Record<string, string> = {
    GET: "text-green-400",
    POST: "text-blue-400",
    PUT: "text-yellow-400",
    DELETE: "text-red-400",
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
      <span className={`font-mono font-semibold ${methodColors[method] || "text-gray-400"}`}>
        {method}
      </span>
      <code className="flex-1 text-gray-300">{path}</code>
      <span className="text-sm text-gray-400">{description}</span>
    </div>
  );
}
