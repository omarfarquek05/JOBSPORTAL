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

              {loading ? (
                <button
                  disabled
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  appling please wait...
                </button>
              ) : (
                <button
              className='bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50 cursor-pointer'
                type="primary"
                onClick={onApply}              
                disabled={
                  currentUser.userType === "employer" || applications.length > 0
                }
              >
                Apply
              </button>
              )}

             
            </div>

    </div>
  )
  )
}

export default JobInfo