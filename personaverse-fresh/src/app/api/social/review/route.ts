import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/social/review - Create a review
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { personaId, rating, comment } = await req.json();

    if (!personaId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid review data" }, { status: 400 });
    }

    // Check if user already reviewed
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_personaId: {
          userId: session.user.id,
          personaId,
        },
      },
    });

    if (existingReview) {
      // Update existing review
      const review = await prisma.review.update({
        where: {
          userId_personaId: {
            userId: session.user.id,
            personaId,
          },
        },
        data: { rating, comment },
      });
      return NextResponse.json({ review });
    } else {
      // Create new review
      const review = await prisma.review.create({
        data: {
          userId: session.user.id,
          personaId,
          rating,
          comment,
        },
      });
      return NextResponse.json({ review }, { status: 201 });
    }
  } catch (error) {
    console.error("Review error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}

// GET /api/social/review?personaId=xxx - Get reviews for a persona
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const personaId = searchParams.get("personaId");

    if (!personaId) {
      return NextResponse.json({ error: "Persona ID required" }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { personaId },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Calculate average rating
    const avgRating = reviews.length > 0 
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
      : 0;

    return NextResponse.json({ 
      reviews, 
      avgRating: Math.round(avgRating * 10) / 10,
      totalReviews: reviews.length,
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    return NextResponse.json({ error: "Failed to get reviews" }, { status: 500 });
  }
}
