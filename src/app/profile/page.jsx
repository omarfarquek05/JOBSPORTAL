"use client"

// Profile.jsx
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import axios, { Axios } from 'axios';
import EmployeeForm from '@/components/EmployeeForm';
import EmployerForm from '@/components/EmployerForm';
import PageTitle from '@/components/PageTitle';
import Loader from '@/components/Loader';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { SetCurrentUser } from "@/redux/usersSlice";
import { useSelector, useDispatch } from 'react-redux'

const Profile = () => {

  //cng
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
   const router = useRouter();

  const { control, handleSubmit, watch,register, setValue,formState: { errors } } = useForm(
    {
    defaultValues: async()=> {
      const response = await axios.get("/api/users/currentuser");
      const currentUsers = response.data.data;

      return {
        name: currentUsers.name,
        email: currentUsers.email,
        phone: currentUsers.phone,
        establishmentYear:currentUsers.establishmentYear,
        website:currentUsers.website,
        companySize:currentUsers.companySize,
        address:currentUsers.address,
        about:currentUsers.about,
        education:currentUsers.education,
        skills:currentUsers.skills,
        experience:currentUsers.experience,
        project:currentUser?.project,
        profile:currentUser?.profile,
      };
    },

  }
  );


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

  const [loading, setLoading] = useState(false);
 
  const onSubmit = async (data) => {
    
    data._id = currentUser._id;
    data.userType = currentUser.userType;
    setLoading(true);
   
    const raw_image = data.profile[0];
    console.log(raw_image);

    const formData = new FormData();
    formData.append("file", raw_image);
    formData.append("upload_preset", "jobsmela");

      //UPLOAD Image to Cloudinary
  try {
    // Upload the image to Cloudinary
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

    //const imageString = JSON.stringify(imageUrl);

    const updatedData = { ...data, profile: imageUrl };
    const response = await fetch("http://localhost:3000/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (response.ok) {
      
      setLoading(false);
      toast.success("user profile updated successfully :)");
      router.push("/profile");
      console.log(updatedData);
    }

    // const response = await axios.put("/api/users", data);
    // toast.success("Profile updated successfully");
    // dispatch(SetCurrentUser(response.data.data));
    // router.push("/profile");
  } catch (error) {
    // toast.message.error(error.response.data.message || "Something went wrong");
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="text-light-1">
      <PageTitle title="Profile" className="" />

      <h1>{loading ? <Loader /> : ' '}</h1>

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
          
          />
        )}

        <div className="flex my-3">
          <button
            type="submit"
            htmltype="submit"
            className="bg-indigo-800 text-white px-2 py-1 rounded-md outline outline-gray-50"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
