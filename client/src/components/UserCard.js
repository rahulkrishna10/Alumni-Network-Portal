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
    <div className="flex justify-stretch items-center border rounded-2xl border-[#F8F9FA] shadow-sm hover:shadow-md my-2 md:w-[550px] h-[200px]">
      <div className="h-full flex flex-col justify-between items-center gap-3 bg-[#f7f7f7] p-10 ">
        <span className="w-14 h-14 bg-white text-blue-500 text-4xl flex justify-center items-center rounded-full uppercase">
          {data.name.charAt(0)}
        </span>
        <button
          className="px-3 py-2 text-xs border text-[#007BFF] bg-white font-sans tracking-widest rounded-lg hover:bg-[#007BFF] hover:text-white"
          onClick={handleUserProfile}
        >
          View Profile
        </button>
      </div>
      <div className="flex flex-col h-full px-3 py-5 justify-evenly mx-3 capitalize">
        <p className="bg-[#f7f7f7] text-black w-fit px-5 py-1 rounded-xl">
          {data.user_type}
        </p>
        <div>
          <h1 className="text-2xl font-mono">{data.name}</h1>
          <p className="text-md font-light lowercase">{data.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
