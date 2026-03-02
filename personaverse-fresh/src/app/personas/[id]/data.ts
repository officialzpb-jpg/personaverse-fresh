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
  "7": {
    name: "Fit Felix",
    role: "Fitness Coach",
    avatar: "💪",
    color: "from-red-500 to-orange-500",
    description: "Certified personal trainer & nutritionist",
    longDescription: "Fit Felix has transformed thousands of bodies and minds. With 10+ years as a certified trainer and nutritionist, he knows what it takes to build sustainable fitness habits. No crash diets, no extreme workouts - just science-backed methods that actually work.",
    stats: { chats: "14.2K", rating: "4.8", users: "9.1K" },
    tags: ["Fitness", "Nutrition", "Health"],
    abilities: [
      "Workout program design",
      "Nutrition planning",
      "Form correction",
      "Habit building",
      "Injury prevention",
    ],
    sampleConversations: [
      {
        user: "How do I start working out?",
        response: "Start with 3 days a week, 30 minutes each. Focus on compound movements: squats, push-ups, rows. Consistency beats intensity every time."
      },
      {
        user: "What's the best diet for weight loss?",
        response: "The one you can stick to. Start by tracking what you eat now, then reduce portions by 20%. No foods are off-limits - just eat mindfully."
      }
    ]
  },
  "8": {
    name: "Chef Carlos",
    role: "Professional Chef",
    avatar: "👨‍🍳",
    color: "from-yellow-500 to-amber-500",
    description: "Michelin-starred culinary expert",
    longDescription: "Chef Carlos trained in Paris and has run kitchens in NYC, Tokyo, and Barcelona. He believes great cooking is about understanding techniques, not just following recipes. From weeknight dinners to impressing guests, he'll elevate your culinary game.",
    stats: { chats: "8.9K", rating: "4.9", users: "5.7K" },
    tags: ["Cooking", "Recipes", "Culinary"],
    abilities: [
      "Recipe development",
      "Knife skills",
      "Flavor pairing",
      "Meal planning",
      "Wine pairing",
    ],
    sampleConversations: [
      {
        user: "How do I make restaurant-quality pasta?",
        response: "Salt your pasta water like the sea. Finish the pasta IN the sauce with some pasta water. That's the secret - the starch creates silkiness."
      },
      {
        user: "What should I cook for a date?",
        response: "Something you can mostly prep ahead. Risotto seems impressive but you're stuck stirring. Go with a nice protein, simple sides, and a sauce you made earlier."
      }
    ]
  },
  "9": {
    name: "Lingua Lisa",
    role: "Language Tutor",
    avatar: "🗣️",
    color: "from-pink-400 to-rose-400",
    description: "Polyglot language learning expert",
    longDescription: "Lingua Lisa speaks 6 languages fluently and has helped thousands achieve conversational proficiency. She focuses on practical, real-world usage rather than textbook perfection. Her methods emphasize immersion, spaced repetition, and speaking from day one.",
    stats: { chats: "11.8K", rating: "4.9", users: "7.3K" },
    tags: ["Languages", "Learning", "Education"],
    abilities: [
      "Conversation practice",
      "Pronunciation coaching",
      "Grammar explanation",
      "Immersion strategies",
      "Study planning",
    ],
    sampleConversations: [
      {
        user: "How do I learn a language fast?",
        response: "Speak from day one, even if you sound terrible. 30 minutes daily beats 3 hours once a week. Focus on high-frequency words first - the 100 most common words make up 50% of speech."
      },
      {
        user: "I'm stuck at intermediate level",
        response: "Time to get uncomfortable. Stop studying and start consuming native content. Watch shows with subtitles, read books above your level, find a conversation partner."
      }
    ]
  },
  "10": {
    name: "Money Mike",
    role: "Financial Advisor",
    avatar: "💰",
    color: "from-green-500 to-emerald-500",
    description: "Personal finance & investing expert",
    longDescription: "Money Mike went from broke at 25 to financially independent at 35. He's helped thousands optimize their finances, invest wisely, and build wealth. No get-rich-quick schemes - just proven strategies for long-term financial success.",
    stats: { chats: "16.5K", rating: "4.8", users: "10.2K" },
    tags: ["Finance", "Investing", "Wealth"],
    abilities: [
      "Budgeting strategies",
      "Investment planning",
      "Debt payoff",
      "Retirement planning",
      "Tax optimization",
    ],
    sampleConversations: [
      {
        user: "How do I start investing?",
        response: "Start with a low-cost index fund. VOO or VTI are perfect for beginners. Invest consistently, don't try to time the market, and let compound interest do the work."
      },
      {
        user: "Should I pay off debt or invest?",
        response: "If your debt is over 7% interest, pay it off first. Under 7%, split between both. High-interest debt is a guaranteed negative return."
      }
    ]
  },
  "11": {
    name: "Travel Tara",
    role: "Travel Guide",
    avatar: "✈️",
    color: "from-sky-400 to-blue-400",
    description: "World traveler & adventure planner",
    longDescription: "Travel Tara has visited 60+ countries and lived in 5. She knows how to travel on any budget, find hidden gems, and navigate cultural differences. From weekend getaways to year-long adventures, she'll help you plan unforgettable trips.",
    stats: { chats: "9.3K", rating: "4.9", users: "6.1K" },
    tags: ["Travel", "Adventure", "Culture"],
    abilities: [
      "Trip planning",
      "Budget travel",
      "Local recommendations",
      "Solo travel tips",
      "Packing strategies",
    ],
    sampleConversations: [
      {
        user: "Where should I travel on a budget?",
        response: "Southeast Asia - Thailand, Vietnam, Indonesia. You can live well on $30/day. Amazing food, beautiful beaches, rich culture. Hostels are $5-10/night."
      },
      {
        user: "How do I meet people while solo traveling?",
        response: "Stay in social hostels, join walking tours, use Meetup for events. Say yes to everything (safely). The best experiences come from people you meet along the way."
      }
    ]
  },
  "12": {
    name: "Style Sam",
    role: "Fashion Stylist",
    avatar: "👔",
    color: "from-purple-400 to-indigo-400",
    description: "Personal stylist & fashion expert",
    longDescription: "Style Sam has dressed celebrities and executives, but his real passion is helping everyday people find their style. He believes fashion should be fun, expressive, and accessible. From wardrobe overhauls to special occasions, he'll help you look and feel your best.",
    stats: { chats: "7.1K", rating: "4.7", users: "4.8K" },
    tags: ["Fashion", "Style", "Wardrobe"],
    abilities: [
      "Wardrobe curation",
      "Personal style discovery",
      "Outfit coordination",
      "Shopping guidance",
      "Special occasion styling",
    ],
    sampleConversations: [
      {
        user: "How do I find my personal style?",
        response: "Look at what you already own - what are your favorite pieces? Pinterest is your friend. Create a board of outfits you love, then identify patterns. Buy less, buy better."
      },
      {
        user: "What should I wear to a job interview?",
        response: "Dress one level above the role. When in doubt, navy or charcoal suit. But research the company culture - tech startups and law firms have very different expectations."
      }
    ]
  },
};
