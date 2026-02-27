"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Demo credentials - in production, this would be server-side authentication
    if (email === "admin@personaverse.space" && password === "admin123") {
      // Store admin session
      localStorage.setItem("adminSession", JSON.stringify({
        email,
        role: "admin",
        loginTime: new Date().toISOString()
      }));
      
      // Redirect to admin dashboard
      router.push("/admin/dashboard");
    } else {
      setError("Invalid admin credentials");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400">Secure access for authorized personnel only</p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-2xl p-8">
          {/* Security Notice */}
          <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-6">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <strong className="text-white">Restricted Access:</strong> This area is for 
              PersonaVerse administrators only. Unauthorized access is prohibited.
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6"
            >
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@personaverse.space"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl font-semibold text-white hover:from-amber-500 hover:to-orange-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Access Admin Dashboard"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Back to Site */}
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Return to PersonaVerse
            </Link>
          </div>
        </div>

        {/* Demo Credentials Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Demo credentials: admin@personaverse.space / admin123
          </p>
        </div>
      </motion.div>
    </main>
  );
}
