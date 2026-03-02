// Simple test API to verify database connection
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log("Test API - Session:", JSON.stringify(session, null, 2));
    
    if (!session?.user?.id) {
      return NextResponse.json({ 
        error: "Not authenticated",
        session: session 
      }, { status: 401 });
    }

    // Try to count chats for this user
    const chatCount = await prisma.chat.count({
      where: { userId: session.user.id }
    });

    // Try to create a test chat
    const testChat = await prisma.chat.create({
      data: {
        userId: session.user.id,
        personaId: "test",
        title: "Test Chat",
        messages: [{ test: true }],
      },
    });

    return NextResponse.json({ 
      success: true, 
      userId: session.user.id,
      chatCount,
      testChatId: testChat.id
    });
  } catch (error: any) {
    console.error("Test API error:", error);
    return NextResponse.json({ 
      error: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}
