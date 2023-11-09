"use client"

// Profile.jsx
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import axios, { Axios } from 'axios';
import EmployeeForm from '@/components/EmployeeForm';
import EmployerForm from '@/components/EmployerForm';
import PageTitle from '@/components/PageTitle';
import Loader from '@/app/Loader';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { SetCurrentUser } from "@/redux/usersSlice";
import { useSelector, useDispatch } from 'react-redux'

const Profile = () => {

  //cng
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
   const router = useRouter();
   const [loading, setLoading] = useState(false);
  
   const { control, handleSubmit, watch, register, setValue, formState: { errors } } = useForm({
    defaultValues: async () => {
      const response = await axios.get("/api/users/currentuser");
      const currentUsers = response.data.data;

      const defaultValues = {
        name: currentUsers.name,
        email: currentUsers.email,
        phone: currentUsers.phone,
        establishmentYear: currentUsers.establishmentYear,
        website: currentUsers.website,
        companySize: currentUsers.companySize,
        address: currentUsers.address,
        about: currentUsers.about,
        education: currentUsers.education,
        skills: currentUsers.skills,
        experience: currentUsers.experience,
        project: currentUser?.project,
       // profile: '', // Initialize profile field as empty
      };
       {/*               
      // Check if user has previously uploaded a profile image
      if (currentUser?.profile) {
        // If there's a previously uploaded image, set it in defaultValues
        defaultValues.profile = currentUser.profile;
      }
*/}
      return defaultValues;
    },
  });


  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education',
  });

  const { fields: skillsFields, append: appendSkills, remove: removeSkills } = useFieldArray({
    control,
    name: 'skills',
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience',
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'project',
  });

  
 
  const updateProfileImage = async (data) => {
    try {
      const rawImage = data.profile[0];
      const formData = new FormData();
      formData.append("file", rawImage);
      formData.append("upload_preset", "jobsmela");
  
      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dlgsagf5h/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!uploadResponse.ok) {
        throw new Error("Image upload failed");
      }
  
      const imageData = await uploadResponse.json();
      const imageUrl = imageData.secure_url;
      return imageUrl;
    } catch (error) {
      throw error;
    }
  };
  
  const updateUserData = async (data, imageUrl) => {
    try {
      const updatedData = { ...data, profile: imageUrl };
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        return updatedData;
      } else {
        throw new Error("User profile update failed");
      }
    } catch (error) {
      throw error;
    }
  };
  
  const onSubmit = async (data) => {
    data._id = currentUser._id;
    data.userType = currentUser.userType;
    setLoading(true);
  
    try {
      let imageUrl = null;
  
      if (data.profile && data.profile.length > 0) {
        imageUrl = await updateProfileImage(data);
      }
  
      const updatedData = await updateUserData(data, imageUrl);
      setLoading(false);
      toast.success("User profile updated successfully");
      dispatch(SetCurrentUser(updatedData));
      router.push("/profile");
    } catch (error) {
      toast.error("Check every required field is filled or not");
      console.log(error);
      setLoading(false);
    }
  };
  
  

  return (
    <div className="text-light-1">
      <PageTitle title="Profile" className="" />

      {loading ? (
        <Loader/>
      ) : (<>

      <form className="" onSubmit={handleSubmit(onSubmit)} >
     
        {currentUser?.userType === 'employer' ? (
          <EmployerForm control={control}  register={register}  errors={errors} />
        ) : (
          <EmployeeForm
           register={register}
            control={control}
            educationFields={educationFields}
            appendEducation={appendEducation}
            removeEducation={removeEducation}
            projectFields={projectFields}
            appendProject={appendProject}
            removeProject={removeProject}
            skillsFields={skillsFields}
            appendSkills={appendSkills}
            removeSkills={removeSkills}
            experienceFields={experienceFields}
            appendExperience={appendExperience}
            removeExperience={removeExperience}
            errors={errors}
             currentUser={currentUser}
          />
        )}

        <div className="flex my-3">
        {loading ? (
          <button
            disabled
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-white animate-spin"
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
            updating please wait...
          </button>
        ) : (
          <button
            type="submit"
            className="bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50"
          >
            save
          </button>
        )}
        </div>
      </form>

        <button onClick={() => router.push("/resume")}
        type="view"
        className="bg-indigo-800 text-white px-2 py-1 rounded-md mr-2 outline outline-gray-50"
        >View resume</button>
         </> )}
    </div>
  );
};

export default Profile;
