"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bot, Sparkles, Plus } from "lucide-react";
import { Avatar3D } from "@/components/avatar";
import { MeshyCreator } from "@/components/avatar/MeshyCreator";

const sampleAvatars = [
  {
    id: "procedural",
    name: "AI Assistant",
    description: "Built-in procedural avatar",
    url: "",
    type: "procedural",
  },
  {
    id: "meshy-1",
    name: "My Meshy Avatar",
    description: "Your custom AI-generated avatar",
    url: "/avatars/meshy-avatar.glb",
    type: "meshy",
  },
];

export default function AvatarsPage() {
  const [selectedAvatar, setSelectedAvatar] = useState(sampleAvatars[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showCreator, setShowCreator] = useState(false);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="gradient-text">3D Avatar Studio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Create, customize, and chat with AI-powered 3D avatars
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Avatar List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" />
                Your Avatars
              </h2>

              <div className="space-y-3">
                {sampleAvatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedAvatar.id === avatar.id
                        ? "bg-purple-500/20 border border-purple-500/50"
                        : "bg-white/5 hover:bg-white/10 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        {avatar.type === "procedural" ? (
                          <Bot className="w-5 h-5 text-white" />
                        ) : (
                          <Sparkles className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{avatar.name}</p>
                        <p className="text-sm text-gray-400">{avatar.description}</p>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Add New Button */}
                <button
                  onClick={() => setShowCreator(!showCreator)}
                  className="w-full p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2 text-gray-400 hover:text-white"
                >
                  <Plus className="w-5 h-5" />
                  Create New Avatar
                </button>
              </div>
            </div>

            {/* Avatar Creator */}
            {showCreator && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-card rounded-2xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Create Avatar</h2>
                <MeshyCreator 
                  onAvatarCreated={(modelUrl, thumbnailUrl) => {
                    console.log("Avatar created:", modelUrl);
                    setShowCreator(false);
                  }}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Avatar Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{selectedAvatar.name}</h2>
                    <p className="text-gray-400">{selectedAvatar.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsSpeaking(!isSpeaking)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        isSpeaking
                          ? "bg-green-500/20 text-green-400"
                          : "bg-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {isSpeaking ? "Speaking..." : "Test Speak"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-[500px] bg-gradient-to-b from-purple-900/10 to-transparent">
                <Avatar3D 
                  avatarUrl={selectedAvatar.url || undefined}
                  isSpeaking={isSpeaking}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
