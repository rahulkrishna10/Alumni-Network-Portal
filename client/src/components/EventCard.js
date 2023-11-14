import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const EventCard = ({ data }) => {
  const dateString = data.startDate;
  const dateObject = new Date(dateString);

  const month = dateObject.toLocaleDateString("en-US", { month: "short" });
  const day = dateObject.toLocaleDateString("en-US", { day: "numeric" });

  const description = data.description;
  const truncatedDescription = description.substring(0, 150) + "...";
  return (
    <div className="w-[550px] h-[300px] border border-[#f3f2f5] p-5 flex flex-col justify-between gap-3 my-3 rounded-lg hover:shadow-md">
      <div className="flex justify-start gap-5 items-center">
        <div className="flex flex-col text-center border justify-center w-[80px] h-[80px] rounded-full bg-blue-100">
          <span className="text-3xl leading-none text-[#007BFF]">{day}</span>
          <span className="text-xl leading-none text-[#007BFF]">{month}</span>
        </div>
        <h1 className="text-2xl font-mono">{data.title}</h1>
      </div>
      <p className="text-gray-600">{truncatedDescription}</p>
      <div className="flex items-center gap-3">
        <FaLocationDot className="text-[#9e9e9e]" />
        <span className="text-lg text-[#9e9e9e]">{data.location}</span>
      </div>
      <div className="inline-flex gap-3">
        <NavLink
          to={`/alumni/event/${data._id}`}
          className="w-fit transition ease-in delay-150 text-[#007BFF] border border-[#e3e2e4] py-1 px-3 my-2 rounded-sm"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
};

export default EventCard;
