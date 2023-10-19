import { validateJWT } from "@/jwtTokenValidation/validateJWT";
import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";


connectDB();

export async function GET(request) {
    try {
      const userId = await validateJWT(request);
      const user = await User.findOne({ _id: userId }).select('-password');

      if (!user) {
        throw new Error("No user found");
      }

      return NextResponse.json({
        message: 'User data fetched successfully',
        data: user,
      });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
  