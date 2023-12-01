import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContextProvider";
import { NavLink } from "react-router-dom";

const JobCard = ({ data, user }) => {
  const { userState } = useContext(AuthContext);
  const description = data.description;
  const truncatedDescription = description.substring(0, 100) + "...";
  return (
    <div className="w-[400px] h-[300px] border border-[#f3f2f5] p-5 flex flex-col justify-between gap-3 my-3 rounded-lg hover:shadow-lg">
      <div className="flex justify-between">
        <h2 className="text-xl font-mono">{data.company}</h2>
        <span
          className={`${
            data.type === "Internship" ? "bg-yellow-200" : "bg-orange-200"
          } text-sm p-1 rounded-md "`}
        >
          {data.type}
        </span>
      </div>
      <h1 className="text-2xl font-mono">{data.title}</h1>
      <p className="text-gray-600">{truncatedDescription}</p>
      <div className="inline-flex gap-3">
        <NavLink
          to={`/${user}/job/${data._id}`}
          className="w-fit hover:text-white hover:bg-[#007BFF] text-[#007BFF] border border-[#e3e2e4] py-1 px-3 my-2 rounded-sm hover:shadow-lg"
        >
          View
        </NavLink>
        {userState.user_type === "alumni" && userState.id === data.posted_by ? (
          <NavLink className="w-fit hover:text-white hover:bg-[#007BFF] text-[#007BFF] border border-[#e3e2e4] py-1 px-3 my-2 rounded-sm">
            Edit Post
          </NavLink>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default JobCard;
