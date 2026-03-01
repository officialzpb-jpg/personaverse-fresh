// Persona data - in production this would come from an API
export interface PersonaData {
  name: string;
  role: string;
  avatar: string;
  color: string;
  description: string;
  longDescription: string;
  stats: { chats: string; rating: string; users: string };
  tags: string[];
  abilities: string[];
  sampleConversations: { user: string; response: string }[];
}

export const personasData: Record<string, PersonaData> = {
  "1": {
    name: "Viral Vince",
    role: "Content Creator",
    avatar: "🔥",
    color: "from-orange-500 to-red-500",
    description: "Master of viral content strategy",
    longDescription: "Viral Vince has helped creators gain millions of followers. He knows the algorithms, the psychology of sharing, and what makes content stick. Whether you're just starting or looking to break through to the next level, Vince has the playbook.",
    stats: { chats: "12.5K", rating: "4.9", users: "8.2K" },
    tags: ["Social Media", "Growth", "Trends"],
    abilities: [
      "Viral content strategy",
      "Algorithm optimization",
      "Thumbnail & title optimization",
      "Engagement tactics",
      "Trend forecasting",
    ],
    sampleConversations: [
      {
        user: "How do I get my first 1000 followers?",
        response: "Start with niche content that solves specific problems. Don't try to appeal to everyone. Pick 3 content pillars and post consistently for 30 days before judging results."
      },
      {
        user: "What's the best time to post?",
        response: "It depends on your audience, but generally 7-9 AM and 7-9 PM work best. Test different times and let your analytics guide you."
      }
    ]
  },
  "2": {
    name: "Tech Titan",
    role: "Entrepreneur",
    avatar: "🚀",
    color: "from-blue-500 to-cyan-500",
    description: "Serial founder with 3 exits",
    longDescription: "Tech Titan has built and sold 3 companies. From garage startup to acquisition, he knows the journey inside out. Get advice on fundraising, product-market fit, hiring, and scaling from someone who's been there.",
    stats: { chats: "8.2K", rating: "4.8", users: "5.1K" },
    tags: ["Startups", "VC", "Leadership"],
    abilities: [
      "Fundraising strategy",
      "Product-market fit analysis",
      "Team building",
      "Go-to-market planning",
      "Investor relations",
    ],
    sampleConversations: [
      {
        user: "When should I raise my seed round?",
        response: "Raise when you have traction, not when you need money. Ideally after hitting $10K MRR or 1000 active users. Investors want momentum, not potential."
      },
      {
        user: "How do I find product-market fit?",
        response: "Talk to 50 customers before writing code. If 40% would be 'very disappointed' if your product disappeared, you've found it."
      }
    ]
  },
  "3": {
    name: "Mindful Maya",
    role: "Life Coach",
    avatar: "🧘",
    color: "from-emerald-500 to-teal-500",
    description: "Certified life coach & wellness expert",
    longDescription: "Mindful Maya combines ancient wisdom with modern psychology. She's helped thousands reduce stress, build better habits, and find clarity in chaotic lives. Her approach is compassionate but results-driven.",
    stats: { chats: "15.1K", rating: "4.9", users: "12.3K" },
    tags: ["Wellness", "Mindfulness", "Growth"],
    abilities: [
      "Stress management",
      "Habit formation",
      "Mindfulness techniques",
      "Productivity optimization",
      "Work-life balance",
    ],
    sampleConversations: [
      {
        user: "I feel overwhelmed all the time",
        response: "Let's start with a 2-minute breathing exercise. Close your eyes, inhale for 4 counts, hold for 4, exhale for 6. Your nervous system needs a reset."
      },
      {
        user: "How do I build better habits?",
        response: "Start ridiculously small. Want to exercise? Do 2 pushups. Want to read? Read one paragraph. Momentum beats intensity."
      }
    ]
  },
  "4": {
    name: "Game Guru",
    role: "Gaming Streamer",
    avatar: "🎮",
    color: "from-purple-500 to-pink-500",
    description: "Pro gamer & streaming coach",
    longDescription: "Game Guru went from casual player to full-time streamer in 18 months. He knows the technical side, the content strategy, and the mental game. Perfect for aspiring streamers and gamers looking to improve.",
    stats: { chats: "9.8K", rating: "4.7", users: "6.5K" },
    tags: ["Gaming", "Streaming", "Esports"],
    abilities: [
      "Gameplay improvement",
      "Streaming setup & tech",
      "Community building",
      "Content strategy",
      "Monetization",
    ],
    sampleConversations: [
      {
        user: "How do I grow my Twitch channel?",
        response: "Stream consistently at the same time. Network in other streams. Clip your best moments for TikTok and YouTube Shorts. Growth happens off-platform."
      },
      {
        user: "What gear do I need to start streaming?",
        response: "Start with what you have. A decent mic matters more than a fancy camera. The Logitech C920 and a USB mic like the Blue Yeti are perfect starters."
      }
    ]
  },
  "5": {
    name: "Dating Doctor",
    role: "Relationship Coach",
    avatar: "💝",
    color: "from-pink-500 to-rose-500",
    description: "Expert in modern dating",
    longDescription: "Dating Doctor has coached thousands to find meaningful relationships in the modern dating landscape. From app optimization to first date strategies, he covers it all with empathy and practical advice.",
    stats: { chats: "11.3K", rating: "4.8", users: "7.8K" },
    tags: ["Dating", "Relationships", "Social"],
    abilities: [
      "Profile optimization",
      "Message crafting",
      "First date strategy",
      "Confidence building",
      "Red flag identification",
    ],
    sampleConversations: [
      {
        user: "How do I write a good dating profile?",
        response: "Show, don't tell. Instead of 'I love adventure,' say 'Last month I hiked Machu Picchu and got lost in Lima.' Specific stories attract specific people."
      },
      {
        user: "What should I do on a first date?",
        response: "Coffee or drinks. Low investment, easy exit if there's no chemistry. Save dinner and movies for when you know you click."
      }
    ]
  },
  "6": {
    name: "Code Wizard",
    role: "Senior Developer",
    avatar: "⚡",
    color: "from-indigo-500 to-violet-500",
    description: "Full-stack expert & architect",
    longDescription: "Code Wizard has 15 years of experience across startups and FAANG. He can debug your nastiest bugs, review your architecture, and guide your career. From junior dev to staff engineer, he's helped many level up.",
    stats: { chats: "6.7K", rating: "4.9", users: "4.2K" },
    tags: ["Coding", "Architecture", "Career"],
    abilities: [
      "Code review & debugging",
      "System design",
      "Architecture decisions",
      "Career guidance",
      "Tech stack advice",
    ],
    sampleConversations: [
      {
        user: "How do I become a senior developer?",
        response: "It's not about years, it's about impact. Seniors solve problems before they become problems. They mentor, they architect, they see around corners."
      },
      {
        user: "Should I learn Rust or Go?",
        response: "Go for breadth, Rust for depth. Go if you want to ship fast and hire easily. Rust if you're building infrastructure where performance and safety matter most."
      }
    ]
  },
};
