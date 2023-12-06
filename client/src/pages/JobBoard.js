import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../store/AuthContextProvider";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import JobCard from "../components/JobCard";

const JobBoard = () => {
  const [jobData, setJobData] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "internship", "job"
  const [searchTerm, setSearchTerm] = useState("");
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
  }, [userState]);

  const filteredJobData = jobData.filter((data) => {
    const currentDate = new Date();
    const isCurrentType =
      filter === "all" || data.type.toLowerCase() === filter.toLowerCase();
    const isFutureRegistration = new Date(data.registration_date) > currentDate;
    const hasMatchingSkills = data.required_skills.some((skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const hasMatchingTitle = data.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      isCurrentType &&
      isFutureRegistration &&
      (searchTerm === "" || hasMatchingSkills || hasMatchingTitle)
    );
  });

  return (
    <div className="h-[92%] md:px-20 flex flex-col">
      {userState.user_type === "student" ? (
        ""
      ) : (
        <div className="px-5 mx-5 pt-10">
          <NavLink
            to="/alumni/job/create"
            className="flex gap-2 p-3 border border-[#F8F9FA] w-fit shadow-sm hover:shadow-md"
          >
            <PiSuitcaseSimpleLight className="self-center text-lg text-[#007BFF]" />
            Create Job Post
          </NavLink>
        </div>
      )}
      <div className="flex flex-col items-start mx-5 gap-5 p-5">
        <h1 className="text-2xl font-mono">Jobs & Internships</h1>
        <div className="mb-3 flex flex-col lg:flex-row w-full lg:items-center gap-5">
          <label className="mr-2">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border bg-white"
          >
            <option value="all">All Listings</option>
            <option value="internship">Only Internships</option>
            <option value="full-time">Only Jobs</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border bg-white"
            placeholder="Enter job title or skills..."
          />
        </div>
        <div className="flex flex-row flex-wrap gap-10 justify-start">
          {filteredJobData.map((data) => (
            <JobCard user={userState.user_type} key={data._id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
