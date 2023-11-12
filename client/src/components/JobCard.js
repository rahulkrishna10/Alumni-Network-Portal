import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContextProvider";

const JobCard = ({ data }) => {
  const { userState } = useContext(AuthContext);
  const description = data.description;
  const truncatedDescription = description.substring(0, 100) + "...";
  return (
    <div className="w-[700px] border border-[#f3f2f5] p-5 flex flex-col gap-3 my-3 hover:shadow-md">
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
        <button className="w-fit transition ease-in delay-150 text-[#007BFF] border border-[#e3e2e4] py-1 px-3 my-2 rounded-sm">
          View
        </button>
        {userState.id === data.posted_by ? (
          <button className="w-fit transition ease-in delay-150 text-[#007BFF] border border-[#e3e2e4] py-1 px-3 my-2 rounded-sm">
            Edit Post
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default JobCard;