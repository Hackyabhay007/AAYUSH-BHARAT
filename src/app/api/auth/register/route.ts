import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, password, phone } = body;

    // Input validation
    if (!full_name || !email || !password || !phone) {
      return NextResponse.json(
        { message: "All fields (full_name, email, password, phone) are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password should be more than 8 characters" },
        { status: 400 }
      );
    }

    // Mock successful registration
    const mockUserId = `user_${Date.now()}`;
    const token = jwt.sign(
      {
        userId: mockUserId,
        email,
        name: full_name,
      },
      process.env.JWT_SECRET || 'dummy-secret',
      { expiresIn: "720h" }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        token,
        user: {
          id: mockUserId,
          email,
          name: full_name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Request processing error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to process request",
      },
      { status: 500 }
    );
  }
}
