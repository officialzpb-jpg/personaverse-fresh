import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// POST /api/battles/[id]/vote - Vote for a persona in a battle
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const battleId = params.id;
    
    const { personaId } = await req.json();
    
    if (!personaId) {
      return NextResponse.json(
        { error: "Persona ID required" },
        { status: 400 }
      );
    }
    
    // Check if battle exists and is active
    const battle = await prisma.battle.findUnique({
      where: { id: battleId },
    });
    
    if (!battle) {
      return NextResponse.json(
        { error: "Battle not found" },
        { status: 404 }
      );
    }
    
    if (battle.status !== "active") {
      return NextResponse.json(
        { error: "Battle is not active" },
        { status: 400 }
      );
    }
    
    // Check if user already voted
    if (session?.user?.id) {
      const existingVote = await prisma.battleVote.findUnique({
        where: {
          battleId_userId: {
            battleId,
            userId: session.user.id,
          },
        },
      });
      
      if (existingVote) {
        return NextResponse.json(
          { error: "You have already voted in this battle" },
          { status: 400 }
        );
      }
    }
    
    // Create vote
    await prisma.battleVote.create({
      data: {
        battleId,
        userId: session?.user?.id,
        personaId,
      },
    });
    
    // Update vote count
    if (personaId === battle.persona1Id) {
      await prisma.battle.update({
        where: { id: battleId },
        data: { persona1Votes: { increment: 1 } },
      });
    } else if (personaId === battle.persona2Id) {
      await prisma.battle.update({
        where: { id: battleId },
        data: { persona2Votes: { increment: 1 } },
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error voting:", error);
    return NextResponse.json(
      { error: "Failed to vote" },
      { status: 500 }
    );
  }
}

// GET /api/battles/[id]/vote - Get vote count for a battle
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const battleId = params.id;
    
    const battle = await prisma.battle.findUnique({
      where: { id: battleId },
      select: {
        persona1Votes: true,
        persona2Votes: true,
        _count: {
          select: { votes: true },
        },
      },
    });
    
    if (!battle) {
      return NextResponse.json(
        { error: "Battle not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      persona1Votes: battle.persona1Votes,
      persona2Votes: battle.persona2Votes,
      totalVotes: battle._count.votes,
    });
  } catch (error) {
    console.error("Error fetching votes:", error);
    return NextResponse.json(
      { error: "Failed to fetch votes" },
      { status: 500 }
    );
  }
}
