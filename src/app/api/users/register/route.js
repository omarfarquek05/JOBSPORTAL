import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
        
    try {
        const reqBody = await request.json();
    
        // check if user already exists
        const user = await User.findOne({ email: reqBody.email });
        if (user) {
          throw new Error("User already exists");
        }
    
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        reqBody.password = hashedPassword;
    
        // create user
        await User.create(reqBody);
        return NextResponse.json(
          { message: "User created successfully", success: true },
          { status: 201 }
        );

        } catch (error) {
            return NextResponse.json({message:"Post request error "  }, { status: 500 });
        }
}

// export async function GET() {
//           return NextResponse.json({message:"this is get "}, {status:200})
    
// }