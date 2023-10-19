"use client"

import React,{useState,useEffect} from 'react'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "@/components/Loader";
import { SetCurrentUser } from "@/redux/usersSlice";
import { useSelector, useDispatch } from 'react-redux'


const Buttombar = () => {

  const pathname = usePathname();

  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
   const router = useRouter();
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


  return (
    <section className='bottombar'>

    <div className='bottombar_container'>
      {menuItems.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;

        return (
          <Link
            href={link.route}
            key={link.label}
            className={`bottombar_link ${isActive && "bg-primary-500"}`}
          >
            <Image
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className='object-contain'
            />

            <p className='text-subtle-medium text-light-1 max-sm:hidden'>
              {link.label.split(/\s+/)[0]}
            </p>
          </Link>
        );
      })}
    </div>
  </section>
  );
}

export default Buttombar