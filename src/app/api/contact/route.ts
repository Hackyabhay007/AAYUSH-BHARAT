import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullname, message, email } = body;
    
    // Input validation
    if (!fullname || !message || !email) {
      return NextResponse.json(
        { message: "Name, message, and email are required" },
        { status: 400 }
      );
    }

    try {
      // Dynamic import of ContactService
      const { default: ContactService } = await import("@/appwrite/contact");
      
      const contactUs = await ContactService.createContactMessage({
        fullname,
        email,
        message
      });
      
      if (!contactUs || !contactUs.$id) {
        return NextResponse.json(
          { message: "Failed to send message" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully",
        },
        { status: 200 }
      );
    } catch (serviceError) {
      console.error("Contact service error:", serviceError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send message",
          error: serviceError instanceof Error ? serviceError.message : "Service error"
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
