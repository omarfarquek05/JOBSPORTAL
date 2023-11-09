import React from "react";
import Image from "next/image";

function EmployeeInfo({ employeeInfo  }) {

  
  return (
    <div className="container mx-auto max-w-screen-md text-lime-50">
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="flex flex-row items-center justify-center">
      {/* */}
      <Image
      src={employeeInfo?.profile} // This should be a valid image URL
      alt="User Image"
      width={100}
      height={100}
      className="rounded-full ring ring-indigo-600 hover:ring-blue-500"
    />
   
        <div className="ml-5">
          <h2 className="text-3xl font-bold">{employeeInfo.name }</h2>
          <h3 className="text-2xl font-medium pr-3"><i class="ri-mail-line mr-2"></i>{employeeInfo.email}</h3>
          <h4 className="text-xl font-light"><i class="ri-phone-line mr-2"></i>{employeeInfo.phone}</h4>
          <h4 className="text-xl font-light"><i class="ri-map-pin-fill mr-2"></i>{employeeInfo.address}</h4>
        </div>
      </div>
    </div>

    <div className="mt-3">
      <h2 className="text-2xl font-bold mb-2">Career Objective</h2>
      <p className="text-xl font-light">{employeeInfo.careerObjective}</p>
    </div>

    <div className="mt-2">
      <h2 className="text-2xl font-bold mb-1"><i className="ri-graduation-cap-fill mr-2"></i>Education</h2>
      <ul className="list-disc ml-5">
        {employeeInfo.education.map((item, index) => (
          <li key={index}>Degree: {item.qualification} <br/> 
         institution Name : {item.institution} <br/>
          CGPA : {item.cgpa}</li>
        ))}
      </ul>
    </div>

    <div className="mt-2">
      <h2 className="text-2xl font-bold mb-1"><i className="ri-list-settings-fill mr-2"></i>Skills</h2>
      <ul className="list-disc ml-5">
        {employeeInfo.skills.map((item, index) => (
          <li key={index}> Technology : {item.technology} <br/>
          Rating : {item.rating}</li>
        ))}
      </ul>
    </div>

    <div className="mt-2">
      <h2 className="text-2xl font-bold mb-1"><i className="ri-file-user-line mr-2"></i>Experience</h2>
      <ul className="list-disc ml-5">
        {employeeInfo.experience.map((item, index) => (
          <li key={index}> Company Name : {item.company} <br/>
         Role : {item.role} <br/>
          Year : {item.period}</li>
        ))}
      </ul>
    </div>
    <div className="mt-1">
      <h2 className="text-2xl font-bold mb-1"><i className="ri-file-shield-line mr-2"></i> Project Details </h2>
      <ul className=" ml-5">
        {employeeInfo.project.map((item, index) => (
          <li key={index}>Project Name: {item.name} <br/>
          Project Description: {item.description} <br/>
          Project Link: {item.link} </li>
         
        ))}
      </ul>
    </div>

  </div>
  );
}

export default EmployeeInfo;
