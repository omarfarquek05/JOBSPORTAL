import { validateJWT } from "@/jwtTokenValidation/validateJWT";
import { connectDB } from "@/config/dbConfig";
import  Job from "@/models/jobModel";
import { NextResponse } from "next/server";


connectDB();

  export async function GET(request , { params }) {
    try {
        validateJWT(request); 
      const job = await Job.findById( params.jobid).populate("user");

      return NextResponse.json({
        message: 'update page  job fetch successfully',
        data: job,
      });

    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }


  export async function PUT(request , { params }) {
    try {
        validateJWT(request); 

      const reqBody = await request.json();
      const job = await Job.findByIdAndUpdate(params.jobid , reqBody,{
        new: true,
        runValidators: true,
      });

      return NextResponse.json({
        message: 'job updated successfully',
        data: job,
      });
        
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }


  export async function DELETE(request , { params }) {
    try {
        validateJWT(request); 
      const job = await Job.findByIdAndDelete((params.jobid));

      return NextResponse.json({
        message: 'job Deleted successfully',
        data: job,
      });
        
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  
  