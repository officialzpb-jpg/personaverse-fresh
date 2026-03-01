"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Pricing } from "@/components/effects/Pricing";
import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences.",
  },
  {
    question: "What's included in the Free plan?",
    answer: "The Free plan includes 50 chats per month, access to 5 curated personas, and GPT-3.5 model access. It's perfect for trying out PersonaVerse.",
  },
  {
    question: "How does the Creator plan revenue sharing work?",
    answer: "Creator plan subscribers keep 70% of revenue from their monetized personas. We handle payments, hosting, and infrastructure. You focus on creating great personas.",
  },
  {
    question: "What AI models are available?",
    answer: "Pro and Creator plans include access to GPT-4, Claude 3, Gemini Pro, and select open-source models. Free plans are limited to GPT-3.5.",
  },
  {
    question: "Is there an API rate limit?",
    answer: "Pro plans include 1,000 API calls per month. Creator plans include 50,000 calls. Enterprise customers can request custom limits.",
  },
  {
    question: "How do I become a Creator?",
    answer: "Apply through our Creator program page. We review applications based on your existing audience, content quality, and persona concept.",
  },
];

const comparisonFeatures = [
  { feature: "Monthly chats", free: "50", pro: "Unlimited", creator: "Unlimited" },
  { feature: "Persona access", free: "5 curated", pro: "All personas", creator: "All + monetized" },
  { feature: "AI Models", free: "GPT-3.5 only", pro: "All models", creator: "All models" },
  { feature: "Persona creation", free: "Basic", pro: "Advanced", creator: "Advanced + monetization" },
  { feature: "Fusion Mode", free: "—", pro: "✓", creator: "✓" },
  { feature: "API access", free: "—", pro: "1,000 calls/mo", creator: "50,000 calls/mo" },
  { feature: "Revenue sharing", free: "—", pro: "—", creator: "70%" },
  { feature: "Analytics", free: "—", pro: "Basic", creator: "Advanced" },
  { feature: "Custom branding", free: "—", pro: "—", creator: "✓" },
  { feature: "Support", free: "Community", pro: "Priority", creator: "Dedicated" },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <Navbar />
      
      <Pricing />

      {/* Comparison Table */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Compare Plans</h2>
            <p className="text-gray-400">See exactly what&apos;s included in each plan</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left p-4 text-gray-400 font-medium">Feature</th>
                    <th className="text-center p-4 text-white font-semibold">Free</th>
                    <th className="text-center p-4 text-purple-400 font-semibold">Pro</th>
                    <th className="text-center p-4 text-amber-400 font-semibold">Creator</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className="border-b border-white/5 last:border-0">
                      <td className="p-4 text-gray-300">{row.feature}</td>
                      <td className="p-4 text-center text-gray-400">
                        {row.free === "✓" ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : row.free}
                      </td>
                      <td className="p-4 text-center text-gray-300">
                        {row.pro === "✓" ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : row.pro}
                      </td>
                      <td className="p-4 text-center text-gray-300">
                        {row.creator === "✓" ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : row.creator}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">FAQ</span>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
