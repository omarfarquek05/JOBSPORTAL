"use client"

// Profile.jsx
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import axios from 'axios';
import EmployeeForm from '@/components/EmployeeForm';
import EmployerForm from '@/components/EmployerForm';
import PageTitle from '@/components/PageTitle';
import Loader from '@/components/Loader';
import { toast } from 'react-hot-toast';

import { SetCurrentUser } from "@/redux/usersSlice";
import { useSelector, useDispatch } from 'react-redux'

const Profile = () => {

  //cng
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

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

  const [loading, setLoading] = useState(false);
  //const [currentUser, setCurrentUser] = useState(null);

  // const getUser = async () => {
  //   try {
  //     const response = await axios.get("/api/users/currentuser");
  //      setCurrentUser( response.data.data);

  //     // setValue('name', currentUser.name);
  //     // setValue('email', currentUser.email);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  const onSubmit = async (data) => {
    try {
      data._id = currentUser._id;
      data.userType = currentUser.userType;
      setLoading(true);
      const response = await axios.put("/api/users", data);
      toast.success("Profile updated successfully");
      dispatch(SetCurrentUser(response.data.data));
      router.push("/profile");
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

      <form className="" onSubmit={handleSubmit(onSubmit)}>
     
        {currentUser?.userType === 'employer' ? (
          <EmployerForm control={control}  register={register}  errors={errors} />
        ) : (
          <EmployeeForm
           register={register}
            control={control}
            educationFields={educationFields}
            appendEducation={appendEducation}
            removeEducation={removeEducation}
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

