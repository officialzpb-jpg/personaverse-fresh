"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";

interface AvatarUploadProps {
  value: string;
  imageUrl: string | null;
  onChange: (emoji: string) => void;
  onImageUpload: (imageUrl: string | null) => void;
}

const EMOJIS = ["🤖", "🧠", "💡", "🚀", "🎯", "⭐", "🔥", "💎", "⚡", "🌟", "💫", "✨", "🎭", "🎪", "🎨"];

export function AvatarUpload({ value, imageUrl, onChange, onImageUpload }: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be less than 2MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageUpload(reader.result as string);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    onImageUpload(null);
    onChange("🤖");
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Image Upload Area */}
      <div className="flex items-center gap-4">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-24 h-24 rounded-2xl border-2 border-dashed border-white/20 hover:border-purple-500/50 flex items-center justify-center cursor-pointer transition-colors overflow-hidden"
        >
          {imageUrl ? (
            <img src={imageUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-1" />
              <span className="text-xs text-gray-500">Upload</span>
            </div>
          )}
        </div>

        {imageUrl && (
          <button
            onClick={clearImage}
            className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Emoji Selection */}
      {!imageUrl && (
        <div>
          <p className="text-sm text-gray-400 mb-2">Or choose an emoji:</p>
          <div className="flex flex-wrap gap-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => onChange(emoji)}
                className={`w-10 h-10 rounded-lg text-xl transition-colors ${
                  value === emoji 
                    ? "bg-purple-500/30 border border-purple-500" 
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
