import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  console.log("Signup API called");
  
  try {
    const body = await req.json();
    console.log("Request body received:", { name: body.name, email: body.email, hasPassword: !!body.password });
    
    const { name, email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log("Checking for existing user:", email);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser.email);
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      );
    }
    
    console.log("No existing user found, creating new user");

    // Hash password with explicit salt rounds
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log("Signup - Password hashed successfully");
    console.log("Signup - Hash preview:", hashedPassword.substring(0, 30) + "...");

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    return NextResponse.json(
      { error: "Failed to create account: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
