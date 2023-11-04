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

        {loading ? (
          <button
            disabled
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            loging please wait...
          </button>
        ) : (
          <button
            type="submit"
            className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-blue"
          >
            Login
          </button>
        )}
          
        </div>
      </form>
      <p className="text-gray-600 text-sm">
        Not have an account? <Link href="/register">Signup here</Link>.
      </p>
    </div>
  );
};

export default Login;
