"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sword, Loader2 } from "lucide-react";

interface Persona {
  id: string;
  name: string;
  avatar: string;
  description: string;
}

export default function CreateBattlePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [topic, setTopic] = useState("");
  const [persona1Id, setPersona1Id] = useState("");
  const [persona2Id, setPersona2Id] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      const response = await fetch("/api/personas");
      if (response.ok) {
        const data = await response.json();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setPersonas(data);
        } else {
          console.error("Expected array but got:", data);
          setPersonas([]);
        }
      } else {
        console.error("Failed to fetch personas:", response.status);
        setPersonas([]);
      }
    } catch (error) {
      console.error("Error fetching personas:", error);
      setPersonas([]);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      alert("Please sign in to create a battle");
      return;
    }
    
    if (!topic || !persona1Id || !persona2Id) {
      alert("Please fill in all fields");
      return;
    }
    
    if (persona1Id === persona2Id) {
      alert("Please select two different personas");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/battles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          persona1Id,
          persona2Id,
          duration: 24,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Failed to create battle");
        return;
      }
      
      const battle = await response.json();
      router.push(`/battle-arena?battle=${battle.id}`);
    } catch (error) {
      console.error("Error creating battle:", error);
      alert("Failed to create battle");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-transparent pt-16">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <Sword className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create a Battle</h1>
            <p className="text-gray-400">Pick two personas and a topic to start an epic debate!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Topic */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Debate Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Will AI replace human creativity?"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                required
              />
            </div>

            {/* Persona 1 */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Challenger 1
              </label>
              <select
                value={persona1Id}
                onChange={(e) => setPersona1Id(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                required
              >
                <option value="" className="bg-[#0a0a0a]">Select a persona...</option>
                {personas.map((persona) => (
                  <option key={persona.id} value={persona.id} className="bg-[#0a0a0a]">
                    {persona.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Persona 2 */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Challenger 2
              </label>
              <select
                value={persona2Id}
                onChange={(e) => setPersona2Id(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                required
              >
                <option value="" className="bg-[#0a0a0a]">Select a persona...</option>
                {personas.map((persona) => (
                  <option key={persona.id} value={persona.id} className="bg-[#0a0a0a]">
                    {persona.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Battle...
                </>
              ) : (
                <>
                  <Sword className="w-5 h-5" />
                  Start Battle
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
