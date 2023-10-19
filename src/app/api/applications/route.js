import { validateJWT } from "@/jwtTokenValidation/validateJWT";
import { connectDB } from "@/config/dbConfig";
import  Application from "@/models/applicationModel";
import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/sendEmail";


connectDB();

export async function POST(request) {
    try {
        validateJWT(request);
      const reqBody = await request.json();
      const application = await Application.create({ ...reqBody});
     
      const applicationData = await Application.findById(application._id)
      .populate("user")
      .populate({
        path: "job",
        populate: {
          path: "user",
        },
      });

      await sendEmail({
        to: applicationData.job.user.email,
        subject: "New application received",
        text: `You have received a new application from ${applicationData.user.name}`,
        html: `<div>
        <p>You have received a new application from ${applicationData.user.name}</p>
        <p>Applicant's name is ${applicationData.user.name}</p>
        <p>Applicant's email: ${applicationData.user.email}</p>
        <p>Applicant's phone number: ${applicationData.user.phone}</p>
        </div>`,
      });

      return NextResponse.json({
        message: 'You have successfully applied for this job',
        data: applicationData,
      });
      
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  export async function GET(request) {
    try {
        validateJWT(request);

      //fetch query string
      const { searchParams } = new URL(request.url);
      const user = searchParams.get("user");
      const job = searchParams.get("job");

      const filtersObject = {};
       
      if (user) {
        filtersObject["user"] = user;
      }

      if (job) {
        filtersObject["job"] = job;
      }
       
       const application = await Application.find(filtersObject)
       .populate("user")
       .populate("job");

      return NextResponse.json({
        message: "jobs find successfully",
        data: application,
      });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  
