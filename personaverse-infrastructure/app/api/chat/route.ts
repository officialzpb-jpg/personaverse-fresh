// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { aiRouter } from '@/middleware/aiRouter';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { prompt, model: requestedModel, personaId } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Get user usage data from database
    const userSession = await getUserSession(session.user.id);
    
    if (!userSession) {
      return NextResponse.json(
        { error: 'User session not found' },
        { status: 404 }
      );
    }

    // Route through AI Router
    const response = await aiRouter.routeRequest(
      request,
      userSession,
      prompt,
      requestedModel
    );

    return response;

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get user session with usage data
async function getUserSession(userId: string) {
  // This would query your database
  // Placeholder implementation
  
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true,
        usage: true,
      },
    });

    if (!user) return null;

    // Check if daily/ monthly limits need reset
    const now = new Date();
    const dailyReset = new Date(user.usage?.dailyResetAt || 0);
    const monthlyReset = new Date(user.usage?.monthlyResetAt || 0);

    let dailyMessagesUsed = user.usage?.dailyMessagesUsed || 0;
    let monthlyTokensUsed = user.usage?.monthlyTokensUsed || 0;

    // Reset daily if it's a new day
    if (now.getDate() !== dailyReset.getDate()) {
      dailyMessagesUsed = 0;
      await prisma.userUsage.update({
        where: { userId },
        data: {
          dailyMessagesUsed: 0,
          dailyResetAt: now,
        },
      });
    }

    // Reset monthly if it's a new month
    if (now.getMonth() !== monthlyReset.getMonth()) {
      monthlyTokensUsed = 0;
      await prisma.userUsage.update({
        where: { userId },
        data: {
          monthlyTokensUsed: 0,
          monthlyResetAt: now,
        },
      });
    }

    return {
      userId: user.id,
      tier: user.subscription?.tier || 'free',
      dailyMessagesUsed,
      monthlyTokensUsed,
    };

  } catch (error) {
    console.error('GetUserSession Error:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
