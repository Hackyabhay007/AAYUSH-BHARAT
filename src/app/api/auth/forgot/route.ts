import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/appwrite/auth";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    //  Input validation
    if (!email ) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

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
    console.error("Password Reset Link dont send:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Password Reset Link dont send",
        error: error,
      },
      { status: 500 }
    );

  }
}
