"use client"

import React,{useState,useEffect} from 'react'
import PageTitle from "@/components/PageTitle";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import moment from "moment";
import {toast} from 'react-hot-toast';

const Applications = ({ showApplications, setShowApplications, selectedJob}) => {
 
     const router = useRouter();
     const [applications, setApplications] = useState([]);
     const [loading, setLoading] = useState(false);
   
     const fetchApplications = async () => {
       setLoading(true);
       try {
         const response = await axios.get(`/api/applications?job=${selectedJob._id}`);
         setApplications(response.data.data);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     };
   
     const onStatusUpdate = async (applicationId, status) => {
       setLoading(true);
       try {
         const response = await axios.put(`/api/applications/${applicationId}`, {
           status,
         });
         toast.success("Status Updated successfully");
         fetchApplications();
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     };
   
     useEffect(() => {
       if (showApplications) {
         fetchApplications();
       }
     }, [showApplications]);
   
     return (
      <div className={`fixed z-10 inset-0 overflow-y-auto  ${showApplications ? "block" : "hidden"}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white">
            <div className="my-2">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-4">
                  Applications for {selectedJob.title}
                </h3>
                {loading ? (
                  <div className="loading loading-spinner loading-lg"></div>
                ) : (
                  <div className="overflow-x-auto xs:overflow-x-auto
                  bg-clip bg-gradient-to-r from-dark-1 to-blue text-yellow-200 rounded-md">
                    <table className="table table-xs table-pin-rows table-pin-cols ">
                      <thead>
                        <tr className='outline outline-offset-2 outline-2'>
                          <th className="py-2  pl-3">Applicant</th>
                          <th className="py-2 pl-11">Email</th>
                          <th className="py-2">Applied On</th>
                          <th className="py-2">Status</th>
                          <th className="py-2 pr-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((application) => (
                          <tr key={application._id}>
                            <td className="py-2 pl-3">{application.user.name}</td>
                            <td className="py-2 pr-3">{application.user.email}</td>
                            <td className="py-2 pr-3">
                              {moment(application.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td className="py-2">
                              <select
                                value={application.status}
                                onChange={(e) =>
                                  onStatusUpdate(application._id, e.target.value)
                                }
                                className="block w-full sm:w-auto bg-black"
                              >
                                <option value="pending">Pending</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="rejected">Rejected</option>
                                <option value="accepted">Accepted</option>
                              </select>
                            </td>
                            <td className="py-2"> 
                          <i onClick={() =>
                            router.push(`/userinfo/${application.user._id}`)
                          }  className="ri-file-user-line text-lime-50 pl-5 text-2xl"></i>                       
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <button
                  onClick={() => setShowApplications(false)}
                  className="mt-4 p-2 bg-red-500 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     );
}

export default Applications