import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password should be more than 8 characters" },
        { status: 400 }
      );
    }

    // Mock successful login for test user
    if (email === "test@gmail.com" && password === "testpassword") {
      const token = jwt.sign(
        {
          userId: "test-user-id",
          email,
          name: "Test User",
        },
        process.env.JWT_SECRET || "dummy-secret",
        { expiresIn: "720h" }
      );

      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
          token,
          user: {
            id: "test-user-id",
            email,
            name: "Test User",
          },
        },
        { status: 200 }
      );
    }

    // Mock error for other credentials
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Request processing error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to process request",
      },
      { status: 500 }
    );
  }
}
