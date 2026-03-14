import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    const payload = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;
        const subscriptionId = session.subscription;

        if (userId && subscriptionId) {
          // Update or create subscription in database
          await prisma.subscription.upsert({
            where: { userId },
            update: {
              status: "active",
              priceId: session.line_items?.data[0]?.price?.id,
              currentPeriodEnd: new Date(session.expires_at! * 1000),
            },
            create: {
              userId,
              status: "active",
              priceId: session.line_items?.data[0]?.price?.id,
              currentPeriodEnd: new Date(session.expires_at! * 1000),
            },
          });

          // Update user plan
          await prisma.user.update({
            where: { id: userId },
            data: { plan: planId },
          });
        }
        break;
      }

      case "invoice.payment_failed": {
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;

        if (userId) {
          await prisma.subscription.updateMany({
            where: { userId },
            data: { status: "past_due" },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;

        if (userId) {
          await prisma.subscription.updateMany({
            where: { userId },
            data: { status: "cancelled" },
          });

          // Downgrade user to free plan
          await prisma.user.update({
            where: { id: userId },
            data: { plan: "free" },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
