import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

const MiniEventCard = ({ data, user }) => {
  const navigate = useNavigate();
  const dateString = data.startDate;
  const dateObject = new Date(dateString);

  const month = dateObject.toLocaleDateString("en-US", { month: "short" });
  const day = dateObject.toLocaleDateString("en-US", { day: "numeric" });

  const description = data.description;
  const truncatedDescription = description.substring(0, 70) + "...";
  return (
    <div className="w-[220px] h-[280px] border border-[#f3f2f5] flex flex-col justify-between gap-3 my-3 rounded-lg hover:shadow-md">
      <div className="flex flex-col h-full w-full justify-between gap-5">
        <h1
          onClick={() => navigate(`/${user}/event/${data._id}`)}
          className="text-xl uppercase hover:cursor-pointer p-5"
        >
          {data.title}
        </h1>
        <p className="bg-[#bfd5f5] w-full p-5">{truncatedDescription}</p>
      </div>
    </div>
  );
};

export default MiniEventCard;
