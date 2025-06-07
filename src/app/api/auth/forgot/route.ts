import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // For now, just return a success response
    return NextResponse.json(
      {
        success: true,
        message: "If an account exists with this email, you will receive a password reset link.",
      },
      { status: 200 }
    );
    
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process request",
      },
      { status: 500 }
    );
  }
}
