"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Sparkles, Zap, User, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/personas", label: "Personas" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/create", label: "Create" },
  { href: "/pricing", label: "Pricing" },
  { href: "/creators", label: "For Creators" },
  { href: "/developers", label: "API" },
  { href: "/battle-arena", label: "Battle Arena", highlight: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>
            <span className="text-xl font-bold gradient-text">PersonaVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                Dashboard
              </Link>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  link.highlight
                    ? "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 flex items-center gap-1"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.highlight && <Zap className="w-3 h-3" />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons / User Menu */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span>{session?.user?.name || "Account"}</span>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl overflow-hidden z-50"
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/chats"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Sparkles className="w-4 h-4" />
                        My Chats
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors border-t border-white/5"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-200 glow-purple"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-2">
              {isLoggedIn && (
                <>
                  <div className="px-4 py-3 mb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{session?.user?.name}</div>
                        <div className="text-sm text-gray-400">{session?.user?.email}</div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              )}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    link.highlight
                      ? "text-cyan-400 bg-cyan-500/10 flex items-center gap-2"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.highlight && <Zap className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5 space-y-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/settings"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="w-full block px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
