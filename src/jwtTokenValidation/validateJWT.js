import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const validateJWT = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SECRECT);
    return decodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};




{/*
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const validateJWT = async(request)=> {

    try {
        const token = request.cookies.get("token")?.value;
   
        if (!token) {
      throw new Error("No token found");
    }
    const decodedData = await jwt.verify(token, process.env.JWT_SECRECT);
    
    return decodedData.userId;

    } catch (error) {
        return NextResponse.json({message:"request error from jwt validate "  }, { status: 500 });
    }

}


*/}

