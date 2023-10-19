"use client";

import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
//import { SetLoading } from "@/redux/loadersSlice";
import Loader from "@/components/Loader";
import { useForm, Controller } from "react-hook-form";

const Register = () => {
  
  const { handleSubmit, control, formState: { errors }} = useForm();
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // const handleUserTypeChange = (selectedUserType) => {
  //   setUser({ ...user, userType: selectedUserType });
  // };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/register", data);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     if(user?.email?.length > 0 && user?.password?.length > 0 && user?.username?.length > 0) {
  //         setButtonDisabled(false);
  //     } else {
  //         setButtonDisabled(true);
  //     }
  // }, [user]);

  return (
    <div className="max-w-md mx-auto p-6 place-items-center">
      <h1
        className="text-[24px] font-semibold mb-4 text-gray-100
      bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 "
      >
        JOBS-MELA REGISTRATION
      </h1>
      {loading && <div className="loading loading-spinner loading-lg"></div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-row gap-3">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-light-1 pr-[10px]">
                employee
              </span>

              <Controller
                name="userType"
                control={control}
                render={({ field }) => (
                  <input
                    type="radio"
                    value="employee"
                    className="radio checked:bg-red-500"
                    checked={field.value === "employee"}
                    onChange={() => field.onChange("employee")}
                  />
                )}
              />
            </label>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-light-1 pr-[10px]">
                employer
              </span>

              <Controller
                name="userType"
                control={control}
                render={({ field }) => (
                  <input
                    type="radio"
                    value="employer"
                    className="radio checked:bg-blue-500"
                    checked={field.value === "employer"}
                    onChange={() => field.onChange("employer")}
                  />
                )}  
              />
             
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="name"> Name: </label>
           <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <input
          type="text"
          id="name"
          {...field}
          placeholder="Enter Your name"
          
        />
      )}
      rules={{
        required: "Name is required",
      }}
    />
    <p className="mt-2 text-red-500 font-medium"> {errors.name && errors.name.message}</p>
        </div>
       
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email"> Email </label>
          <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <input
          type="email"
          id="email"
          className="form-input"
          {...field}
          placeholder="Email"
        />
      )}
      rules={{
        required: "Email is required",
      }}
    />
    <p className="mt-2 text-red-500 font-medium"> {errors.email && errors.email.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password"> Password </label>
          
          <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              type="password"
              id="password"
              className="form-input"
              {...field}
              placeholder="Password"
              minLength="8" // Minimum length of 8 characters
              maxLength="20" // Maximum length of 20 characters
            />
          )}
        />
        <p className="mt-2 text-red-500 font-medium"> 
        {errors.password &&
          (errors.password.type === "minLength"
            ? "Password must be at least 8 characters"
            : errors.password.type === "maxLength"
            ? "Password can be a maximum of 20 characters"
            : "Password is required")}
            </p>
        </div>

        <div className="mb-4">
          <button type="submit" className="bg-blue text-white px-4 py-2 rounded hover:bg-blue"  disabled={buttonDisabled}>
            Sign Up
          </button>
        </div>
      </form>

      <p className="text-gray-600 text-sm">
        Already have an account? <Link href="/login">Sign in here</Link>.
      </p>
    </div>
  );
};

export default Register;
