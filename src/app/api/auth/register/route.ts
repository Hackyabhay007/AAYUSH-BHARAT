// import { NextRequest, NextResponse } from "next/server";
// import AuthService from "@/appwrite/auth";
// import DatabaseService from "@/appwrite/database";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";


// function generateUserId(email:string):string {
//   // Create a timestamp-based prefix
//   const timestamp = Date.now().toString(36);
  
//   // Take first part of email (before @) and clean it
//   const emailPrefix = email.split('@')[0]
//     .toLowerCase()
//     .replace(/[^a-z0-9]/g, '')
//     .slice(0, 8);
  
//   // Combine parts with a random suffix
//   const randomSuffix = Math.random().toString(36).substring(2, 6);
  
//   return `user_${timestamp}_${emailPrefix}_${randomSuffix}`;
// }

// export async function POST(req: NextRequest) {
//   try {
    
//     const body = await req.json();
//     const { full_name, email, password, phone } = body;

//     if (!full_name || !email || !password || !phone) {
//       return NextResponse.json(
//         { message: "All fields (full_name, email, password, phone) are required" },
//         { status: 400 }
//       );
//     }

//     // const now = new Date().toISOString();
   
//     const existingUsers = await DatabaseService.listUsersByEmail(email);

//     if (existingUsers.length > 0) {
//       return NextResponse.json(
//         { message: "Email already registered" },
//         { status: 400 }
//       );
//     }

//     // 2. Create user account using Appwrite's Account API
//     const account = await AuthService.createAccount({
//       email,
//       password,
//       fullname: full_name,
//     });

//     if (!account || !account.$id) {
//       return NextResponse.json(
//         { message: "Failed to create user account" },
//         { status: 500 }
//       );
//     }

//     // // 3. Create a user document in your Appwrite DB to store phone, role, etc.
//     const userId = generateUserId(email)
//     const userDoc = await DatabaseService.createUserDocument({
//       id: userId,
//       fullname:full_name,
//       email,
//       phone,
//       password: await bcrypt.hash(password, 10),
//     });
//     console.log(userDoc);
    

//     // 4. Create a JWT token
//     const token = jwt.sign(
//       {
//         userId: account.$id,
//         email,
//         full_name,
//       },
//       process.env.JWT_SECRET || "",
//       { expiresIn: "720h" }
//     );

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Registration successful",
//         token,
//         user: {
//           id: account.$id,
//           email,
//           full_name,
//         },
//       },
//       { status: 201 }
//     );
//   } catch (error: unknown) {
//     console.error("Registration error:", error);
//     let errorMessage = "Unknown error";
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
//     return NextResponse.json(
//       { message: "Registration failed", error: errorMessage },
//       { status: 500 }
//     );
//   }
// }
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
          id: user.$id,
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
