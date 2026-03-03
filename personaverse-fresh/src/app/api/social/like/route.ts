import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/social/like - Like a persona
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { personaId } = await req.json();

    if (!personaId) {
      return NextResponse.json({ error: "Persona ID required" }, { status: 400 });
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_personaId: {
          userId: session.user.id,
          personaId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          userId_personaId: {
            userId: session.user.id,
            personaId,
          },
        },
      });
      return NextResponse.json({ liked: false });
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId: session.user.id,
          personaId,
        },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error("Like error:", error);
    return NextResponse.json({ error: "Failed to like persona" }, { status: 500 });
  }
}

// GET /api/social/like?personaId=xxx - Check if user liked a persona
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const personaId = searchParams.get("personaId");

    if (!personaId) {
      return NextResponse.json({ error: "Persona ID required" }, { status: 400 });
    }

    // Get like count
    const likeCount = await prisma.like.count({
      where: { personaId },
    });

    // Check if current user liked it
    let userLiked = false;
    if (session?.user?.id) {
      const like = await prisma.like.findUnique({
        where: {
          userId_personaId: {
            userId: session.user.id,
            personaId,
          },
        },
      });
      userLiked = !!like;
    }

    return NextResponse.json({ likeCount, userLiked });
  } catch (error) {
    console.error("Get likes error:", error);
    return NextResponse.json({ error: "Failed to get likes" }, { status: 500 });
  }
}
