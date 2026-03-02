import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    console.log("Test login for:", email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User found:", user.email);
    console.log("Stored password hash:", user.password?.substring(0, 20) + "...");

    // Test bcrypt comparison
    const testHash = await bcrypt.hash(password, 12);
    console.log("New hash for provided password:", testHash.substring(0, 20) + "...");

    const isValid = await bcrypt.compare(password, user.password || "");
    console.log("Password valid:", isValid);

    return NextResponse.json({
      userExists: true,
      passwordValid: isValid,
      userId: user.id,
    });
  } catch (error) {
    console.error("Test error:", error);
    return NextResponse.json({ error: "Test failed" }, { status: 500 });
  }
}
