import { validateJWT } from "@/jwtTokenValidation/validateJWT";
import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";


connectDB();

export async function GET(request, { params }) {
    try {
        validateJWT(request);
      const user = await User.findById(params.userid).select("-password");
      if (!user) {
        throw new Error("No user found");
      }

      return NextResponse.json({
        message: 'UserInfo fetched successfully',
        data: user,
      });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
  