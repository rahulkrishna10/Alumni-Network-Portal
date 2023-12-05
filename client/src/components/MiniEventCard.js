import React from "react";
import { useNavigate } from "react-router-dom";

const MiniEventCard = ({ data, user }) => {
  const navigate = useNavigate();

  const description = data.description;
  const truncatedDescription = description.substring(0, 70) + "...";
  return (
    <div className="w-full md:w-[220px] h-[280px] border border-[#f3f2f5] flex flex-col justify-between gap-3 my-3 rounded-lg hover:shadow-md">
      <div className="flex flex-col h-full w-full justify-between gap-5">
        <h1
          onClick={() => navigate(`/${user}/event/${data._id}`)}
          className="text-xl uppercase hover:cursor-pointer p-5"
        >
          {data.title}
        </h1>
        <p className="bg-[#f8f8f8] w-full p-5">{truncatedDescription}</p>
      </div>
    </div>
  );
};

export default MiniEventCard;
