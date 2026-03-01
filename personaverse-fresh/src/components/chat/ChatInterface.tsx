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
  Zap
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
  { id: "gpt-4", name: "GPT-4", icon: "🧠", description: "Most capable" },
  { id: "claude-3", name: "Claude 3", icon: "🎯", description: "Thoughtful" },
  { id: "gemini", name: "Gemini", icon: "✨", description: "Multimodal" },
  { id: "fusion", name: "Fusion Mode", icon: "🔥", description: "Ensemble" },
];

const DEFAULT_PERSONA: Persona = {
  id: "default",
  name: "AI Assistant",
  avatar: "🤖",
  color: "from-purple-500 to-blue-500",
  description: "Your helpful AI companion",
};

// Simulated AI responses based on persona
const getSimulatedResponse = (persona: Persona, userMessage: string): string => {
  const responses: Record<string, string[]> = {
    "viral-vince": [
      "That content idea has potential, but here's how to make it EXPLODE: hook them in the first 3 seconds with a pattern interrupt. People scroll fast — you need to stop the thumb!",
      "Algorithm tip: post when your audience is commuting or on lunch breaks. 7-9 AM and 12-2 PM are gold mines for engagement.",
      "Your thumbnail game needs work. Bright colors, high contrast, and a face showing emotion. Shock, curiosity, or controversy — pick one.",
    ],
    "tech-titan": [
      "From a startup perspective, you're thinking too small. What's the 10x improvement? If it's not 10x better, incumbents will crush you.",
      "Fundraising is a means to an end, not the goal. Focus on traction first. Revenue talks, projections walk.",
      "Hire for slope, not y-intercept. You want people who learn fast, not just people who know a lot.",
    ],
    "mindful-maya": [
      "Take a deep breath with me. In for 4 counts, hold for 4, out for 4. Your nervous system needs this reset.",
      "Productivity isn't about doing more — it's about doing what matters. What's the ONE thing that would make today a win?",
      "That inner critic? Thank it for trying to protect you, then gently set it aside. You are enough, exactly as you are.",
    ],
    "game-guru": [
      "Your aim mechanics need work. Lower your sensitivity, focus on crosshair placement at head level. Pre-aim angles before peeking.",
      "Streaming is 20% gameplay, 80% entertainment. Talk constantly, even if nobody's watching. The VODs matter too.",
      "Community first, content second. Reply to every comment when you're small. Those early fans become your army.",
    ],
    "dating-doctor": [
      "Your text game is too eager. Match their energy level. If they reply in 2 hours, you reply in 2 hours. Scarcity creates value.",
      "First date location matters. Coffee or drinks — low investment, easy exit. Save dinner for date 3+ when you know there's chemistry.",
      "Confidence isn't about being perfect, it's about being comfortable with imperfection. Own your quirks.",
    ],
    "code-wizard": [
      "That architecture will bite you at scale. Consider event-driven instead of synchronous. Queue the heavy work.",
      " premature optimization is the root of all evil, BUT... database queries in loops? That's just negligence.",
      "Type safety isn't optional for production code. The time you 'save' skipping it, you'll spend debugging at 2 AM.",
    ],
    default: [
      "That's an interesting question! Let me think through this carefully...",
      "I appreciate you sharing that. Here's my perspective on the matter...",
      "Great point! I'd add that there are multiple angles to consider here...",
      "From what I understand, you're asking about something quite nuanced...",
      "I can definitely help with that. Let me break it down step by step...",
    ],
  };

  const personaResponses = responses[persona.id] || responses.default;
  return personaResponses[Math.floor(Math.random() * personaResponses.length)];
};

interface ChatInterfaceProps {
  persona?: Persona;
  embedded?: boolean;
  onClose?: () => void;
}

export function ChatInterface({ persona = DEFAULT_PERSONA, embedded = false, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi! I'm ${persona.name}. ${persona.description}. How can I help you today?`,
      timestamp: new Date(),
      model: "gpt-4",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseContent = getSimulatedResponse(persona, userMessage.content);
      
      // Simulate typing effect
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
        model: selectedModel.id,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < responseContent.length) {
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === "assistant") {
              lastMessage.content = responseContent.slice(0, charIndex + 1);
            }
            return newMessages;
          });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 20);
    }, 800 + Math.random() * 1000);
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

  const regenerateResponse = () => {
    // Remove last assistant message and trigger new response
    setMessages((prev) => prev.slice(0, -1));
    setIsTyping(true);
    
    setTimeout(() => {
      const lastUserMessage = messages[messages.length - 2]?.content || "";
      const responseContent = getSimulatedResponse(persona, lastUserMessage);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
        model: selectedModel.id,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
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
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none min-h-[48px] max-h-[200px]"
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
            <ChatInterface embedded onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
