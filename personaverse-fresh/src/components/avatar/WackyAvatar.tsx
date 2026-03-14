"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Bot, Send } from "lucide-react";
import { Avatar3D } from "./Avatar3D";

interface WackyAvatarProps {
  avatarUrl?: string;
}

const wackyQuotes = [
  "Hey! I'm running around!",
  "Catch me if you can!",
  "Wheeeee!",
  "I'm an AI on the loose!",
  "Zoom zoom!",
  "Hello there!",
  "*confused AI noises*",
  "I'm learning to walk!",
  "Beep boop!",
  "Where am I going?",
];

const idleQuotes = [
  "Just chillin'...",
  "Taking a break!",
  "Watching you work...",
  "*yawns*",
  "Waiting for something fun!",
];

export function WackyAvatar({ avatarUrl }: WackyAvatarProps) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [target, setTarget] = useState({ x: 100, y: 100 });
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [quote, setQuote] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mood, setMood] = useState<"running" | "idle" | "dancing">("idle");
  const [messages, setMessages] = useState<{role: "user" | "ai", text: string}[]>([]);
  const [inputText, setInputText] = useState("");

  const moveToRandomPosition = useCallback(() => {
    if (typeof window === "undefined") return;
    
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 300;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setTarget({ x: newX, y: newY });
    setDirection(newX > position.x ? 1 : -1);
    setIsMoving(true);
    setMood("running");
    
    if (Math.random() > 0.7) {
      setQuote(wackyQuotes[Math.floor(Math.random() * wackyQuotes.length)]);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  }, [position.x]);

  useEffect(() => {
    if (showChat) return;
    
    const behaviorLoop = setInterval(() => {
      const rand = Math.random();
      
      if (rand < 0.6) {
        moveToRandomPosition();
      } else if (rand < 0.8) {
        setMood("dancing");
        setIsMoving(false);
      } else {
        setMood("idle");
        setIsMoving(false);
        setQuote(idleQuotes[Math.floor(Math.random() * idleQuotes.length)]);
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 2000);
      }
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(behaviorLoop);
  }, [moveToRandomPosition, showChat]);

  useEffect(() => {
    if (!isMoving) return;
    
    const speed = 3;
    const interval = setInterval(() => {
      setPosition(prev => {
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < speed) {
          setIsMoving(false);
          setMood("idle");
          return target;
        }
        
        const moveX = (dx / distance) * speed;
        const moveY = (dy / distance) * speed;
        
        return {
          x: prev.x + moveX,
          y: prev.y + moveY
        };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isMoving, target]);

  const handleChat = async () => {
    if (!inputText.trim()) return;
    
    const userMsg = inputText;
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInputText("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: "I'm a wacky AI avatar! I love running around and being silly! What would you like to know?" 
      }]);
    }, 1000);
  };

  return (
    <>
      <motion.div
        className="fixed z-40 cursor-pointer"
        style={{
          left: position.x,
          top: position.y,
          width: 150,
          height: 200,
        }}
        onClick={() => setShowChat(true)}
        whileHover={{ scale: 1.1 }}
      >
        <AnimatePresence>
          {isSpeaking && quote && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap shadow-lg z-50"
            >
              {quote}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full h-full" style={{ transform: `scaleX(${direction})` }}>
          <Avatar3D 
            avatarUrl={avatarUrl}
            isSpeaking={isSpeaking}
          />
        </div>

        <motion.div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl"
          animate={{ 
            rotate: mood === "dancing" ? [0, -20, 20, 0] : 0,
            scale: mood === "running" ? [1, 1.2, 1] : 1
          }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        >
          {mood === "running" && "🏃"}
          {mood === "dancing" && "💃"}
          {mood === "idle" && "😊"}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed z-50 glass-card rounded-2xl p-4 w-80"
            style={{
              left: Math.min(position.x + 160, window.innerWidth - 340),
              top: Math.min(position.y, window.innerHeight - 400)
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-white">Wacky AI</span>
              </div>
              <button 
                onClick={() => setShowChat(false)}
                className="p-1 hover:bg-white/10 rounded"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="h-48 overflow-y-auto space-y-2 mb-3 bg-black/20 rounded-lg p-2">
              {messages.length === 0 && (
                <p className="text-gray-400 text-sm text-center">Click to chat with me!</p>
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
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleChat()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 bg-white/5 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                onClick={handleChat}
                className="p-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
