"use client"

import React,{useState, useEffect} from 'react'
import { useRouter, useParams } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import JobPostForm from "@/components/JobPostForm";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { SetCurrentUser } from "@/redux/usersSlice";
import { toast } from 'react-hot-toast';


const JobInfo = () => {

  const [jobData, setJobData] = useState(null);
  const { currentUser } = useSelector((state) => state.users);
  const [applications = [], setApplications] = useState([]);
  const { jobid } = useParams();
  const router = useRouter();
  // const {handleSubmit, register} = useForm(
  //   {
  //     defaultValues: async()=> {
  //       const response = await axios.get(`/api/jobs/${jobid}`);
  //       const currentdata = response.data.data;
  
  //       return {
  //         title: currentdata.title,
  //         description: currentdata.description,
  //         location: currentdata.location,
  //         experience:currentdata.experience,
  //         salaryFromRange:currentdata.salaryFromRange,
  //         salaryToRange:currentdata.salaryToRange,
  //         workMode:currentdata.workMode,
  //         jobType:currentdata.jobType,
  //         companyname:currentdata.companyname,
  //       };
  //     },
  //   });


  const [loading , setLoading] = useState(false);

  // const onSubmit = async(data)=> {
  //   try {
  //     data._id = jobid;
  //     setLoading(true);
  //     const response = await axios.put(`/api/jobs/${jobid}` , data);
  //     console.log(response.data.data);
  //     router.push("/jobs");

  //   } catch (error) {
  //     console.log(error);   
  //   }finally{
  //     setLoading(false);
  //   }
  //  }

   const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/jobs/${jobid}`);
      setJobData(response.data.data);
    } catch (error) {
      console.log(error);
     // message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/applications?job=${jobid}&user=${currentUser._id}`);
      setApplications(response.data.data);
    } catch (error) {
      console.log(error);
     // message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJob();
    fetchApplications();
  }, []);

  const onApply = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/applications`, {
        job: jobData._id,
        user: currentUser._id,
        status: "pending",
      });
      toast.success("Job applied successfully"); // Use toast.success
      //console.log(response);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


// Add this code to handle the 404 POST error
if (jobData === null) {
  return <div>404 Job Not Found</div>;
}

  return (

    jobData && (

    <div>
     <PageTitle title={jobData.title} />
    <div className="flex justify-between mt-1">
          <span className='text-light-1'>Company</span>
          <span className='text-light-1'>{jobData.companyname}</span>
        </div>

        <div className="flex justify-between mt-1">
          <span className='text-light-1'>Location</span>
          <span className='text-light-1'>{jobData.location}</span>
        </div>

        <div className="flex justify-between mt-1">
          <span className='text-light-1'>Salary</span>
          <span className='text-light-1'>
            {jobData.salaryFromRange} LPA - {jobData.salaryToRange} LPA
          </span>
        </div>

        <div className="flex justify-between mt-1">
          <span className='text-light-1'>Work Mode</span>
          <span className='text-light-1'>{jobData.workMode}</span>
        </div>

        <div className="flex justify-between mt-1">
          <span className='text-light-1'>Job Description</span>
          <div className="divider divider-vertical "></div> 
          <span className='text-light-1 '>{jobData.description}</span>
        </div>

        {applications.length > 0 && (
          <span className="my-6 warning-message text-light-1 bg-red-600"> You have already applied for this job</span>
       )}

        
        <div className="flex justify-end gap-2 mt-4">
              <button type="default"
               className='bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50 cursor-pointer'
              onClick={() => router.back()}>
                Cancel
              </button>
              <button
              className='bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50 cursor-pointer'
                type="default"
                onClick={() => router.push(`/userinfo/${jobData.user._id}`)}
              >
                View Company Info
              </button>

              <button
              className='bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50 cursor-pointer'
                type="primary"
                onClick={onApply}              
               disabled={ currentUser.userType === "employer" || applications.length > 0 }
              >
                Apply
              </button>
            </div>

    </div>
  )
  )
}

export default JobInfo