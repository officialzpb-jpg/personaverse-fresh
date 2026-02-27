"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Upload, 
  Mic, 
  Type, 
  Sliders,
  Palette,
  Save,
  Eye,
  Bot
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function CreatePage() {
  const [step, setStep] = useState(1);
  const [personaName, setPersonaName] = useState("");
  const [personaDescription, setPersonaDescription] = useState("");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const traits = [
    "Funny", "Serious", "Sarcastic", "Empathetic", "Analytical",
    "Creative", "Professional", "Casual", "Enthusiastic", "Calm"
  ];

  const toggleTrait = (trait: string) => {
    setSelectedTraits(prev => 
      prev.includes(trait) 
        ? prev.filter(t => t !== trait)
        : [...prev, trait]
    );
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />
      
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">Persona Creator</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Create Your{" "}
              <span className="gradient-text">AI Persona</span>
            </h1>
            
            <p className="text-gray-400">
              Build a unique AI personality with custom traits, voice, and knowledge.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s === step ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" :
                  s < step ? "bg-green-500 text-white" : "bg-white/10 text-gray-400"
                }`}>
                  {s < step ? "✓" : s}
                </div>
                {s < 4 && <div className={`w-16 h-0.5 ${s < step ? "bg-green-500" : "bg-white/10"}`} />}
              </div>
            ))}
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-8"
          >
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Type className="w-5 h-5 text-purple-400" />
                  Basic Information
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Persona Name</label>
                  <input
                    type="text"
                    value={personaName}
                    onChange={(e) => setPersonaName(e.target.value)}
                    placeholder="e.g., Tech Mentor"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={personaDescription}
                    onChange={(e) => setPersonaDescription(e.target.value)}
                    placeholder="What does this persona do? What are they good at?"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">Choose an Avatar</label>
                  <div className="grid grid-cols-6 gap-3">
                    {["🤖", "🧠", "💡", "🚀", "🎯", "⭐", "🔥", "💎", "⚡", "🌟", "💫", "✨"].map((emoji) => (
                      <button
                        key={emoji}
                        className="aspect-square rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-2xl transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-purple-400" />
                  Personality Traits
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">Select traits that describe your persona</label>
                  <div className="flex flex-wrap gap-3">
                    {traits.map((trait) => (
                      <button
                        key={trait}
                        onClick={() => toggleTrait(trait)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedTraits.includes(trait)
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                            : "glass text-gray-300 hover:text-white"
                        }`}
                      >
                        {trait}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Humor Level</label>
                    <input type="range" min="0" max="100" className="w-full accent-purple-500" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Serious</span>
                      <span>Hilarious</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Formality</label>
                    <input type="range" min="0" max="100" className="w-full accent-purple-500" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Casual</span>
                      <span>Professional</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Enthusiasm</label>
                    <input type="range" min="0" max="100" className="w-full accent-purple-500" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Calm</span>
                      <span>Energetic</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-400" />
                  Knowledge & Training
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="p-6 glass rounded-xl hover:bg-white/5 transition-colors text-left">
                    <Upload className="w-8 h-8 text-purple-400 mb-3" />
                    <h3 className="font-semibold text-white mb-1">Upload Documents</h3>
                    <p className="text-sm text-gray-400">PDF, TXT, or DOCX files</p>
                  </button>
                  
                  <button className="p-6 glass rounded-xl hover:bg-white/5 transition-colors text-left">
                    <Mic className="w-8 h-8 text-cyan-400 mb-3" />
                    <h3 className="font-semibold text-white mb-1">Voice Samples</h3>
                    <p className="text-sm text-gray-400">Record or upload audio</p>
                  </button>
                  
                  <button className="p-6 glass rounded-xl hover:bg-white/5 transition-colors text-left">
                    <Type className="w-8 h-8 text-pink-400 mb-3" />
                    <h3 className="font-semibold text-white mb-1">Text Examples</h3>
                    <p className="text-sm text-gray-400">Paste sample conversations</p>
                  </button>
                  
                  <button className="p-6 glass rounded-xl hover:bg-white/5 transition-colors text-left">
                    <Bot className="w-8 h-8 text-green-400 mb-3" />
                    <h3 className="font-semibold text-white mb-1">Start from Template</h3>
                    <p className="text-sm text-gray-400">Use a pre-built base</p>
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">System Prompt</label>
                  <textarea
                    placeholder="You are a helpful assistant who..."
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none font-mono text-sm"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-400" />
                  Review & Publish
                </h2>
                
                <div className="glass rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl">
                      🤖
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{personaName || "Unnamed Persona"}</h3>
                      <p className="text-sm text-gray-400">{personaDescription || "No description provided"}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">Traits</span>
                      <span className="text-white">{selectedTraits.join(", ") || "None selected"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">Visibility</span>
                      <span className="text-white">Public</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">AI Model</span>
                      <span className="text-white">GPT-4</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex-1 py-3 glass rounded-xl font-semibold text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" />
                    Publish Persona
                  </button>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-8 border-t border-white/5">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-6 py-2 glass rounded-lg text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Back
              </button>
              
              <button
                onClick={() => setStep(Math.min(4, step + 1))}
                disabled={step === 4}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {step === 4 ? "Finish" : "Next Step"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
