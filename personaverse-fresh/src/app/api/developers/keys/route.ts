import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// Generate a new API key
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check user plan - only Pro and Creator can generate API keys
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true },
    });

    if (user?.plan === "free") {
      return NextResponse.json(
        { error: "API access requires Pro or Creator plan" },
        { status: 403 }
      );
    }

    // Generate API key
    const apiKey = `pk_${crypto.randomBytes(32).toString("hex")}`;
    
    // Store hashed version
    const hashedKey = crypto.createHash("sha256").update(apiKey).digest("hex");
    
    await prisma.apiKey.create({
      data: {
        userId: session.user.id,
        key: hashedKey,
        name: "Default API Key",
      },
    });

    // Return the full key (only shown once)
    return NextResponse.json({ apiKey });
  } catch (error) {
    console.error("API key generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate API key" },
      { status: 500 }
    );
  }
}

// List user's API keys
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        lastUsed: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ apiKeys });
  } catch (error) {
    console.error("List API keys error:", error);
    return NextResponse.json(
      { error: "Failed to list API keys" },
      { status: 500 }
    );
  }
}
