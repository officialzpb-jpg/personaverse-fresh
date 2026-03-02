"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Type, 
  Sliders,
  Palette,
  Save,
  Eye,
  Volume2,
  Loader2,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AvatarUpload } from "@/components/personas/AvatarUpload";
import { KnowledgeUpload } from "@/components/personas/KnowledgeUpload";

const VOICES = [
  { id: "alloy", name: "Alloy", description: "Neutral, balanced" },
  { id: "echo", name: "Echo", description: "Warm, approachable" },
  { id: "fable", name: "Fable", description: "British accent, refined" },
  { id: "onyx", name: "Onyx", description: "Deep, authoritative" },
  { id: "nova", name: "Nova", description: "Energetic, friendly" },
  { id: "shimmer", name: "Shimmer", description: "Clear, optimistic" },
];

const TRAITS = [
  "Funny", "Serious", "Sarcastic", "Empathetic", "Analytical",
  "Creative", "Professional", "Casual", "Enthusiastic", "Calm",
  "Direct", "Nurturing", "Witty", "Optimistic", "Realistic"
];

export default function CreatePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    avatar: "🤖",
    avatarImage: null as string | null,
    traits: [] as string[],
    humorLevel: 50,
    formality: 50,
    enthusiasm: 50,
    voice: "alloy",
    systemPrompt: "",
    knowledgeFiles: [] as { name: string; content: string }[],
    isPublic: true,
  });

  const toggleTrait = (trait: string) => {
    setFormData(prev => ({
      ...prev,
      traits: prev.traits.includes(trait)
        ? prev.traits.filter(t => t !== trait)
        : [...prev.traits, trait]
    }));
  };

  const generateSystemPrompt = () => {
    const traits = formData.traits.join(", ");
    const tone = formData.formality > 50 ? "professional" : "casual";
    const humor = formData.humorLevel > 50 ? "with a sense of humor" : "serious";
    const energy = formData.enthusiasm > 50 ? "enthusiastic" : "calm";
    
    let prompt = `You are ${formData.name}. ${formData.description}.`;
    
    if (traits) {
      prompt += ` You are ${traits}.`;
    }
    
    prompt += ` You speak in a ${tone}, ${humor}, and ${energy} manner.`;
    prompt += ` You are helpful, engaging, and authentic in your responses.`;
    
    if (formData.knowledgeFiles.length > 0) {
      prompt += ` You have been trained on: ${formData.knowledgeFiles.map(f => f.name).join(", ")}.`;
    }
    
    return prompt;
  };

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      setError("Please sign in to create a persona");
      return;
    }

    if (!formData.name || !formData.description) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/personas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          avatar: formData.avatarImage || formData.avatar,
          systemPrompt: formData.systemPrompt || generateSystemPrompt(),
          isPublic: formData.isPublic,
          voice: formData.voice,
          traits: formData.traits,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create persona");
      }

      router.push("/personas");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name && formData.description;
      case 2:
        return formData.traits.length > 0;
      default:
        return true;
    }
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

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-8"
          >
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Type className="w-5 h-5 text-purple-400" />
                  Basic Information
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Persona Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Tech Mentor"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="What does this persona do? What are they good at?"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Avatar
                  </label>
                  <AvatarUpload
                    value={formData.avatar}
                    imageUrl={formData.avatarImage}
                    onChange={(emoji) => setFormData(prev => ({ ...prev, avatar: emoji }))}
                    onImageUpload={(url) => setFormData(prev => ({ ...prev, avatarImage: url }))}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Personality */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-purple-400" />
                  Personality Traits
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Select traits (choose at least one)
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {TRAITS.map((trait) => (
                      <button
                        key={trait}
                        onClick={() => toggleTrait(trait)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.traits.includes(trait)
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Humor Level: {formData.humorLevel}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.humorLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, humorLevel: parseInt(e.target.value) }))}
                      className="w-full accent-purple-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Serious</span>
                      <span>Hilarious</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Formality: {formData.formality}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.formality}
                      onChange={(e) => setFormData(prev => ({ ...prev, formality: parseInt(e.target.value) }))}
                      className="w-full accent-purple-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Casual</span>
                      <span>Professional</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Enthusiasm: {formData.enthusiasm}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.enthusiasm}
                      onChange={(e) => setFormData(prev => ({ ...prev, enthusiasm: parseInt(e.target.value) }))}
                      className="w-full accent-purple-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Calm</span>
                      <span>Energetic</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Voice & Knowledge */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-purple-400" />
                  Voice & Knowledge
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Select Voice
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {VOICES.map((voice) => (
                      <button
                        key={voice.id}
                        onClick={() => setFormData(prev => ({ ...prev, voice: voice.id }))}
                        className={`p-4 rounded-xl text-left transition-all ${
                          formData.voice === voice.id
                            ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500"
                            : "glass hover:bg-white/5"
                        }`}
                      >
                        <div className="font-medium text-white">{voice.name}</div>
                        <div className="text-sm text-gray-400">{voice.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Knowledge Base (Optional)
                  </label>
                  <KnowledgeUpload
                    files={formData.knowledgeFiles}
                    onFilesChange={(files) => setFormData(prev => ({ ...prev, knowledgeFiles: files }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    System Prompt (Auto-generated or custom)
                  </label>
                  <textarea
                    value={formData.systemPrompt || generateSystemPrompt()}
                    onChange={(e) => setFormData(prev => ({ ...prev, systemPrompt: e.target.value }))}
                    placeholder="You are a helpful assistant who..."
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none font-mono text-sm"
                  />
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, systemPrompt: generateSystemPrompt() }))}
                    className="mt-2 text-sm text-purple-400 hover:text-purple-300"
                  >
                    Regenerate from traits
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-400" />
                  Review & Publish
                </h2>
                
                <div className="glass rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl overflow-hidden">
                      {formData.avatarImage ? (
                        <img src={formData.avatarImage} alt="" className="w-full h-full object-cover" />
                      ) : (
                        formData.avatar
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{formData.name || "Unnamed Persona"}</h3>
                      <p className="text-sm text-gray-400">{formData.description || "No description"}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">Traits</span>
                      <span className="text-white">{formData.traits.join(", ") || "None"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">Voice</span>
                      <span className="text-white">{VOICES.find(v => v.id === formData.voice)?.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">Knowledge Files</span>
                      <span className="text-white">{formData.knowledgeFiles.length} files</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">Visibility</span>
                      <span className="text-white">{formData.isPublic ? "Public" : "Private"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex-1 py-3 glass rounded-xl font-semibold text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Publish Persona
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-8 border-t border-white/5">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-6 py-2 glass rounded-lg text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              
              {step < 4 && (
                <button
                  onClick={() => setStep(Math.min(4, step + 1))}
                  disabled={!canProceed()}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
