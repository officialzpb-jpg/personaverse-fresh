"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, Check, AlertCircle } from "lucide-react";

interface AvatarUploadProps {
  personaId: string;
  personaName: string;
  onUploadComplete?: (url: string) => void;
}

export function AvatarUpload({ personaId, personaName, onUploadComplete }: AvatarUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.glb') && !file.name.endsWith('.gltf')) {
      setError("Only GLB/GLTF files are supported");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("File size must be under 50MB");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('personaId', personaId);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockUrl = `/avatars/${personaId}-${Date.now()}.glb`;
      
      setUploaded(true);
      onUploadComplete?.(mockUrl);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Upload 3D Avatar</h3>
        <p className="text-sm text-gray-400">For: {personaName}</p>
      </div>

      {!uploaded ? (
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-purple-500 bg-purple-500/10"
              : "border-white/20 hover:border-white/40 hover:bg-white/5"
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".glb,.gltf"
            onChange={handleFileSelect}
            className="hidden"
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-white">Uploading avatar...</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Upload className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-white font-medium mb-2">Drop your CC4 avatar here</p>
              <p className="text-sm text-gray-400">or click to browse</p>
              <p className="text-xs text-gray-500 mt-2">Supports: .glb, .gltf (max 50MB)</p>
            </>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
        >
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex-1">
            <p className="text-white font-medium">Avatar uploaded successfully!</p>
            <p className="text-sm text-gray-400">Your CC4 avatar is now live</p>
          </div>
          <button
            onClick={() => setUploaded(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl mt-4"
        >
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-red-400">{error}</p>
        </motion.div>
      )}

      <div className="mt-6 p-4 bg-white/5 rounded-xl">
        <h4 className="text-sm font-medium text-white mb-2">Export Instructions (CC4):</h4>
        <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
          <li>Create your avatar in Character Creator 4</li>
          <li>Go to File - Export - GLB</li>
          <li>Enable Embed Textures</li>
          <li>Use InstaLOD to reduce polygons (target: 30k-50k)</li>
          <li>Export and upload here</li>
        </ol>
      </div>
    </div>
  );
}
