"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import moment from "moment";

function Applications() {
  const [applications, setApplications] = React.useState([]);
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/applications?user=${currentUser._id}`);
      console.log(response.data.data);
      console.log(applications[0]);
      setApplications(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SetLoading(false));
    }
  }

  React.useEffect(() => {
    fetchApplications();
  }, []);

  const columns = [
    {
      title: "Application ID",
      dataIndex: "_id",
    },
    {
      title: "Job Title",
      dataIndex: "job.title",
      render: (job) => job.title,
    },
    // {
    //   title: "Company",
    //   dataIndex: "job",
    //   render: (job) => job?.user?.name,
    // },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Applied On",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-light-1 ">Applications</h2>
      </div>
      <hr className="text-light-1 mb-2"/>
      <div className="overflow-auto h-full daisyui-table-responsive">
        <table className="table table-bordered table-responsive-md text-light-1 border-light">
          <thead className=" ">
          
            <tr >
              {columns.map((column) => (
                <th key={column.title}>{column.title}</th>
              ))}
            </tr>
          </thead>
         
          <tbody>
          {applications.map((application) => (
            <tr key={application._id} >
              <td className="pr-3">{application._id}</td>
              <td className="pr-3">{application.job.title}</td> 
          {/*<td>{application.job?.user?.name}</td>*/}
              <td className="pr-3">{application.status}</td>
              <td className="pr-3">{moment(application.createdAt).format("DD/MM/YYYY")}</td>
            </tr>
          ))}
          
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Applications;