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

    // Check for required environment variables
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Import AuthService dynamically
    const { default: AuthService } = await import("@/appwrite/auth");

    try {
      // First get the session
      const session = await AuthService.login({ email, password });

      if (!session) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }

      // Then get the actual user data
      const userData = await AuthService.getCurrentUser();

      // Create JWT with user data
      const token = jwt.sign(
        {
          userId: userData.$id,
          email: email, // Use the email from the login request
          name: userData.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "720h" }
      );

      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
          token,
          user: {
            id: userData.$id,
            email: email, // Use the email from the login request
            name: userData.name,
          },
        },
        { status: 200 }
      );
    } catch (authError) {
      console.error("Auth service error:", authError);
      return NextResponse.json(
        {
          success: false,
          message:
            authError instanceof Error ? authError.message : "Login failed",
        },
        { status: 401 }
      );
    }
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
