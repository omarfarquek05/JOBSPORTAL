"use client"

import React,{useState,useEffect} from 'react'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
//import { sidebarLinks } from "@/constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "@/app/Loader";
import { SetCurrentUser } from "@/redux/usersSlice";
import { useSelector, useDispatch } from 'react-redux'


const Leftbar = () => {

  //cng
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
 

  const router = useRouter();
  const pathname = usePathname();
  const [loading,setLoading] = useState(false);
 

  const [menuItems, setMenuItems] = useState([
    {
      imgURL: "/assets/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/assets/user.svg",
      route: "/profile",
      label: "Profile",
    },
    {
      imgURL: "/assets/create.svg",
      route: "/applications",
      label: "Applications",
    },
    {
      imgURL: "/assets/search.svg",
      route: "/search",
      label: "Search",
    },
    {
      imgURL: "/assets/heart.svg",
      route: "/activity",
      label: "Activity",
    },
    
    {
      imgURL: "/assets/community.svg",
      route: "/communities",
      label: "Communities",
    },
  ])

  const getUser = async () => {
    try {
      const response= await axios.get("/api/users/currentuser");
      const isEmployer = response.data.data.userType === "employer";

      if (isEmployer) {
        setMenuItems((prevMenuItems) => {
          const updatedMenuItems = [...prevMenuItems];
          updatedMenuItems[2].label = "Posted Jobs";
          updatedMenuItems[2].route = "/jobs";
          return updatedMenuItems;
        });
      }
  dispatch(SetCurrentUser(response.data.data));
     
    } catch (error) {
      // toast.message.error(error.reponse.message || error.message);
      console.log(error);
    }
  };

  useEffect(()=> {
    if (pathname !== "/login" && pathname !== "/register" && !currentUser) {
      getUser();
    }
        
  },[pathname])

 

  const onLogout = async()=> {
     
    try {
      setLoading(true);
      await axios.post("/api/users/logout");
      toast.success('Logout successful')
      router.push("/login");
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className='custom-scrollbar leftsidebar'>
    
    {loading && <Loader />}

    <div className='flex w-full flex-1 flex-col gap-6 px-6'>
    {menuItems.map((link) => {
      const isActive =
        (pathname.includes(link.route) && link.route.length > 1) ||
        pathname === link.route;

      return (
        <Link
          href={link.route}
          key={link.label}
          className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
        >
          <Image
            src={link.imgURL}
            alt={link.label}
            width={24}
            height={24}
          />

          <p className='text-light-1 max-lg:hidden'>{link.label}</p>
        </Link>
      );
    })}
  </div>

  <div className='mt-10 px-6'>
    <button href="/logout" onClick={onLogout}>
          <div className='flex cursor-pointer gap-4 p-4'>
          <Image
            src='/assets/logout.svg'
            alt='logout'
            width={24}
            height={24}
          />
          <p className='text-light-2 max-lg:hidden'>Logout</p>
        </div>
        </button>
  </div>
</section>
);

}

export default Leftbar