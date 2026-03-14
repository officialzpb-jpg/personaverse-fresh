"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle, Sparkles, Palette, Sofa, Save, RotateCcw } from "lucide-react";

// Unity WebGL Instance type
declare global {
  interface Window {
    unityInstance?: any;
    createUnityInstance?: (canvas: HTMLCanvasElement, config: any, onProgress: (progress: number) => void) => Promise<any>;
  }
}

interface UnityAvatarHubProps {
  avatarUrl?: string;
}

export default function UnityAvatarHub({ avatarUrl }: UnityAvatarHubProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "avatar"; text: string }[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState("Modern");

  // Themes
  const themes = [
    { id: "Modern", name: "Modern", color: "bg-gray-200" },
    { id: "Cozy", name: "Cozy", color: "bg-amber-200" },
    { id: "Cyberpunk", name: "Cyberpunk", color: "bg-purple-900" },
    { id: "Nature", name: "Nature", color: "bg-green-200" },
    { id: "Minimal", name: "Minimal", color: "bg-white" },
  ];

  // Furniture items
  const furniture = [
    { id: "sofa", name: "Sofa", icon: Sofa },
    { id: "lamp", name: "Lamp", icon: Sparkles },
    { id: "plant", name: "Plant", icon: Palette },
    { id: "table", name: "Table", icon: Sofa },
  ];

  // Initialize Unity WebGL
  useEffect(() => {
    if (!canvasRef.current || typeof window === "undefined") return;

    const loadUnity = async () => {
      try {
        // Load Unity loader script
        const script = document.createElement("script");
        script.src = "/unity/Build/UnityLoader.js";
        script.async = true;
        
        script.onload = async () => {
          if (window.createUnityInstance && canvasRef.current) {
            const instance = await window.createUnityInstance(
              canvasRef.current,
              {
                dataUrl: "/unity/Build/AvatarHub.data.unityweb",
                frameworkUrl: "/unity/Build/AvatarHub.framework.js.unityweb",
                codeUrl: "/unity/Build/AvatarHub.wasm.unityweb",
                streamingAssetsUrl: "/unity/StreamingAssets",
                companyName: "Personaverse",
                productName: "Avatar Hub",
                productVersion: "1.0",
              },
              (progress: number) => {
                setLoadingProgress(Math.round(progress * 100));
              }
            );
            
            window.unityInstance = instance;
            setIsLoading(false);
            setIsReady(true);
          }
        };
        
        document.body.appendChild(script);
      } catch (error) {
        console.error("Failed to load Unity:", error);
        setIsLoading(false);
      }
    };

    loadUnity();

    return () => {
      if (window.unityInstance) {
        window.unityInstance.Quit();
      }
    };
  }, []);

  // JavaScript bridge functions
  useEffect(() => {
    // Expose functions to Unity
    (window as any).showAvatarSpeech = (text: string) => {
      setSpeechBubble(text);
      setTimeout(() => setSpeechBubble(null), 3000);
    };

    (window as any).onAvatarClicked = () => {
      setShowChat(true);
    };

    (window as any).onRoomThemeChanged = (theme: string) => {
      setCurrentTheme(theme);
    };

    (window as any).onFurnitureAdded = (furnitureId: string) => {
      console.log("Furniture added:", furnitureId);
    };

    (window as any).onUnityReady = () => {
      console.log("Unity is ready!");
    };

    (window as any).onLoadingProgress = (progress: number) => {
      setLoadingProgress(Math.round(progress * 100));
    };
  }, []);

  // Send message to Unity
  const sendToUnity = useCallback((methodName: string, value?: string) => {
    if (window.unityInstance) {
      if (value) {
        window.unityInstance.SendMessage("WebGLBridge", methodName, value);
      } else {
        window.unityInstance.SendMessage("WebGLBridge", methodName);
      }
    }
  }, []);

  // Handle chat
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInputText("");
    setIsTyping(true);

    // Send to Unity
    sendToUnity("ReceiveChatMessage", userMessage);

    // Get AI response
    try {
      const response = await fetch("/api/avatar/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          personality: "wacky",
          conversationHistory: messages,
        }),
      });

      const data = await response.json();
      
      setMessages((prev) => [...prev, { role: "avatar", text: data.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "avatar", text: "Oops! My circuits got fuzzy! Try again? 🤖" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Change theme
  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    sendToUnity("ChangeTheme", themeId);
  };

  // Add furniture
  const handleAddFurniture = (furnitureId: string) => {
    sendToUnity("AddFurniture", furnitureId);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Unity Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ outline: "none" }}
      />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50"
          >
            <Sparkles className="w-16 h-16 text-purple-400 mb-6 animate-pulse" />
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-white text-lg">
              Loading Avatar Hub... {loadingProgress}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speech Bubble */}
      <AnimatePresence>
        {speechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-xl text-sm font-medium shadow-lg z-40"
          >
            {speechBubble}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      {isReady && (
        <>
          {/* Top Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-3 rounded-xl transition-all ${
                  showChat ? "bg-purple-600 text-white" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setShowCustomize(!showCustomize)}
                className={`p-3 rounded-xl transition-all ${
                  showCustomize ? "bg-purple-600 text-white" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <Palette className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => sendToUnity("SaveRoomData")}
                className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
              >
                <Save className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => sendToUnity("ToggleEditMode")}
                className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Panel */}
          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute top-20 left-4 w-80 glass-card rounded-2xl p-4 z-30"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-white">Chat with Avatar</span>
                  <button onClick={() => setShowChat(false)}>
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                <div className="h-64 overflow-y-auto space-y-2 mb-3 bg-black/20 rounded-lg p-2">
                  {messages.length === 0 && (
                    <p className="text-gray-400 text-sm text-center">Say hello to your avatar! 👋</p>
                  )}
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg text-sm ${
                        msg.role === "user"
                          ? "bg-purple-600 text-white ml-8"
                          : "bg-white/10 text-gray-200 mr-8"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-1 p-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-white/5 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isTyping}
                    className="p-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Customize Panel */}
          <AnimatePresence>
            {showCustomize && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-20 right-4 w-80 glass-card rounded-2xl p-4 z-30"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-white">Customize Room</span>
                  <button onClick={() => setShowCustomize(false)}>
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Themes */}
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Theme</p>
                  <div className="grid grid-cols-2 gap-2">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeChange(theme.id)}
                        className={`p-2 rounded-lg text-sm transition-all ${
                          currentTheme === theme.id
                            ? "bg-purple-600 text-white"
                            : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        {theme.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Furniture */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">Add Furniture</p>
                  <div className="grid grid-cols-2 gap-2">
                    {furniture.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleAddFurniture(item.id)}
                          className="flex items-center gap-2 p-2 bg-white/5 rounded-lg text-gray-300 hover:bg-white/10 transition-all"
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
