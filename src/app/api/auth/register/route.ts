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
      // This will create the account and return a session through login
      const user = await AuthService.createAccount({
        email,
        password,
        fullname: full_name,
        phone,
      });

      if (!user) {
        return NextResponse.json(
          { message: "Failed to create user account" },
          { status: 500 }
        );
      }

      // Create JWT with user data
      const token = jwt.sign(
        {
          userId: user.$id,
          email: email, // Use the email from the registration request
          name: full_name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "720h" }
      );

      return NextResponse.json(
        {
          success: true,
          message: "Registration successful",
          token,
          user: {
            id: user.$id,
            email: email, // Use the email from the registration request
            name: full_name,
          },
        },
        { status: 201 }
      );
    } catch (authError) {
      console.error("Auth service error:", authError);
      return NextResponse.json(
        {
          success: false,
          message: authError instanceof Error ? authError.message : "Registration failed",
        },
        { status: 500 }
      );
    }
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
