"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentUser } from "@/redux/usersSlice";
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Replace with your actual toast library
import Loader from '../Loader';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const Resume = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  // Define the fetchUser function inside the component
  const fetchUser = async () => {
    try {
        setLoading(true);
      const response = await axios.get("/api/users/currentuser");
      // Update the Redux store with the user data
      dispatch(SetCurrentUser(response.data));
    } catch (error) {
      console.error(error);
      toast.error("Error fetching user info"); // Use your toast library here
    } finally {
        setLoading(false);
    }
  };

  // Use useEffect to fetch the user data when the component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='text-light-1'>
    {loading ? (
        <Loader/>
      ) :(

    <div className="container mx-auto max-w-screen-md text-lime-50">
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="flex flex-row items-center justify-center">
      {/* */}
      <Image
      src={ currentUser?.profile}
      alt="User Image"
      width={100}
      height={100}
      className="rounded-full ring ring-indigo-600 hover:ring-blue-500 object-contain xm:object-scale-down md:object-scale-down "
    />
   
        <div className="ml-5">
          <h3 className="text-2xl font-medium pr-3">{currentUser?.name }</h3>
          <h3 className="text-2xl font-medium pr-3"><i class="ri-mail-line mr-2"></i>{currentUser?.email}</h3>
          <h4 className="text-xl font-light"><i class="ri-phone-line mr-2"></i>{currentUser?.phone}</h4>
          <h4 className="text-xl font-light"><i class="ri-map-pin-fill mr-2"></i>{currentUser?.address}</h4>
        </div>
      </div>
    </div>

    <div className="mt-3">
      <h2 className="text-2xl font-bold mb-2">Career Objective</h2>
      <p className="text-xl font-light">{currentUser?.careerObjective}</p>
    </div>

    <div className="mt-2">
      <h2 className="text-2xl font-bold mb-1"><i className="ri-graduation-cap-fill mr-2"></i>Education</h2>
      <ul className="list-disc ml-5">
        {currentUser?.education?.map((item, index) => (
          <li key={index}>Degree: {item.qualification} <br/> 
         institution Name : {item.institution} <br/>
          CGPA : {item.cgpa}</li>
        ))}
      </ul>
    </div>

    <div className="mt-2">
      <h2 className="text-2xl font-bold mb-1"><i className="ri-list-settings-fill mr-2"></i>Skills</h2>
      <ul className="list-disc ml-5">
        {currentUser?.skills?.map((item, index) => (
          <li key={index}> Technology : {item.technology} <br/>
          Rating : {item.rating}</li>
        ))}
      </ul>
    </div>

    <div className="mt-2">
      <h2 className="text-2xl font-bold mb-1"><i className="ri-file-user-line mr-2"></i>Experience</h2>
      <ul className="list-disc ml-5">
        {currentUser?.experience?.map((item, index) => (
          <li key={index}> Company Name : {item.company} <br/>
         Role : {item.role} <br/>
          Year : {item.period}</li>
        ))}
      </ul>
    </div>
    <div className="mt-1">
      <h2 className="text-2xl font-bold mb-1"><i className="ri-file-shield-line mr-2"></i> Project Details </h2>
      <ul className=" ml-5">
        {currentUser?.project?.map((item, index) => (
          <li key={index}>Project Name: {item.name} <br/>
          Project Description: {item.description} <br/>
          Project Link: {item.link} </li>
         
        ))}
      </ul>
    </div>
    </div>
    
    )}
    <button type="button" className="bg-indigo-800 text-white px-2 py-1 rounded-md 
    ml-9 mt-5 outline outline-gray-50 cursor-pointer" 
    onClick={()=> router.back()}> Edit </button>
  </div>


  );
};

export default Resume;
