"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Image as ImageIcon, Loader2, Check, RefreshCw, Download, X } from "lucide-react";

interface MeshyCreatorProps {
  onAvatarCreated?: (modelUrl: string, thumbnailUrl: string) => void;
}

export function MeshyCreator({ onAvatarCreated }: MeshyCreatorProps) {
  const [mode, setMode] = useState<"text" | "image">("text");
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [artStyle, setArtStyle] = useState<"realistic" | "cartoon" | "low-poly">("realistic");
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "completed" | "failed">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    modelUrl: string;
    thumbnailUrl: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (mode === "text" && !prompt.trim()) return;
    if (mode === "image" && !imageUrl.trim()) return;

    setLoading(true);
    setError(null);
    setStatus("processing");
    setProgress(0);

    try {
      const response = await fetch("/api/meshy/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          prompt: mode === "text" ? prompt : undefined,
          imageUrl: mode === "image" ? imageUrl : undefined,
          artStyle,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create avatar");
      }

      const data = await response.json();
      setTaskId(data.taskId);
      
      // Start polling for status
      pollStatus(data.taskId);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create avatar");
      setStatus("failed");
      setLoading(false);
    }
  };

  const pollStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/meshy/create?taskId=${id}`);
      const data = await response.json();

      setProgress(data.progress || 0);

      if (data.status === "SUCCEEDED") {
        setStatus("completed");
        setResult({
          modelUrl: data.modelUrl,
          thumbnailUrl: data.thumbnailUrl,
        });
        onAvatarCreated?.(data.modelUrl, data.thumbnailUrl);
        setLoading(false);
      } else if (data.status === "FAILED") {
        setStatus("failed");
        setError("Avatar generation failed");
        setLoading(false);
      } else {
        // Still processing, poll again in 5 seconds
        setTimeout(() => pollStatus(id), 5000);
      }
    } catch (err) {
      setError("Failed to check status");
      setStatus("failed");
      setLoading(false);
    }
  };

  const reset = () => {
    setStatus("idle");
    setTaskId(null);
    setProgress(0);
    setResult(null);
    setError(null);
    setPrompt("");
    setImageUrl("");
  };

  const examplePrompts = [
    "Professional business person, 30s, wearing blazer, confident expression",
    "Tech entrepreneur, casual hoodie, friendly smile, modern style",
    "Fitness trainer, athletic build, energetic pose, sportswear",
    "Life coach, warm smile, approachable, smart casual clothing",
    "Sci-fi writer, creative look, glasses, thoughtful expression",
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Mode Selection */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
              <button
                onClick={() => setMode("text")}
                className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  mode === "text"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Wand2 className="w-4 h-4" />
                Text to 3D
              </button>
              <button
                onClick={() => setMode("image")}
                className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  mode === "image"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Image to 3D
              </button>
            </div>

            {/* Text Input */}
            {mode === "text" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your avatar... (e.g., 'Professional business woman, 30s, wearing blazer')"
                  className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                />

                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Try these examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {examplePrompts.map((example, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(example)}
                        className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 text-gray-300 rounded-full transition-colors"
                      >
                        {example.split(",")[0]}...
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Image Input */}
            {mode === "image" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                />
                <p className="text-sm text-gray-500">Paste a direct image URL (JPG, PNG)</p>
              </motion.div>
            )}

            {/* Art Style */}
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Art Style:</p>
              <div className="flex gap-2">
                {(["realistic", "cartoon", "low-poly"] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setArtStyle(style)}
                    className={`flex-1 py-2 px-3 rounded-lg capitalize text-sm transition-all ${
                      artStyle === style
                        ? "bg-purple-600 text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Create Button */}
            <button
              onClick={handleCreate}
              disabled={loading || (mode === "text" ? !prompt.trim() : !imageUrl.trim())}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate 3D Avatar
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              FREE: 200 credits/month (~20 avatars)
            </p>
          </motion.div>
        )}

        {status === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 space-y-6"
          >
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
              <div 
                className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"
                style={{ animationDuration: "2s" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Generating 3D Avatar</h3>
              <p className="text-gray-400">This takes 2-5 minutes...</p>
              <p className="text-sm text-gray-500 mt-2">Task ID: {taskId}</p>
            </div>

            <div className="w-full max-w-xs mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}

        {status === "completed" && result && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-green-400" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Avatar Ready!</h3>
              <p className="text-gray-400">Your 3D avatar has been generated</p>
            </div>

            {result.thumbnailUrl && (
              <div className="relative w-48 h-48 mx-auto rounded-xl overflow-hidden bg-white/5">
                <img
                  src={result.thumbnailUrl}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 py-3 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Create Another
              </button>
              
              <a
                href={result.modelUrl}
                download
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white hover:from-purple-500 hover:to-blue-500 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download GLB
              </a>
            </div>
          </motion.div>
        )}

        {status === "failed" && (
          <motion.div
            key="failed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 space-y-4"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
              <X className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-400">{error || "Failed to generate avatar"}</p>
            <button
              onClick={reset}
              className="px-6 py-2 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
