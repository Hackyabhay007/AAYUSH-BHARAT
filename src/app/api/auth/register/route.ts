import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/appwrite/auth";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    
    const body = await req.json();
    const { full_name, email, password, phone } = body;
    if (!full_name || !email || !password || !phone) {
      return NextResponse.json(
        { message: "All fields (full_name, email, password, phone) are required" },
        { status: 400 }
      );
    }
    if (password.length<8) {
      return NextResponse.json(
        { message: "Password should be more than 8 characters" },
        { status: 400 }
      );
    }

   
    const user = await AuthService.createAccount({email,password,fullname:full_name});

    
    if (!user) {
      return NextResponse.json(
        { message: "Failed to create user account" },
        { status: 500 }
      );
    }

    //  Create a JWT token
    const token = jwt.sign(
      {
        userId: user.$id,
        email,
        full_name,
      },
      process.env.JWT_SECRET || "",
      { expiresIn: "720h" }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        token,
        user: {
          id: user.userId,
          email,
          full_name,  
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Registration error:", error);
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: "Registration failed"+error, error: errorMessage },
      { status: 500 }
    );
  }
}
