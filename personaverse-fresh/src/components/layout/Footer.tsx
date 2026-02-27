"use client";

import Link from "next/link";
import { Sparkles, Twitter, Github, Linkedin, Youtube, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Personas", href: "/personas" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Create Persona", href: "/create" },
    { label: "Pricing", href: "/pricing" },
    { label: "Battle Arena", href: "/battle-arena" },
  ],
  Creators: [
    { label: "Creator Program", href: "/creators" },
    { label: "Monetization", href: "/creators#monetization" },
    { label: "Success Stories", href: "/creators#stories" },
    { label: "Resources", href: "/creators#resources" },
  ],
  Developers: [
    { label: "API Documentation", href: "/developers" },
    { label: "SDKs", href: "/developers#sdks" },
    { label: "Pricing", href: "/developers#pricing" },
    { label: "Status", href: "/developers#status" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/about#careers" },
    { label: "Press Kit", href: "/about#press" },
  ],
  Legal: [
    { label: "Trust & Safety", href: "/trust" },
    { label: "Privacy Policy", href: "/trust#privacy" },
    { label: "Terms of Service", href: "/trust#terms" },
    { label: "Cookie Policy", href: "/trust#cookies" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/personaverse", label: "Twitter" },
  { icon: Github, href: "https://github.com/personaverse", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/company/personaverse", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/personaverse", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">PersonaVerse</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              The AI Personality & Multi-Model Chat Platform. Chat, create, and monetize AI personas.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Stay updated</h4>
                <p className="text-xs text-gray-400">Get the latest news and updates</p>
              </div>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-sm font-medium text-white hover:from-purple-500 hover:to-blue-500 transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} PersonaVerse. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/trust#privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link href="/trust#terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Terms
            </Link>
            <Link href="/trust#cookies" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
