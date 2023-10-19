import React from "react";

function EmployeeInfo({ employeeInfo }) {
  return (
    <div className="bg-black text-white p-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div>
          <h1 className="text-lg font-bold">Name:</h1>
          <p>{employeeInfo.name}</p>
        </div>
        <div>
          <h1 className="text-lg font-bold">Email:</h1>
          <p>{employeeInfo.email}</p>
        </div>
        <div>
          <h1 className="text-lg font-bold">Phone:</h1>
          <p>{employeeInfo.phone}</p>
        </div>
      </div>

      <h1 className="text-lg font-bold mt-6">Career Objective</h1>
      <p>{employeeInfo.carrierObjective}</p>

      <h1 className="text-lg font-bold mt-6">Education</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Qualification</th>
              <th className="text-left">Institution</th>
              <th className="text-left">CGPA</th>
            </tr>
          </thead>
          <tbody>
            {employeeInfo.education.map((item, index) => (
              <tr key={index}>
                <td>{item.qualification}</td>
                <td>{item.institution}</td>
                <td>{item.cgpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1 className="text-lg font-bold mt-6">Skills</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Technology</th>
              <th className="text-left">Rating (Out of 10)</th>
            </tr>
          </thead>
          <tbody>
            {employeeInfo.skills.map((item, index) => (
              <tr key={index}>
                <td>{item.technology}</td>
                <td>{item.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1 className="text-lg font-bold mt-6">Experience</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Company</th>
              <th className="text-left">Role</th>
              <th className="text-left">Period (from - to)</th>
            </tr>
          </thead>
          <tbody>
            {employeeInfo.experience.map((item, index) => (
              <tr key={index}>
                <td>{item.company}</td>
                <td>{item.role}</td>
                <td>{item.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeInfo;
