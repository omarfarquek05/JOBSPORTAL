"use client"

import React,{useState} from 'react'
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import PageTitle from "@/components/PageTitle";
import JobPostForm from '@/components/JobPostForm';
import { useForm } from 'react-hook-form';
//import Loader from '@/components/Loader';
import { toast } from 'react-hot-toast';


const EditJob = () => {

  const [jobData, setJobData] = useState(null);
  
  const { jobid } = useParams();
  const router = useRouter();
  const {handleSubmit, register} = useForm(
    {
      defaultValues: async()=> {
        const response = await axios.get(`/api/jobs/${jobid}`);
        const currentdata = response.data.data;
  
        return {
          title: currentdata.title,
          description: currentdata.description,
          location: currentdata.location,
          experience:currentdata.experience,
          salaryFromRange:currentdata.salaryFromRange,
          salaryToRange:currentdata.salaryToRange,
          workMode:currentdata.workMode,
          jobType:currentdata.jobType,
          companyname:currentdata.companyname,
          deadline:currentdata.deadline,
          jobCatagory:currentdata.jobCatagory,

        };
      },
    });

  const [loading , setLoading] = useState(false);

  const onSubmit = async(data)=> {
    try {
      data._id = jobid;
      setLoading(true);
      const response = await axios.put(`/api/jobs/${jobid}` , data);
      toast.success("Job Post updated successfully");
      //console.log(response.data.data);
      router.push("/jobs");

    } catch (error) {
      console.log(error);   
    }finally{
      setLoading(false);
    }
   }

   const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/jobs/${jobid}`);

      const currentdata = response.data.data;
      toast.success(response.data.message);
      setJobData(response.data.data);
     
    } catch (error) {
      toast.message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJob();
  }, []);


  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Edit Job" />
        <button type="button"  className="bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50"
          onClick={() => router.back()} >
          Back
        </button>
      </div>

      {loading && <div className="loading loading-spinner loading-lg"></div>}

      <form onSubmit={handleSubmit(onSubmit)} >
        <JobPostForm register={register} />

        <div className="">
          <button
            type="default"
            onClick={() => router.back()}
            className="bg-indigo-800 text-white px-2 py-1 
            mr-4 rounded-md  outline outline-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            htmltype="submit"
            className="bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50"
          >
            Update Job
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditJob

