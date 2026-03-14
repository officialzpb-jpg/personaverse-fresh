"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, Loader2, Check, X, User } from "lucide-react";

interface AvaturnCreatorProps {
  onAvatarCreated?: (avatarId: string, avatarUrl: string) => void;
}

export function AvaturnCreator({ onAvatarCreated }: AvaturnCreatorProps) {
  const [step, setStep] = useState<"upload" | "processing" | "preview">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [gender, setGender] = useState<"auto" | "male" | "female">("auto");
  const [avatarData, setAvatarData] = useState<{
    avatarId: string;
    avatarUrl: string;
    previewUrl: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Image must be under 10MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateAvatar = async () => {
    if (!selectedImage) return;

    setStep("processing");
    setError(null);

    try {
      // Convert base64 to file
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const file = new File([blob], "avatar-photo.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("image", file);
      formData.append("gender", gender);

      const apiResponse = await fetch("/api/avaturn/create", {
        method: "POST",
        body: formData,
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.error || "Failed to create avatar");
      }

      const data = await apiResponse.json();
      
      setAvatarData({
        avatarId: data.avatarId,
        avatarUrl: data.avatarUrl,
        previewUrl: data.previewUrl,
      });
      
      setStep("preview");
      onAvatarCreated?.(data.avatarId, data.avatarUrl);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create avatar");
      setStep("upload");
    }
  };

  const reset = () => {
    setStep("upload");
    setSelectedImage(null);
    setAvatarData(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {step === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Create Your 3D Avatar</h3>
              <p className="text-gray-400">Upload a photo to generate a 3D avatar</p>
            </div>

            {/* Image Upload */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                selectedImage
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/20 hover:border-white/40 hover:bg-white/5"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />

              {selectedImage ? (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-32 h-32 mx-auto rounded-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(null);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-purple-400" />
                  </div>
                  <p className="text-white font-medium">Click to upload photo</p>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG (max 10MB)</p>
                </>
              )}
            </div>

            {/* Gender Selection */}
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <p className="text-sm text-gray-400">Select gender (optional):</p>
                <div className="flex gap-2">
                  {(["auto", "male", "female"] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2 px-4 rounded-lg capitalize transition-all ${
                        gender === g
                          ? "bg-purple-600 text-white"
                          : "bg-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Create Button */}
            {selectedImage && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleCreateAvatar}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all"
              >
                Create 3D Avatar
              </motion.button>
            )}
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <Loader2 className="absolute inset-0 m-auto w-8 h-8 text-purple-400 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Creating Your Avatar</h3>
            <p className="text-gray-400">This may take 30-60 seconds...</p>
          </motion.div>
        )}

        {step === "preview" && avatarData && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-12 h-12 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Avatar Created!</h3>
              <p className="text-gray-400">Your 3D avatar is ready to use</p>
            </div>

            {avatarData.previewUrl && (
              <div className="relative w-48 h-48 mx-auto">
                <img
                  src={avatarData.previewUrl}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}

            <div className="p-4 bg-white/5 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Avatar ID:</p>
              <p className="text-white font-mono text-sm break-all">{avatarData.avatarId}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 py-3 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-colors"
              >
                Create Another
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
