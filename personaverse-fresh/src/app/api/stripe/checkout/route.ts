import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe, PLANS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planId } = await req.json();
    
    console.log("Checkout request for plan:", planId);
    console.log("Available plans:", Object.keys(PLANS));
    
    const plan = PLANS[planId as keyof typeof PLANS];
    
    if (!plan) {
      console.error("Plan not found:", planId);
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (plan.id === "free") {
      return NextResponse.json({ error: "Cannot subscribe to free plan" }, { status: 400 });
    }

    // Type guard to ensure we have a paid plan with priceId
    if (!("priceId" in plan) || !plan.priceId) {
      console.error("Plan has no priceId:", plan);
      return NextResponse.json({ error: "Plan not configured. Please contact support." }, { status: 400 });
    }

    console.log("Creating checkout with priceId:", plan.priceId);

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: session.user.email!,
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?subscription=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?subscription=cancelled`,
      metadata: {
        userId: session.user.id,
        planId: plan.id,
      },
    });

    console.log("Checkout session created:", checkoutSession.id);

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session", details: error.message },
      { status: 500 }
    );
  }
}
