import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/effects/Hero";
import { Features } from "@/components/effects/Features";
import { PersonaShowcase } from "@/components/personas/PersonaShowcase";
import { Pricing } from "@/components/effects/Pricing";
import { Testimonials } from "@/components/effects/Testimonials";
import { ChatWidget } from "@/components/chat/ChatInterface";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <Hero />
      <section className="glass-section">
        <Features />
      </section>
      <section className="glass-section">
        <PersonaShowcase />
      </section>
      <section className="glass-section">
        <Pricing />
      </section>
      <section className="glass-section">
        <Testimonials />
      </section>
      <Footer />
      <ChatWidget />
    </main>
  );
}
