import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get total chats
    const totalChats = await prisma.chat.count({
      where: { userId },
    });

    // Get chats this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const chatsThisMonth = await prisma.chat.count({
      where: {
        userId,
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    // Get total messages (estimate from chat history)
    const chats = await prisma.chat.findMany({
      where: { userId },
      select: { messages: true },
    });
    
    const totalMessages = chats.reduce((acc, chat) => {
      return acc + (chat.messages as any[]).length;
    }, 0);

    // Get most popular persona
    const personaStats = await prisma.chat.groupBy({
      by: ['personaId'],
      where: { userId },
      _count: {
        personaId: true,
      },
      orderBy: {
        _count: {
          personaId: 'desc',
        },
      },
      take: 1,
    });

    const mostPopularPersona = personaStats[0]?.personaId || null;

    // Get user's personas
    const userPersonas = await prisma.persona.count({
      where: { userId },
    });

    // Get chats per day for the last 7 days
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const count = await prisma.chat.count({
        where: {
          userId,
          createdAt: {
            gte: date,
            lt: nextDate,
          },
        },
      });
      
      last7Days.push({
        date: date.toISOString().split('T')[0],
        count,
      });
    }

    return NextResponse.json({
      stats: {
        totalChats,
        chatsThisMonth,
        totalMessages,
        mostPopularPersona,
        userPersonas,
      },
      activity: last7Days,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
