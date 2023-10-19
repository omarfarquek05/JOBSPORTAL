"use client";

import React,{useState, useEffect} from "react";
import Link from "next/link";
import axios from "axios";

import { toast } from 'react-hot-toast';
import {useRouter} from "next/navigation";
import { useForm, Controller } from 'react-hook-form';

const Login = () => {

  const { handleSubmit, control, formState: { errors } } = useForm();
    
      const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', data);
      toast.success(response.data.message);
      router.push('/');
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 place-items-center">
      <h1 className="text-[24px] font-semibold mb-4 text-gray-100
      bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 ">
       JOBS-MELA Login</h1>
    
       {loading && <div className="loading loading-ring loading-lg"></div>}
       
      <form  onSubmit={handleSubmit(onSubmit)}>
        
        <div className="mb-4">
          <label className="block text-light-1" htmlFor="email">Email:</label>
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
          <label className="block text-light-1" htmlFor="password">Password:</label>
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
        />
      )}
      rules={{
        required: "Password is required",
      }}
    />
    <p className="mt-2 text-red-500 font-medium"> {errors.password && errors.password.message}</p>
        </div>
        <div className="mb-4">
          <button type="submit" disabled={buttonDisabled}
            className="bg-blue text-white px-4 py-2 rounded hover:bg-blue"
          >
            Login
          </button>
        </div>
      </form>
      <p className="text-gray-600 text-sm">
        Not have an account? <Link href="/register">Signup here</Link>.
      </p>
    </div>
  );
};

export default Login;
