import React from "react";

const UserCard = ({ data }) => {
  return (
    <div className="flex flex-row justify-between items-center border rounded-lg border-[#F8F9FA] shadow-sm hover:shadow-md my-2 p-8">
      <div className="flex gap-3 items-center">
        <span className="w-10 h-10 bg-blue-200 text-blue-500 text-3xl text-center rounded-full uppercase">
          {data.name.charAt(0)}
        </span>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{data.name}</h1>
          <p className="text-sm font-light">{data.email}</p>
        </div>
      </div>
      <p className="">{data.user_type}</p>
    </div>
  );
};

export default UserCard;
