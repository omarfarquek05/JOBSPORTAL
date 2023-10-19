"use client";

import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";
import PageTitle from "@/components/PageTitle";
import JobPostForm from '@/components/JobPostForm';
import Loader from '@/components/Loader';
import moment from "moment";
import { SetCurrentUser } from "@/redux/usersSlice";
import { useSelector, useDispatch } from 'react-redux'
import Applications from '@/components/Applications';
import { toast } from 'react-hot-toast';

const Jobs = () => {

  const router = useRouter();
  const [loading , setLoading] = useState(false);
  const [jobs , setJobs] = useState([]);

  const [selectedJob, setSelectedJob] = useState({});
  const [showApplications, setShowApplications] = useState(false);
   

  const { currentUser } = useSelector((state) => state.users);

    const fetchJobs = async ()=> {
      try {
        setLoading(true);
        const response = await axios.get(`/api/jobs?user=${currentUser._id}`);
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
    },[])

    // const columns = [
    //   {
    //     title: "Title",
    //     dataIndex: "title",
    //   },
    //   {
    //     title: "Posted On",
    //     dataIndex: "createdAt",
    //    // render: (text: any) => moment(text).format("DD-MM-YYYY HH:mm:ss"),
    //   },
    //   {
    //     title: "Location",
    //     dataIndex: "location",
    //   },
    //   {
    //     title: "Job Type",
    //     dataIndex: "jobType",
    //   },
    //   {
    //     title: "Work Mode",
    //     dataIndex: "workMode",
    //   },
    //   {
    //     title: "Experience",
    //     dataIndex: "experience",
    //   },
       
    //   {
    //     title: "Actions",
    //   },
  
    //  ];
   
    const deleteJob = async (jobId) => {
      try {
        setLoading(true);
        const response = await axios.delete(`/api/jobs/${jobId}`);
        toast.success("Job Deleted successfully");
        fetchJobs();
      } catch (error) {
        toast.message.error(error.message);
      } finally {
        setLoading(false);
      }
    };


  return (
    <div className=''>
    {loading && <div className="loading loading-spinner loading-lg"></div>}
    <div className="flex justify-between items-center">
        <PageTitle title="Jobs" />
        <button type="button"
        className='bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50'
        onClick={() => router.push("/jobs/new")}>
          New Job
        </button>
    </div>
       
   {/*table*/}
   <div className="my-2">
   <table className="min-w-full divide-y divide-gray-100">
     <thead>
       <tr>
         <th scope="col" className="px-6 py-3 bg-dark-1 text-left text-xs font-medium text-light-1 uppercase tracking-wider">
           Title
         </th>
         <th scope="col" className="px-6 py-3 bg-dark-1 text-light-1 text-left text-xs font-medium  uppercase tracking-wider">
           Posted On
         </th>
         <th scope="col" className="px-6 py-3 bg-dark-1 text-light-1 text-left text-xs font-medium  uppercase tracking-wider">
           Location
         </th>
         <th scope="col" className="px-6 py-3 bg-dark-1 text-light-1 text-left text-xs font-medium  uppercase tracking-wider">
           Job Type
         </th>
         <th scope="col" className="px-6 py-3 bg-dark-1 text-light-1 text-left text-xs font-medium  uppercase tracking-wider">
           Work Mode
         </th>
         <th scope="col" className="px-6 py-3 bg-dark-1 text-light-1 text-left text-xs font-medium  uppercase tracking-wider">
           Experience
         </th>
         <th scope="col" className="px-6 py-3 bg-dark-1 text-light-1 text-left text-xs font-medium uppercase tracking-wider">
           Actions
         </th>
       </tr>
     </thead>
     <tbody className="bg-dark-1 divide-y divide-light-1">
       {jobs.map((job) => (
         <tr key={job._id}>
           <td className="px-6 py-4 whitespace-nowrap text-light-1">{job.title}</td>
           <td className="px-6 py-4 whitespace-nowrap text-light-1">{moment(job.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
           <td className="px-6 py-4 whitespace-nowrap text-light-1">{job.location}</td>
           <td className="px-6 py-4 whitespace-nowrap text-light-1">{job.jobType}</td>
           <td className="px-6 py-4 whitespace-nowrap text-light-1">{job.workMode}</td>
           <td className="px-12 py-4 whitespace-nowrap text-light-1 ">{job.experience}</td>
           <td className="px-6 py-4 whitespace-nowrap text-light-1">
             <div className="flex gap-3">
             
               <div className="tooltip tooltip-primary" data-tip="Delete">
               <button className="btn text-light-1">
               <i className="ri-delete-bin-6-line text-white-1" onClick={() => deleteJob(job._id)}></i>
               </button>
             </div>
            
              <div className="lg:tooltip" data-tip="Edit">
              <button className="btn">
              <i className="ri-pencil-line" onClick={() => router.push(`/jobs/edit/${job._id}`)}></i>
              </button>
            </div>

           <div className="lg:tooltip" data-tip="Applications">
              <button className="btn">
              <i className="ri-file-list-3-line" onClick={() =>   {
                setSelectedJob(job); 
                setShowApplications(true); 
              }}>
              </i>
              </button>
            </div>
              
             </div>
           </td>
         </tr>
       ))}
     </tbody>
   </table>
 </div>

 {showApplications && (
  <Applications
    selectedJob={selectedJob}
    setShowApplications={setShowApplications}
    showApplications={showApplications}
  />
)}
   
    </div>
  )
}

export default Jobs