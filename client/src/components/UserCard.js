import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContextProvider";

const UserCard = ({ data }) => {
  const { userState } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleUserProfile = () => {
    navigate(`/${userState.user_type}/search/user/${data._id}`, {
      state: data,
    });
  };
  return (
    <div
      className="flex flex-row justify-between items-center border rounded-lg border-[#F8F9FA] shadow-sm hover:shadow-md my-2 p-8"
      onClick={handleUserProfile}
    >
      <div className="flex gap-3 items-center">
        <span className="w-12 h-12 bg-blue-200 text-blue-500 text-4xl text-center rounded-full uppercase">
          {data.name.charAt(0)}
        </span>
        <div className="flex flex-col ml-3">
          <h1 className="text-2xl">{data.name}</h1>
          <p className="text-md font-light">{data.email}</p>
        </div>
      </div>
      <p className="">{data.user_type}</p>
    </div>
  );
};

export default UserCard;
