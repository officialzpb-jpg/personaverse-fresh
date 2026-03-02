"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ChevronDown, 
  X,
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Zap,
  AlertCircle
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  model?: string;
}

interface Persona {
  id: string;
  name: string;
  avatar: string;
  color: string;
  description: string;
  systemPrompt?: string;
}

const AI_MODELS = [
  { id: "gpt-4", name: "GPT-4", provider: "openai", icon: "🧠", description: "Most capable" },
  { id: "claude-3-sonnet-20240229", name: "Claude 3", provider: "anthropic", icon: "🎯", description: "Thoughtful" },
  { id: "gemini-1.5-flash-latest", name: "Gemini", provider: "google", icon: "✨", description: "Fast" },
];

const DEFAULT_PERSONA: Persona = {
  id: "default",
  name: "AI Assistant",
  avatar: "🤖",
  color: "from-purple-500 to-blue-500",
  description: "Your helpful AI companion",
};

interface ChatInterfaceProps {
  persona?: Persona;
  embedded?: boolean;
  onClose?: () => void;
}

export function ChatInterface({ persona = DEFAULT_PERSONA, embedded = false, onClose }: ChatInterfaceProps) {
  // Persona-specific welcome messages that match their personality
  const getWelcomeMessage = (personaId: string): string => {
    const welcomeMessages: Record<string, string> = {
      "site-assistant": "Hi! I'm your PersonaVerse Assistant 🤖 I can help you explore personas, create your own, or answer questions about the platform. What would you like to do?",
      "viral-vince": "Yo! Viral Vince here 🔥 I've helped creators go from 0 to millions. What's your content goal? Let's make something EXPLODE!",
      "tech-titan": "Tech Titan. Three exits, countless lessons. What are you building? And be honest - is it making money yet?",
      "mindful-maya": "Hello there... take a breath with me. 💫 I'm Mindful Maya. What's weighing on your mind today?",
      "game-guru": "Yo yo! Game Guru here 🎮 Ex-pro, current streamer. What are we grinding on today? Ranked? Content? Let's get it!",
      "dating-doctor": "Hey friend! Dating Doctor here 💝 I've seen it all in the dating world. What's going on in your love life?",
      "code-wizard": "Code Wizard. 15 years of shipping code and fixing disasters. What are you working on? And please tell me it's not another TODO app...",
      default: `Hi! I'm ${persona.name}. ${persona.description}. How can I help you today?`,
    };
    return welcomeMessages[personaId] || welcomeMessages.default;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: getWelcomeMessage(persona.id),
      timestamp: new Date(),
      model: "gpt-4",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callAIAPI = async (userMessage: string): Promise<{ response: string; model: string }> => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          ...messages
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
          { role: "user" as const, content: userMessage },
        ],
        persona: persona.id,
        model: selectedModel.id,
        provider: selectedModel.provider,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to get AI response");
    }

    return response.json();
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    setError(null);
    const userMessageContent = input.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const { response, model } = await callAIAPI(userMessageContent);

      // Simulate typing effect with real response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
        model: model || selectedModel.id,
      };

      setMessages((prev) => [...prev, aiMessage]);

      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < response.length) {
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === "assistant") {
              lastMessage.content = response.slice(0, charIndex + 1);
            }
            return newMessages;
          });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 15);
    } catch (err) {
      setIsTyping(false);
      setError(err instanceof Error ? err.message : "Something went wrong");
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
        model: selectedModel.id,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const regenerateResponse = async () => {
    setError(null);
    const lastUserMessage = messages[messages.length - 2];
    if (!lastUserMessage || lastUserMessage.role !== "user") return;

    // Remove last assistant message
    setMessages((prev) => prev.slice(0, -1));
    setIsTyping(true);

    try {
      const { response, model } = await callAIAPI(lastUserMessage.content);

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
        model: model || selectedModel.id,
      };

      setMessages((prev) => [...prev, aiMessage]);

      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < response.length) {
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === "assistant") {
              lastMessage.content = response.slice(0, charIndex + 1);
            }
            return newMessages;
          });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 15);
    } catch (err) {
      setIsTyping(false);
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className={`flex flex-col ${embedded ? "h-full" : "h-screen bg-[#0a0a0a]"}`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${persona.color} flex items-center justify-center text-xl`}>
            {persona.avatar}
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{persona.name}</div>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Online
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Model Selector */}
          <div className="relative">
            <button
              onClick={() => setShowModelSelector(!showModelSelector)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 transition-colors"
            >
              <span>{selectedModel.icon}</span>
              <span>{selectedModel.name}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showModelSelector ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showModelSelector && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl overflow-hidden z-50"
                >
                  {AI_MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model);
                        setShowModelSelector(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${
                        selectedModel.id === model.id ? "bg-white/5" : ""
                      }`}
                    >
                      <span className="text-lg">{model.icon}</span>
                      <div>
                        <div className="text-sm text-white">{model.name}</div>
                        <div className="text-xs text-gray-500">{model.description}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-sm text-red-400">{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-xs text-red-400 hover:text-red-300"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              message.role === "user"
                ? "bg-white/10"
                : `bg-gradient-to-br ${persona.color}`
            }`}>
              {message.role === "user" ? (
                <User className="w-4 h-4 text-gray-400" />
              ) : (
                <span className="text-sm">{persona.avatar}</span>
              )}
            </div>

            {/* Message Content */}
            <div className={`max-w-[80%] ${message.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-sm"
                    : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                {message.role === "assistant" && isTyping && index === messages.length - 1 && (
                  <span className="inline-block w-1.5 h-4 ml-0.5 bg-purple-400 animate-pulse" />
                )}
              </div>

              {/* Message Actions */}
              {message.role === "assistant" && message.content && (
                <div className="flex items-center gap-1 mt-1 opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copyMessage(message.content)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    title="Copy"
                  >
                    <Copy className="w-3 h-3 text-gray-500" />
                  </button>
                  <button
                    onClick={regenerateResponse}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    title="Regenerate"
                  >
                    <RotateCcw className="w-3 h-3 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Helpful">
                    <ThumbsUp className="w-3 h-3 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Not helpful">
                    <ThumbsDown className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
              )}

              {/* Model Badge */}
              {message.model && (
                <div className="text-xs text-gray-600 mt-1">
                  {AI_MODELS.find(m => m.id === message.model)?.name || message.model}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && messages[messages.length - 1]?.role === "user" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${persona.color} flex items-center justify-center`}>
              <span className="text-sm">{persona.avatar}</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl p-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${persona.name}...`}
              rows={1}
              disabled={isTyping}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none min-h-[48px] max-h-[200px] disabled:opacity-50"
              style={{ height: "auto" }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-14 bottom-2 p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-500 hover:to-blue-500 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
            <button
              className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              title="Quick actions"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Powered by {selectedModel.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Default persona for the floating chat widget - Site Assistant
const WIDGET_PERSONA: Persona = {
  id: "site-assistant",
  name: "PersonaVerse Assistant",
  avatar: "🤖",
  color: "from-purple-500 to-blue-500",
  description: "Your guide to PersonaVerse",
};

// Floating Chat Widget for embedding on any page
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setUnreadCount(0);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg shadow-purple-500/25 flex items-center justify-center group"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <Bot className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[600px] glass-card rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10"
          >
            <ChatInterface persona={WIDGET_PERSONA} embedded onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
