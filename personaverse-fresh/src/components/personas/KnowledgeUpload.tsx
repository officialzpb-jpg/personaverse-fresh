"use client";

import { useState, useRef } from "react";
import { FileText, X, Upload } from "lucide-react";

interface KnowledgeUploadProps {
  files: { name: string; content: string }[];
  onFilesChange: (files: { name: string; content: string }[]) => void;
}

export function KnowledgeUpload({ files, onFilesChange }: KnowledgeUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setUploading(true);

    for (const file of newFiles) {
      if (file.size > 5 * 1024 * 1024) {
        console.error(`File ${file.name} is too large`);
        continue;
      }

      try {
        const content = await readFileContent(file);
        onFilesChange([...files, { name: file.name, content }]);
      } catch (error) {
        console.error(`Error reading ${file.name}:`, error);
      }
    }

    setUploading(false);
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      
      // For text files, read as text
      if (file.type.startsWith("text/") || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
        reader.readAsText(file);
      } else {
        // For other files, read as data URL
        reader.readAsDataURL(file);
      }
    });
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".txt,.md,.pdf,.doc,.docx"
        multiple
        className="hidden"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full p-6 border-2 border-dashed border-white/20 rounded-xl hover:border-purple-500/50 transition-colors flex flex-col items-center gap-2"
      >
        <Upload className="w-8 h-8 text-gray-400" />
        <span className="text-sm text-gray-300">Click to upload files</span>
        <span className="text-xs text-gray-500">TXT, MD, PDF, DOC (max 5MB each)</span>
      </button>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-gray-300 truncate max-w-[200px]">{file.name}</span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-red-500/10 text-red-400 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
