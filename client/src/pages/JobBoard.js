import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../store/AuthContextProvider";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import JobCard from "../components/JobCard";

const JobBoard = () => {
  const [jobData, setJobData] = useState([]);
  const { userState } = useContext(AuthContext);

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    const headers = {
      Authorization: `Bearer ${userState.token}`,
    };
    let url;
    if (userState.user_type === "student") {
      url = BASE_URL + "/student/job";
    } else {
      url = BASE_URL + "/alumni/job";
    }
    axios
      .get(url, { headers })
      .then((response) => setJobData(response.data))
      .catch((e) => console.log(e.message));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="h-[92%] px-20 flex flex-col">
      {userState.user_type === "student" ? (
        ""
      ) : (
        <div className="px-5 mx-5 pt-10">
          <NavLink
            to="/alumni/job/create"
            className="flex gap-2 p-3 border border-[#F8F9FA] w-fit"
          >
            <PiSuitcaseSimpleLight className="self-center text-lg text-[#007BFF]" />
            Create Job Post
          </NavLink>
        </div>
      )}
      <div className="flex flex-col items-start mx-5 gap-5 p-5">
        <h1 className="text-2xl font-mono">Jobs & Internships</h1>
        <div className="flex flex-row flex-wrap gap-10 justify-start">
          {jobData.map((data) => {
            return (
              <JobCard user={userState.user_type} key={data._id} data={data} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
