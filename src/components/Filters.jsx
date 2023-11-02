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
          <option value="Chittagong">Chittagong</option>
          <option value="Cox's Bazar">Cox's Bazar</option>
          <option value="Dhaka">Dhaka</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          <option value="Bagerhat">Bagerhat</option>
          <option value="Bandarban">Bandarban</option>
          <option value="Barguna">Barguna</option>
          <option value="Barisal">Barisal</option>
          <option value="Bhola">Bhola</option>
          <option value="Bogra">Bogra</option>
          <option value="Brahmanbaria">Brahmanbaria</option>
          <option value="Chandpur">Chandpur</option>
          <option value="Chapainawabganj">Chapainawabganj</option> 
          <option value="Chuadanga">Chuadanga</option>
          <option value="Comilla">Comilla</option>
          <option value="Dinajpur">Dinajpur</option>
          <option value="Faridpur">Faridpur</option>
          <option value="Feni">Feni</option>
          <option value="Gaibandha">Gaibandha</option>
          <option value="Gazipur">Gazipur</option>
          <option value="Gopalganj">Gopalganj</option>
          <option value="Habiganj">Habiganj</option>
          <option value="Jamalpur">Jamalpur</option>
          <option value="Jessore">Jessore</option>
          <option value="Jhalokati">Jhalokati</option>
          <option value="Jhenaidah">Jhenaidah</option>
          <option value="Joypurhat">Joypurhat</option>
          <option value="Khagrachari">Khagrachari</option>
          <option value="Khulna">Khulna</option>
          <option value="Kishoreganj">Kishoreganj</option>
          <option value="Kurigram">Kurigram</option>
          <option value="Kushtia">Kushtia</option>
          <option value="Lakshmipur">Lakshmipur</option>
          <option value="Lalmonirhat">Lalmonirhat</option>
          <option value="Madaripur">Madaripur</option>
          <option value="Magura">Magura</option>
          <option value="Manikganj">Manikganj</option>
          <option value="Meherpur">Meherpur</option>
          <option value="Moulvibazar">Moulvibazar</option>
          <option value="Munshiganj">Munshiganj</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Naogaon">Naogaon</option>
          <option value="Narail">Narail</option>
          <option value="Narayanganj">Narayanganj</option>
          <option value="Narsingdi">Narsingdi</option>
          <option value="Natore">Natore</option>
          <option value="Nawabganj">Nawabganj</option>
          <option value="Netrokona">Netrokona</option>
          <option value="Nilphamari">Nilphamari</option>
          <option value="Noakhali">Noakhali</option>
          <option value="Pabna">Pabna</option>
          <option value="Panchagarh">Panchagarh</option>
          <option value="Pirojpur">Pirojpur</option>
          <option value="Rajbari">Rajbari</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Rangamati">Rangamati</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Satkhira">Satkhira</option>
          <option value="Shariatpur">Shariatpur</option>
          <option value="Sherpur">Sherpur</option>
          <option value="Sirajganj">Sirajganj</option>
          <option value="Sunamganj">Sunamganj</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Tangail">Tangail</option>
          <option value="Thakurgaon">Thakurgaon</option>
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


      <button type="primary" 
       className='bg-yellow-500 text-white px-2 py-1 rounded hover:bg-blue'>
       <i className="ri-search-line text-md" onClick={getData}></i>
      </button>
    </div>
  )
}

export default Filters