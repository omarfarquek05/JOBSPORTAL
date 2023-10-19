import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";


connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");
        
        
        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);
        
        //create token data
        const tokenData = {
            id: user._id,
            email: user.email,
        };
        //create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRECT, {expiresIn: "1d"})

      
    // Clone the response object before setting the cookies
    const response =  NextResponse.json({
        message: "Login successful",
        success: true,
      });
  
      response.cookies.set("token", token, {
        httpOnly: true,
      });
  
      return response;

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
     return NextResponse.json({message: "get from login"},{status:200});
}
