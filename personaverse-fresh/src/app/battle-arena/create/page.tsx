"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Swords } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      const res = await fetch("/api/personas");
      if (res.ok) {
        const data = await res.json();
        setPersonas(data);
        if (data.length >= 2) {
          setPersona1Id(data[0].id);
          setPersona2Id(data[1].id);
        }
      }
    } catch (error) {
      console.error("Error fetching personas:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      setError("Please sign in to create a battle");
      return;
    }
    
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }
    
    if (persona1Id === persona2Id) {
      setError("Please select two different personas");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/battles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          persona1Id,
          persona2Id,
          duration: 24,
        }),
      });
      
      if (res.ok) {
        const battle = await res.json();
        router.push("/battle-arena");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create battle");
      }
    } catch (error) {
      setError("Failed to create battle");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#0a0a0a] pt-16 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        </div>
      </>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />
      
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/battle-arena"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Arena
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Swords className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Create New Battle</h1>
              <p className="text-gray-400">Set up a debate between two AI personas</p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Persona 1
                  </label>
                  <select
                    value={persona1Id}
                    onChange={(e) => setPersona1Id(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                  >
                    {personas.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Persona 2
                  </label>
                  <select
                    value={persona2Id}
                    onChange={(e) => setPersona2Id(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                  >
                    {personas.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || personas.length < 2}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Battle...
                  </>
                ) : (
                  "Start Battle"
                )}
              </button>
              
              {personas.length < 2 && (
                <p className="text-center text-sm text-gray-400 mt-4">
                  Need at least 2 personas to create a battle.{" "}
                  <Link href="/create" className="text-purple-400 hover:text-purple-300">
                    Create a persona first
                  </Link>
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
