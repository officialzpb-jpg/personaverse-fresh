import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/chats - List user's chats
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log("GET /api/chats - Session user ID:", session?.user?.id);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("GET /api/chats - Querying database for user:", session.user.id);

    const chats = await prisma.chat.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        personaId: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log("GET /api/chats - Found chats:", chats.length);

    return NextResponse.json({ chats });
  } catch (error: any) {
    console.error("Get chats error:", error);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error meta:", error.meta);
    return NextResponse.json(
      { error: "Failed to fetch chats", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/chats - Create a new chat
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log("POST /api/chats - Session:", session?.user?.id ? "Found user" : "No user");
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("POST /api/chats - Body:", { personaId: body.personaId, title: body.title, messagesCount: body.messages?.length });

    const { personaId, title, messages } = body;

    const chat = await prisma.chat.create({
      data: {
        userId: session.user.id,
        personaId,
        title: title || "New Chat",
        messages: messages || [],
      },
    });

    console.log("POST /api/chats - Created chat:", chat.id);

    return NextResponse.json({ chat }, { status: 201 });
  } catch (error) {
    console.error("Create chat error:", error);
    return NextResponse.json(
      { error: "Failed to create chat" },
      { status: 500 }
    );
  }
}
