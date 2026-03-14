import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, avatar, systemPrompt, isPublic, voice, traits } = await req.json();

    if (!name || !description || !systemPrompt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const persona = await prisma.persona.create({
      data: {
        userId: session.user.id,
        name,
        description,
        avatar: avatar || "🤖",
        systemPrompt,
        isPublic: isPublic ?? true,
      },
    });

    return NextResponse.json({ persona }, { status: 201 });
  } catch (error) {
    console.error("Create persona error:", error);
    return NextResponse.json(
      { error: "Failed to create persona" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Return all public personas (no auth required for viewing)
    const personas = await prisma.persona.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    // Return array directly, not wrapped in object
    return NextResponse.json(personas);
  } catch (error) {
    console.error("Get personas error:", error);
    // Return empty array on error to prevent UI crash
    return NextResponse.json([]);
  }
}
