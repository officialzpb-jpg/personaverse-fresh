"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Content Creator",
    avatar: "SC",
    content: "PersonaVerse completely changed how I engage with my audience. My AI persona handles fan questions 24/7 while I focus on creating. I've 3x'd my revenue since joining.",
    rating: 5,
    metric: "3x revenue increase",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Startup Founder",
    avatar: "MJ",
    content: "The Tech Titan persona has given me better advice than some of my actual advisors. Being able to switch between GPT and Claude for different types of questions is game-changing.",
    rating: 5,
    metric: "$2M funding round",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    avatar: "ER",
    content: "We use PersonaVerse for customer support and lead qualification. The personas are so natural that customers often don't realize they're talking to AI. Conversion rates up 40%.",
    rating: 5,
    metric: "40% conversion boost",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Indie Game Dev",
    avatar: "DK",
    content: "Built an entire NPC dialogue system using the API. Saved months of writing time and the characters feel alive. The Fusion Mode responses are incredibly creative.",
    rating: 5,
    metric: "6 months dev time saved",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Life Coach",
    avatar: "LT",
    content: "Created a mindfulness persona that helps clients between sessions. It's like having a digital extension of my practice. My clients love the 24/7 availability.",
    rating: 5,
    metric: "500+ active clients",
  },
  {
    id: 6,
    name: "Alex Rivera",
    role: "AI Enthusiast",
    avatar: "AR",
    content: "Finally, a platform that lets me compare responses from different models side by side. The Battle Arena is addictive - I've spent hours watching AI debates.",
    rating: 5,
    metric: "1000+ battles watched",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      
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
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Loved by Users</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            What our{" "}
            <span className="gradient-text">community</span>{" "}
            says
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Join thousands of creators, developers, and businesses already using PersonaVerse.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full glass-card rounded-2xl p-6 card-lift relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Quote className="w-5 h-5 text-purple-400" />
                </div>
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-gray-300 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                
                {/* Metric */}
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg mb-6">
                  <span className="text-sm font-medium gradient-text">{testimonial.metric}</span>
                </div>
                
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-medium text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
