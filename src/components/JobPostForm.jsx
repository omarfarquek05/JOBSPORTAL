"use client"

import React from 'react'

const JobPostForm = ({ register,errors}) => {
  return (
    <div className=''>
    
    <div className="mb-4">
    <label htmlFor="title"  className="block text-light-1">Title</label>
    <input
    {...register("title")}
      className="w-full border border-gray-300 py-2 px-4 rounded text-dark-1 
      focus:border-blue-500 focus:outline-none"
      placeholder="Enter Title"
      required
      />

  </div>

  <div className=" mb-4">
    <label htmlFor="description" className="block text-light-1">Description</label>
    <textarea
      {...register("description", { required: true })}
      className="w-full border border-gray-300 py-2 px-4 rounded
       text-dark-1 focus:border-blue-500 focus:outline-none"
       placeholder="Enter Job Description"
       required
       />
  </div>

  <div className=" mb-4">
  <label className="block text-light-1" htmlFor="location">Location</label>
  <input {...register("location")} className='w-full border border-gray-300 py-2 px-4 rounded text-dark-1 
  focus:border-blue-500 focus:outline-none '
  placeholder="Enter Location"
  required />
</div>

<div className=" mb-4">
<label className="block text-light-1" htmlFor="companyname">Company Name</label>
<input {...register("companyname")} className='w-full border border-gray-300 py-2 px-4 rounded text-dark-1 
focus:border-blue-500 focus:outline-none '
placeholder="Enter company name"
required />
</div>

<div className=" mb-4">
<label className="block text-light-1" htmlFor="deadline"> DeadLine </label>
<input {...register("deadline")} className='w-full border border-gray-300 py-2 px-4 rounded text-dark-1 
focus:border-blue-500 focus:outline-none '
type="date"
placeholder="Enter Deadline date"
required />
</div>

<div className="mb-4">
      <label className="block text-light-1" htmlFor="experience">Experience</label>
      <input {...register("experience")}
       type= "number"
       className='w-full border border-gray-300 py-2 px-4 rounded text-dark-1 
       focus:border-blue-500 focus:outline-none'
       placeholder="Enter Experience"
       required />
    </div>

    <div className="mb-4">
    <label className="block text-light-1" htmlFor="salaryFromRange">Salary From Range</label>
    <input {...register("salaryFromRange")} 
    type= "number"
    className='w-full border border-gray-300 py-2 px-4 rounded text-dark-1 
    focus:border-blue-500 focus:outline-none'
    placeholder="Enter starting Salary To Range"
    required
    />
  </div>

  <div className="flex flex-col mr-4">
    <label className="block text-light-1" htmlFor="salaryToRange">Salary To Range</label>
    <input {...register("salaryToRange")} 
    type= "number"
    className='w-full border border-gray-300 py-2 px-4 rounded text-dark-1 
    focus:border-blue-500 focus:outline-none'
    placeholder="Enter ending Salary To Range"
    required
    />
   
  </div>

    {/*blank div*/}
  <div className="flex flex-row mb-4 mt-3">  

  <div className="flex flex-row mb-4">

 

    <div className="flex flex-col mr-4 mb-3 text-light-1"> 
    <select {...register("workMode")} className='text-dark-1'>
    <option disabled selected>Select Work Mode</option>
    <option value="remote" >Remote</option>
    <option value="office" >Office</option>
  </select>
    </div>

  <div className="flex flex-col mr-4 text-light-1">
      <select {...register("jobType")} className='text-dark-1'>
      <option disabled selected>Select Job Type </option>
        <option value="full-time" >Full Time</option>
        <option value="part-time" >Part Time</option>
        <option value="contract" >Contract</option>
      </select>
    </div>

    <div className="flex flex-col mr-4 text-light-1">
    <select {...register("jobCatagory")} className='text-dark-1'>
    <option disabled selected>Select Job Catagory </option>
    <option value="education">Education</option>
    <option value="It" >IT</option>
    <option value="non-it" >Non IT</option>
    <option value="Accountant" >Accountant</option>
    <option value="Financer" >Financer</option>
    <option value="Banker" >Banker</option>
    <option value="Contant-Writer" >Contant Writer</option>
    <option value="Bank" >Bank</option>
    <option value="web-developer" >web developer</option>
    <option value="software-engineer" >Software Engineer</option>
    <option value="Doctor" >Doctor</option>
    <option value="Translator" >Translator</option>
    <option value="Driver">Driver</option>
    <option value="Writter">Writter</option>
    </select>
  </div>

    </div>
  </div>
{/*
  <button
    type="submit"
    className="bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50"
  >
    Submit
  </button>
  
    */}
    </div>
  )
}

export default JobPostForm