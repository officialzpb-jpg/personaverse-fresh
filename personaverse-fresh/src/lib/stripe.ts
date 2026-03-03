import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export const STRIPE_PRICE_IDS = {
  pro: process.env.STRIPE_PRO_PRICE_ID!,
  creator: process.env.STRIPE_CREATOR_PRICE_ID!,
};

export const PLANS = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    features: [
      "Access to 12 built-in personas",
      "100 messages per month",
      "Basic chat history",
      "Community support",
    ],
    limits: {
      messages: 100,
      personas: 0,
    },
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 15,
    priceId: STRIPE_PRICE_IDS.pro,
    features: [
      "Unlimited messages",
      "Create up to 5 custom personas",
      "Priority AI responses",
      "Voice chat (coming soon)",
      "Email support",
    ],
    limits: {
      messages: Infinity,
      personas: 5,
    },
  },
  creator: {
    id: "creator",
    name: "Creator",
    price: 99,
    priceId: STRIPE_PRICE_IDS.creator,
    features: [
      "Everything in Pro",
      "Unlimited custom personas",
      "Monetize your personas",
      "Analytics dashboard",
      "API access",
      "Priority support",
    ],
    limits: {
      messages: Infinity,
      personas: Infinity,
    },
  },
};
