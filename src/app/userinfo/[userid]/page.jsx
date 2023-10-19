"use client"

import React,{useState, useEffect} from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";
import axios from "axios";
import PageTitle from "@/components/PageTitle";
import EmployerInfo from "@/components/EmployerInfo";
import EmployeeInfo from "@/components/EmployeeInfo";


const UserInfo = () => {

  const [userInfo, setUserInfo] = useState(null);
  const { userid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();


  const fetchUserInfo = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/users/${userid}`);
      setUserInfo(response.data.data);
    } catch (error) {
       console.log(error);
      // message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  console.log(fetchUserInfo);

  return (
  
    userInfo && (
      <div>
        <PageTitle
          title={`${
            userInfo.userType === "employer" ? "Employer" : "Employee"
          } Info`}
        />
        <hr className="border-t-2 border-light-1 my-3 md:hidden " />
        {userInfo.userType === "employer" ? (
          <EmployerInfo employerInfo={userInfo} />
        ) : (
          <EmployeeInfo
            employeeInfo={userInfo}
          />
        )}
        <button type="default"
        className='bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 mt-3
         outline outline-gray-50 cursor-pointer'
       onClick={() => router.back()}>
        Back
       </button>
      </div>
      
    )
    );
    
  
}

export default UserInfo