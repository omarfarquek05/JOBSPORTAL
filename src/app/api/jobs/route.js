import { validateJWT } from "@/jwtTokenValidation/validateJWT";
import { connectDB } from "@/config/dbConfig";
import  Job from "@/models/jobModel";
import { NextResponse } from "next/server";


connectDB();

export async function POST(request) {
    try {
      const userId = await validateJWT(request);
      const reqBody = await request.json();
      const job = await Job.create({ ...reqBody, user: userId });

      return NextResponse.json({
        message: 'job created successfully',
        data: job,
      });
      
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  export async function GET(request) {
    try {
        validateJWT(request);

      
     
    // fetch query string parameters
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");

    //fetch query string
    const searchText = searchParams.get("searchText");
    const location = searchParams.get("location");
    const jobCatagory = searchParams.get("jobCatagory");

      const filtersObject = {};
      if (user) {
        filtersObject["user"] = user;
      }
  
    
      if (searchText && searchText !== "") {
        filtersObject["title"] = { $regex: searchText, $options: "i" };
      }
  
        //search location
      if (location && location !== "") {
        filtersObject["location"] = { $regex: location, $options: "i" };
      }

       // job Catagory
    if ( jobCatagory  &&  jobCatagory!== "") {
      filtersObject["jobCatagory"] = { $regex: jobCatagory, $options: "i" };
    }

      const jobs = await Job.find(filtersObject).populate("user");
      
      return NextResponse.json({
        message: "jobs find successfully",
        data: jobs,
      });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  
