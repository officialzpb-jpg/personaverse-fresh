"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    description: "Get started with AI personalities",
    price: "$0",
    period: "forever",
    icon: Sparkles,
    features: [
      "50 chats per month",
      "Access to 5 personas",
      "GPT-3.5 model only",
      "Basic persona creation",
      "Community support",
    ],
    cta: "Get Started",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    description: "For power users and creators",
    price: "$15",
    period: "/month",
    icon: Zap,
    features: [
      "Unlimited chats",
      "Access to all personas",
      "All AI models (GPT-4, Claude, Gemini)",
      "Advanced persona creation",
      "Fusion Mode access",
      "Priority support",
      "API access (1,000 calls/month)",
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Creator",
    description: "For creators and businesses",
    price: "$99",
    period: "/month",
    icon: Crown,
    features: [
      "Everything in Pro",
      "Monetized personas",
      "Fan chat automation",
      "Analytics dashboard",
      "Revenue sharing (70%)",
      "Custom branding",
      "API access (50,000 calls/month)",
      "Dedicated support",
    ],
    cta: "Apply for Creator",
    href: "/creators",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-gray-300">Simple Pricing</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Choose your{" "}
            <span className="gradient-text">PersonaVerse</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Start free, upgrade when you&apos;re ready. No hidden fees, cancel anytime.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-sm font-medium text-white">
                  Most Popular
                </div>
              )}
              
              <div
                className={cn(
                  "h-full rounded-2xl p-8",
                  plan.popular
                    ? "glass-card gradient-border glow-purple"
                    : "glass"
                )}
              >
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    plan.popular
                      ? "bg-gradient-to-br from-purple-500 to-blue-500"
                      : "bg-white/10"
                  )}>
                    <plan.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-sm text-gray-400">{plan.description}</p>
                  </div>
                </div>
                
                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <Link
                  href={plan.href}
                  className={cn(
                    "block w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-200",
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 glow-purple"
                      : "glass text-white hover:bg-white/10"
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400">
            Need a custom enterprise solution?{" "}
            <Link href="/developers" className="text-purple-400 hover:text-purple-300 transition-colors">
              Contact our sales team
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
