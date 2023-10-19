import React from 'react'

const EmployerInfo = ({ employerInfo }) => {
  return (
    <div className="md:flex md:justify-between md:items-center md:gap-3 text-light-1">
    <div className="md:w-1/2">
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-bold text-light-1">Company Name:</span>
          <span className="text-light">{employerInfo.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold text-light">Establishment Year:</span>
          <span className="text-light">{employerInfo.establishmentYear}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold text-light">No. Employee :</span>
          <span className="text-light">{employerInfo.companySize}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold text-light">Email:</span>
          <span className="text-light">{employerInfo.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold text-light">Phone:</span>
          <span className="text-light">{employerInfo.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold text-light">Website:</span>
          <span className="text-light">{employerInfo.website}</span>
        </div>

        <div className="flex justify-between">
        <span className="font-bold text-light">Address:</span>
        <span className="text-light">{employerInfo.address}</span>
      </div>
      
        <div className="flex justify-between">
          <span className="font-bold text-light"> About:</span>
          <span className="text-light">{employerInfo.about}</span>
        </div>
       
      </div>
    </div>
  </div>
  )
}

export default EmployerInfo