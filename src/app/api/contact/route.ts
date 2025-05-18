import { NextRequest, NextResponse } from "next/server";
import ContactService from "@/appwrite/contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullname, message, email } = body;
    
    //  Input validation
    if (!fullname || !message || !email) {
      return NextResponse.json(
        { message: "Name and Email are required" },
        { status: 400 }
      );
    }

    const contactUs=await ContactService.createContactMessage({fullname,email,message})
    console.log(contactUs);
    
    if (!contactUs || !contactUs.$id) {
      return NextResponse.json(
        { message: "Failed to send message" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Successfully send message",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in sending message", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in sending message",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
