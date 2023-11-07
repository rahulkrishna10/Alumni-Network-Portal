import React from "react";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const JobBoard = () => {
  return (
    <div className="h-[92%]">
      <div className="border border-[#F8F9FA] w-[250px] h-full px-8 py-10 flex flex-col gap-5">
        <NavLink
          to="/alumni/job/create"
          className="flex gap-2 border p-3 w-fit"
        >
          <PiSuitcaseSimpleLight className="self-center text-lg text-[#007BFF]" />
          Create Job Post
        </NavLink>
      </div>
    </div>
  );
};

export default JobBoard;
