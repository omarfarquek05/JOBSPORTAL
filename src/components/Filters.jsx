"use client";

import React from 'react'

const Filters = ({ filters, setFilters, getData }) => {

  return (
   <div className="flex  gap-3 my-3 items-end max-xs:flex-col max-xs:items-start max-sm:flex-col max-sm:items-start">
      <div>
        <span className='text-light-1 pr-2'>Search : </span>
        <input className='text-dark-1 rounded'
          type="text"
          value={filters.searchText}
          onChange={(e) =>
            setFilters({ ...filters, searchText: e.target.value })
          }
          placeholder="Search Jobs"
        />
      </div>

      <div>
        <span className='text-light-1 pr-2'>Location</span>
        <select value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
         className='text-dark-1'
            >
          <option value="">Select Location</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
        </select>
      </div>

      <div>
        <span className='text-light-1 pr-2'>Job Catagory</span>
        <select value={filters.jobCatagory}
            onChange={(e) => setFilters({ ...filters, jobCatagory: e.target.value })}
         className='text-dark-1'
            >
          <option value="">Select Job Catagory</option>
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


      <button type="primary" onClick={getData}
       className='bg-blue text-white px-2 py-1 rounded hover:bg-blue'>
        Filter
      </button>
    </div>
  )
}

export default Filters