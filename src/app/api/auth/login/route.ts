import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/appwrite/auth"; // Make sure this path is correct
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password should be more than 8 characters" },
        { status: 400 }
      );
    }
    //  Input validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await AuthService.login({ email, password });

    if (user === undefined || user === null) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    //  Generate JWT
    const token = jwt.sign(
      {
        userId: user.$id,
        email: email,
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "720h" }
    );
    if (user) {
      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
          token,
          user: {
            id: user.userId,
            email: email,
          },
        },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
