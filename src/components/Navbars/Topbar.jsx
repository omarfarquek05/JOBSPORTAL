"use client"

import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "@/redux/usersSlice";
import Loader from "@/app/Loader";
import { SetLoading } from "@/redux/loadersSlice";


const Topbar = () => {


  
  const router = useRouter();
  const pathname = usePathname();
  
 // const { currentUser } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.loaders);
  const dispatch = useDispatch();
  

  const onLogout = async()=> {
     
    try {
      dispatch(SetLoading(true));
      await axios.post("/api/users/logout");
      toast.success('Logout successful')
      router.push("/login");
    } catch (error) {
      toast.error(error.message)
    } finally {
      dispatch(SetLoading(false));
    }
  }

  return (
    <nav className='topbar backdrop-blur-sm bg-white/30'>
   
    <Link href='/' className='flex items-center '>
        <Image src='/light1.svg' alt='logo' width={40} height={40} />
        <p className='text-heading3-bold text-indigo-600'><b>JOBS MELA</b></p>
      </Link>
  
      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>
        {loading && <Loader />}
          <button href="/signout" onClick={onLogout}>   
         <div className='flex cursor-pointer'>
                <Image
                  src='/assets/logout.svg'
                  alt='logout'
                  width={24}
                  height={24}
                />
              </div>       
          </button>
        </div>
        </div>


    </nav>
  )
}

export default Topbar