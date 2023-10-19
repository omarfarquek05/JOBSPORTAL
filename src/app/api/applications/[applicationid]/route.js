import { validateJWT } from "@/jwtTokenValidation/validateJWT";
import { connectDB } from "@/config/dbConfig";
import  Application from "@/models/applicationModel";
import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/sendEmail";
import moment from "moment";


connectDB();

export async function PUT(request , { params }) {
    try {
        validateJWT(request); 

      const reqBody = await request.json();
      const  application = await Application.findByIdAndUpdate(params.applicationid , reqBody,
        {
        new: true,
        runValidators: true,
      })
      .populate("user")
      .populate({
        path: "job",
        populate: {
          path: "user",
        },
      });

      await sendEmail({
        to: application.user.email,
        subject: "Your application status has been updated",
        text: `Your application status has been updated to ${application.status}`,
        html: `<div>
        <p>Your application status has been updated to ${application.status}</p>
       
        <p>
         Company: ${application.job.user.name}
        </p>
      
        <p>
          Job Title: ${application.job.title}
        </p>
     
        <p>
          Applied On: ${moment(application.createdAt).format("DD/MM/YYYY")}
        </p>
     
        <p>Thank you for using JobsMela</p>
        </div>`,
      });

      return NextResponse.json({
        message: 'application updated successfully',
        data: application,
      });
        
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }