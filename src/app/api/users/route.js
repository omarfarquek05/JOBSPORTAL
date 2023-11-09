import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { validateJWT } from "@/jwtTokenValidation/validateJWT";


connectDB();
export async function PUT(req) {
    try {
      // Validate the JWT token in the request.
      await  validateJWT(req);
  
      // Get the request body from the request.
      const reqBody = await req.json();

       // Convert the image URL to a string.
    if (reqBody.profile) {
      reqBody.image = JSON.stringify(reqBody.profile);
    }
  
      // Find the user by ID and update their data with the request body.
      const updateUser = await User.findByIdAndUpdate(reqBody._id, reqBody, {
        new: true,
      }).select("-password");
  
      // Return a success response.
      return NextResponse.json({
        message: "User data updated successfully",
        data: updateUser,
      });

    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }
  }