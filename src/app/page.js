"use client"


//import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";
import PageTitle from "@/components/PageTitle";
import JobPostForm from '@/components/JobPostForm';
import Loader from '@/app/Loader';
import { SetCurrentUser } from "@/redux/usersSlice";
import { useSelector, useDispatch } from 'react-redux'
import Filters from '@/components/Filters';
import moment from 'moment';
import Footer from '@/components/Footer';


export default function Home() {
   
 
  const [filters, setFilters] = useState({
    searchText: "",
    location: "",
    jobCatagory: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const [jobs = [], setJobs] = useState([]);
  const [loading , setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.users);
 
    const fetchJobs = async ()=> {
      try {
        setLoading(true);
        const response = await axios.get(`/api/jobs`, { params: filters });
        setJobs(response.data.data); 
        console.log(response.data.data)
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

    useEffect(()=> {
         fetchJobs();
    },[filters])

    const filterJobsByDeadline = () => {
      const currentDate = moment();
      const filteredJobs = jobs.filter((job) => moment(job.deadline) >= currentDate);
      return filteredJobs;
    };
  
    const filteredJobs = filterJobsByDeadline();


  return (
    
    <main className="text-light-1">
    {loading ? (
      <Loader/>
    ) : (<>
      
      
    <h1 className='text-3xl  mb-1 text-gray-100 
    bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-indigo-500
     text-center pb-2'>
     <b>Welcome To Jobs Mela</b></h1>
     
    <hr className='border-dashed border-auto border-indigo-200 pb-3'/>
       
     <div className=''>
     <Filters filters={filters} setFilters={setFilters} getData={fetchJobs} />
     </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 pb-9">
  {filteredJobs.map((job) => (
    <div className="p-2 border border-white rounded-md shadow-lg shadow-indigo-500/50
     hover:shadow-blue hover:scale-105 hover:bg-violet-800 duration-300 cursor-pointer" 
    key={job._id} onClick={() => router.push(`/jobinfo/${job._id}`)}>
     
    <div className="card flex flex-col gap-2 cursor-pointer p-2">
        <h1 className="text-lg text-light-1"><b>{job.title}</b></h1>

        <div className="flex justify-between">
          <span className='text-light-1'>Company</span>
          <span className='text-light-1'>{job.companyname}</span>
        </div>
        <div className="flex justify-between">
          <span className='text-light-1'>Location</span>
          <span className='text-light-1'>{job.location}</span>
        </div>

        <div className="flex justify-between">
          <span className='text-light-1'>Salary</span>
          <span className='text-light-1'>
            {job.salaryFromRange} LPA - {job.salaryToRange} LPA
          </span>
        </div>

        <div className="flex justify-between">
          <span className='text-light-1'>job Catagory</span>
          <span className='text-light-1'>{job.jobCatagory}</span>
        </div>

        <div className="flex justify-between">
          <span className='text-light-1'>Work Mode</span>
          <span className='text-light-1'>{job.workMode}</span>
        </div>
        
        <div className="flex justify-between mt-1">
          <span className='text-light-1'>Job Dead Line </span>
          <span className='text-light-1'>{moment(job.deadline).format('DD/MM/YYYY')}</span>
        </div>

      </div>
    </div>
  ))}
</div>
   <hr className='border-dashed border-auto  border-b-indigo-500 pb-3'/>

   
      <Footer/>

      </> )}
    </main>
   
    
  )
}
