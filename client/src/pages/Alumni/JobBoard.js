import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../store/AuthContextProvider";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import JobCard from "../../components/JobCard";

const JobBoard = () => {
  const [jobData, setJobData] = useState([]);
  const { userState } = useContext(AuthContext);

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    const headers = {
      Authorization: `Bearer ${userState.token}`,
    };
    axios
      .get(BASE_URL + "/alumni/job", { headers })
      .then((response) => setJobData(response.data))
      .catch((e) => console.log(e.message));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="h-[92%] inline-flex">
      <div className="border border-[#F8F9FA] w-[25%] h-full px-8 py-10 flex flex-col gap-5">
        <NavLink
          to="/alumni/job/create"
          className="flex gap-2 border border-[#F8F9FA] p-3 w-fit hover:shadow-sm"
        >
          <PiSuitcaseSimpleLight className="self-center text-lg text-[#007BFF]" />
          Create Job Post
        </NavLink>
      </div>
      <div className="p-10 flex flex-col items-start gap-5 w-[85%]">
        <h1 className="text-2xl font-mono ml-16">Jobs</h1>
        <div className="w-full ml-3 px-14 flex flex-row gap-10 justify-between">
          {jobData.map((data) => {
            return <JobCard key={data._id} data={data} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
