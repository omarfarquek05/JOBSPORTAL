import {NextResponse} from "next/server";

export async function POST() {
  
  try {
    // Create a new NextResponse object.
    const response = NextResponse.json({
      message: "Logout Successfully",
    }, { status: 200 });
  
    // Remove the cookie
    response.cookies.set("token", "", { maxAge: 0 });
  
    return response;
  } catch (error) {
    // Log the error message to the console.
    //console.error(error.message);
 
    // Return a 500 Internal Server Error response.
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}