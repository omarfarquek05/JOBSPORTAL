"use client"

import React,{useState} from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";
import PageTitle from "@/components/PageTitle";
import JobPostForm from '@/components/JobPostForm';
import { useForm,Controller } from 'react-hook-form';
import Loader from '@/components/Loader';

const NewJob = () => {
  
  const router = useRouter();
  const {handleSubmit, register,control, formState: { errors }} = useForm();
  const [loading , setLoading] = useState(false);

   const onSubmit = async(data)=> {

    try {
      setLoading(true);
      const response = await axios.post("/api/jobs" , data);
      console.log(response.data.data);
      router.push("/jobs");
    } catch (error) {
      console.log(error);   
    }finally{
      setLoading(false);
    }
   }

  
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="New Job" />
        <button
          type="button"
          className="bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
      
      <h1>{loading ? <Loader /> : ' '}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <JobPostForm register={register} errors={errors}   />
   
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
            Post Job
          </button>
        </div>  
      
      </form>

      
    </div>
  );
}

export default NewJob