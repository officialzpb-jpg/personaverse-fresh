import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/battles/leaderboard - Get battle leaderboard
export async function GET(req: NextRequest) {
  try {
    console.log("Fetching leaderboard...");
    
    // Check if table exists by trying a simple query
    const count = await prisma.battleLeaderboard.count().catch(() => 0);
    console.log("Leaderboard count:", count);
    
    const leaderboard = await prisma.battleLeaderboard.findMany({
      orderBy: [
        { wins: "desc" },
        { debates: "desc" },
      ],
      take: 10,
    });
    
    console.log("Leaderboard fetched:", leaderboard);
    
    // Calculate win rates and format
    const formattedLeaderboard = leaderboard.map((entry, index) => ({
      rank: index + 1,
      personaId: entry.personaId,
      personaName: entry.personaName,
      wins: entry.wins,
      losses: entry.losses,
      debates: entry.debates,
      winRate: entry.debates > 0 
        ? `${Math.round((entry.wins / entry.debates) * 100)}%`
        : "0%",
    }));
    
    return NextResponse.json(formattedLeaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    // Return empty array instead of error to prevent UI crash
    return NextResponse.json([], { status: 200 });
  }
}
