import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/effects/Hero";
import { Features } from "@/components/effects/Features";
import { PersonaShowcase } from "@/components/personas/PersonaShowcase";
import { Pricing } from "@/components/effects/Pricing";
import { Testimonials } from "@/components/effects/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <Features />
      <PersonaShowcase />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  );
}
