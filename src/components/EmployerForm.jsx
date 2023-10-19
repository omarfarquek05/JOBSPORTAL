"use client";

import React from 'react'

const EmployerForm = ({register, control,errors}) => {


  return (
    
    <div className="text-light-1">

    <div className="">
      <label className="block text-light-1" htmlFor="name"> Name </label>
      <input
        type="text"
        id="name"
        className="w-full border border-gray-300 py-2 px-4 
        rounded text-dark-1 focus:border-blue-500 focus:outline-none"
        {...register('name')}
        placeholder="Enter Your name"
        required
      />
    </div>

    <div className="mb-4">
      <label className="block text-light-1" htmlFor="email">  Email </label>
      <input
        type="email"
        id="email"
        className="form-input mt-1 block w-full rounded-md text-dark-1 pt-2
        border-indigo-200 border-x-indigo-500 focus:border-amber-500
         focus:ring focus:ring-lime-400"
        {...register('email')}
        placeholder="email"
        required
      />
    </div>


    <div className="mb-4">
    <label className="block text-light-1" htmlFor="phone"> Phone Number </label>
    <input
      type="number"
      id="phone"
      className="form-input mt-1 block w-full rounded-md text-dark-1 pt-2
      border-indigo-200 border-x-indigo-500 focus:border-amber-500
       focus:ring focus:ring-lime-400"
       {...register('phone', {
        required: 'Phone Number is required',
        pattern: {
          value: /^\d{11}$/,
          message: 'Phone number must be 11 digits',
        },
      })}
      placeholder="Enter 11 digit phone number"
    />
    <p className="mt-2 text-red-500 font-medium">
          {errors.phone && errors.phone.message}
        </p>
  </div>


  <div className="mb-4">
  <label className="block text-light-1" htmlFor="establishmentYear">  Establishment Year </label>
  <input
    type="number"
    id="establishmentYear"
    className="form-input mt-1 block w-full rounded-md text-dark-1 pt-2
    border-indigo-200 border-x-indigo-500 focus:border-amber-500
     focus:ring focus:ring-lime-400"
     {...register('establishmentYear', {
      required: 'Establishment Year is required',
      validate: (value) => {
        // Custom validation function for Establishment Year
        const currentYear = new Date().getFullYear();
        if (value && value >= 1900 && value <= currentYear) {
          return true; // Valid year
        }
        return 'Enter a valid year between 1900 and the current year';
      },
    })}
    placeholder="Establishment Year"
    
  />
  {errors?.establishmentYear && (
    <p className="mt-2 text-red-500 font-medium">
      {errors.establishmentYear.message}
    </p>
  )}
</div>


<div className="mb-4">
<label className="block text-light-1" htmlFor="website"> website Name </label>
<input
  type="text"
  id="website"
  className="form-input mt-1 block w-full rounded-md text-dark-1 pt-2
  border-indigo-200 border-x-indigo-500 focus:border-amber-500
   focus:ring focus:ring-lime-400"
  {...register('website')}
  placeholder="Enter website Name"
/>
</div>


<div className="mb-4">
<label className="block text-light-1" htmlFor="companySize"> No Of Employees </label>
<input
  type="number"
  id="companySize"
  className="form-input mt-1 block w-full rounded-md text-dark-1 pt-2
  border-indigo-200 border-x-indigo-500 focus:border-amber-500
   focus:ring focus:ring-lime-400"
  {...register('companySize')}
  placeholder="Enter No Of Employees"
/>
</div>


<div className="mb-4">
<label className="block text-light-1" htmlFor="address"> Address </label>
<textarea
  type="text"
  id="address"
  className="textarea textarea-primary textarea-lg  text-dark-1 pt-5
  block w-full rounded-md border-indigo-200 border-x-indigo-500 focus:border-amber-500
  focus:ring focus:ring-lime-400"
  {...register('address', { required: 'Address is required' })}
  placeholder="Enter your address"
/>

{errors?.address && (
  <p className="mt-2 text-red-500 font-medium">
    {errors.address.message}
  </p>
)}
</div>


<div className="mb-4">
<label className="block text-light-1" htmlFor="about"> About </label>
<textarea
  type="text"
  id="about"
  className="textarea textarea-primary textarea-lg  text-dark-1 pt-5
  block w-full rounded-md border-indigo-200 border-x-indigo-500 focus:border-amber-500
  focus:ring focus:ring-lime-400"
  {...register('about', { required: 'About is required' })}
  placeholder="Tell about your company"
/>
{errors?.about && (
  <p className="mt-2 text-red-500 font-medium">
    {errors.about.message}
  </p>
)}
</div>

    </div>
  )
}

export default EmployerForm