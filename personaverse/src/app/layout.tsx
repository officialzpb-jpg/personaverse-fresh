import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PersonaVerse | AI Personality & Multi-Model Chat Platform",
  description: "Chat with AI personalities. Switch between GPT, Claude, Gemini & more. Create your digital twin. The first platform where personalities, creators, and AI models converge.",
  keywords: [
    "AI personality chatbot",
    "multi-model AI platform",
    "AI creator monetization",
    "digital twin AI",
    "AI persona marketplace",
    "GPT alternative",
    "Claude AI chat",
    "AI character creator",
    "virtual influencer",
    "AI companion"
  ],
  authors: [{ name: "PersonaVerse" }],
  creator: "PersonaVerse",
  publisher: "PersonaVerse",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://personaverse.ai",
    siteName: "PersonaVerse",
    title: "PersonaVerse | AI Personality & Multi-Model Chat Platform",
    description: "Chat with AI personalities. Switch between GPT, Claude, Gemini & more. Create your digital twin.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PersonaVerse - AI Personality Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PersonaVerse | AI Personality & Multi-Model Chat Platform",
    description: "Chat with AI personalities. Switch between GPT, Claude, Gemini & more. Create your digital twin.",
    images: ["/og-image.jpg"],
    creator: "@personaverse",
  },
  alternates: {
    canonical: "https://personaverse.ai",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0a0a" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "PersonaVerse",
              applicationCategory: "AIApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1250",
              },
              description: "AI Personality & Multi-Model Chat Platform",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#0a0a0a] text-white`}>
        {children}
      </body>
    </html>
  );
}
