import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/appwrite/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    //  Input validation
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    try {
      const res = await AuthService.forgotPassword(email);

      if (!res) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Password Reset link sent successful",
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Failed to send password reset link:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Server error while sending reset link",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Request processing error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process request",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
