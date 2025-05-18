import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/appwrite/auth"; // Make sure this path is correct


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userid,secret,password } = body;

    //  Input validation
    if (!password ) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 }
      );
    }

    const res = await AuthService.resetPassword(userid,secret,password);

    if (!res) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

   

    return NextResponse.json(
      {
        success: true,
        message: "Password updated successful",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error in updating password:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in updating password:",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
