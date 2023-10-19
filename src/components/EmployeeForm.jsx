
import React from 'react';

const EmployeeForm = ({
  register,
  control,
  errors,
  educationFields,
  appendEducation,
  removeEducation,
  skillsFields,
  appendSkills,
  removeSkills,
  experienceFields,
  appendExperience,
  removeExperience,
}) => {


  return (
    <div className="text-light-1">
      <div className="">
        <label className="block text-gray-700" htmlFor="name"> Name </label>
        <input
          type="text"
          id="name"
          className="form-input mt-1 block w-full rounded-md text-dark-1 pt-2
          border-indigo-200 border-x-indigo-500 focus:border-amber-500
           focus:ring focus:ring-lime-400"
          {...register('name', { required: 'Name is required' })}
          placeholder="Enter Your name"
        />
        <p className="mt-2 text-red-500 font-medium">
          {errors.name && errors.name.message}
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="email"> Email </label>
        <input
          type="email"
          id="email"
          className="form-input mt-1 block w-full rounded-md text-dark-1 pt-2
          border-indigo-200 border-x-indigo-500 focus:border-amber-500
           focus:ring focus:ring-lime-400"
          {...register('email', { required: 'Email is required' })}
          placeholder="email"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="phone"> Phone Number </label>
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
          placeholder="Enter Phone Number"
          
        />
        <p className="mt-2 text-red-500 font-medium">
          {errors.phone && errors.phone.message}
        </p>
      </div>

      {/* Education */}
      <div className="text-light-1">
        <div className="content pb-[20px]">
          <h1 className="pb-[10px]">Education:</h1>
          {educationFields.map((field, index) => (
            <div className="mb-4 p-4 rounded-lg shadow-lg" key={field.id}>
              
            <div className="mb-2">
                <label className="block text-sm font-medium text-light-1"> Quaification </label>
              <input
                type="text"
                {...register(`education[${index}].qualification`, {
                  required: 'Qualification is required',
                })}
                placeholder="Enter qualification"
                
                className="form-input mt-1 block w-full rounded-md text-dark-1 pt-2
                border-indigo-200 border-x-indigo-500 focus:border-amber-500
                 focus:ring focus:ring-lime-400"
                 />
                 <p className="mt-2 text-red-500 font-medium">
                 {errors?.education && errors.education[index]?.qualification && errors.education[index].qualification.message}
               </p>
             </div>
              
             <div className="mb-2">
                <label className="block text-sm font-medium text-light-1">Institution Name</label>
              <input
                type="text"
                {...register(`education[${index}].institution`, {
                  required: 'Institution Name is required',
                })}
                placeholder="Enter institution Name"
               
                className="form-input mt-1 block w-full rounded-md text-dark-1 pt-2
                border-gray-300 focus:border-blue-500 focus:ring focus:ring-lime-400"
              />
              <p className="mt-2 text-red-500 font-medium">
    {errors?.education && errors.education[index]?.institution && errors.education[index].institution.message}
  </p>
            </div>

            <div className="mb-2">
            <label className="block text-sm font-medium text-light-1">CGPA</label>
              <input
                type="number"
                step="0.01"
                {...register(`education[${index}].cgpa`, {
                  required: 'CGPA is required',
                  validate: (value) => {
                    // Custom validation function for CGPA
                    if (value >= 1.00 && value <= 5.00) {
                      return true; // Valid CGPA
                    }
                    return 'CGPA must be between 1.00 and 5.00';
                  },
                })}
                placeholder="Enter cgpa"
               
                className="form-input mt-1 block w-full rounded-md text-dark-1 pt-2
                 border-gray-300 focus:border-blue-500 focus:ring focus:ring-lime-400"
              />
              <p className="mt-2 text-red-500 font-medium">
              {errors?.education && errors.education[index]?.cgpa && errors.education[index].cgpa.message}
            </p>

         </div>

          <button type="button" 
              className=" bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50"
              onClick={() => removeEducation(index)}>
                Remove
              </button>
            </div>
          ))}

          <button type="button" 
          className=" bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50"
           onClick={() => appendEducation({})}>
            Add More
          </button>
        </div>
      </div>

      {/* Skills */}
      <div className="text-light-1">
        <div className="content pb-[20px]">
          <h1 className="pb-[10px] ">Skills:</h1>

          {skillsFields.map((field, index) => (
            <div className="mb-4 p-4 rounded-lg shadow-lg" key={field.id}>

            <div className="mb-2">
                <label className="block text-sm font-medium text-light-1"> Technology </label>
              <input
                type="text"
                {...register(`skills[${index}].technology`, {
                  required: 'Technology is required',
                })}
                placeholder="Enter technology"
                className='form-input mt-1 block w-full rounded-md text-dark-1 pt-2
                border-indigo-200 border-x-indigo-500 focus:border-amber-500
                 focus:ring focus:ring-lime-400'
              />
              <p className="mt-2 text-red-500 font-medium">
            {errors.skills && errors.skills[index]?.technology && errors.skills[index].technology.message}
          </p>
         </div>
           
         <div className="mb-2">
                <label className="block text-sm font-medium text-light-1"> Rating </label>
              <input
                type="number"
                {...register(`skills[${index}].rating`, {
                  required: 'Rating is required',
                  min: {
                    value: 1,
                    message: 'Rating must be at least 1',
                  },
                  max: {
                    value: 10,
                    message: 'Rating cannot be more than 10',
                  },
                })}
                placeholder="Enter rating out of 10"
               
                className='form-input mt-1 block w-full rounded-md text-dark-1 pt-2
                border-indigo-200 border-x-indigo-500 focus:border-amber-500
                 focus:ring focus:ring-lime-400'
              />
              <p className="mt-2 text-red-500 font-medium">
            {errors.skills && errors.skills[index]?.rating && errors.skills[index].rating.message}
          </p>
        </div>

              <button type="button"
              className=" bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50"
              onClick={() => removeSkills(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" 
          className=" bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50"
          onClick={() => appendSkills({})}>
            Add More
          </button>
        </div>
      </div>

      {/* Experience */}
      <div className="text-light-1">
        <div className="content pb-[20px]">
          <h1 className="pb-[10px]">Experience </h1>
          {experienceFields.map((field, index) => (
            <div className="mb-4 p-4 rounded-lg shadow-lg" key={field.id}>

            <div className="mb-2">
                 <label className="block text-sm font-medium text-light-1"> Company name </label>
              <input
                type="text"
                {...register(`experience[${index}].company`)}
                placeholder="Enter company name"
              
                className='form-input mt-1 block w-full rounded-md text-dark-1 pt-2
                border-indigo-200 border-x-indigo-500 focus:border-amber-500
                 focus:ring focus:ring-lime-400'
              />
         </div>

         <div className="mb-2">
                 <label className="block text-sm font-medium text-light-1"> Role </label>
              <input
                type="text"
                {...register(`experience[${index}].role`)}
                placeholder="Enter role"
               
                className='form-input mt-1 block w-full rounded-md text-dark-1 pt-2
                border-indigo-200 border-x-indigo-500 focus:border-amber-500
                 focus:ring focus:ring-lime-400'
              />
              </div>

              <div className="mb-2">
              <label className="block text-sm font-medium text-light-1"> Period oF Year </label>
              <input
                type="number"
                {...register(`experience[${index}].period`)}
                placeholder="Enter your work experience year"
              
                className='form-input mt-1 block w-full rounded-md text-dark-1 pt-2
                border-indigo-200 border-x-indigo-500 focus:border-amber-500
                 focus:ring focus:ring-lime-400'
              />
              </div>
              
              <button type="button"
              className=" bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50"
              onClick={() => removeExperience(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button"
          className=" bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50"
          onClick={() => appendExperience({})}>
            Add More
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;