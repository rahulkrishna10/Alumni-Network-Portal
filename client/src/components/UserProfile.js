import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/AuthContextProvider";
import { MdOutlineArrowLeft } from "react-icons/md";
import EditForm from "./EditForm";
import CreateProfile from "../pages/CreateProfile";

const UserProfile = () => {
  const { userState } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [profileStatus, setProfileStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState("userProfile");

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    const headers = {
      Authorization: `Bearer ${userState.token}`,
    };
    axios
      .get(BASE_URL + "/users/profile", {
        headers,
      })
      .then((response) => {
        setData(response.data);
        setProfileStatus(true);
      })
      .catch((e) => {
        console.log(e.message);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="lg:w-[60%] flex flex-col mx-5 lg:mx-auto my-5">
      <div className="flex flex-row items-center">
        <MdOutlineArrowLeft className="text-black" />
        <Link to={`/${userState.user_type}`} className="hover:underline">
          Back to home
        </Link>
      </div>
      {!profileStatus && <CreateProfile />}
      {profileStatus && currentPage === "userProfile" && (
        <div className="my-5 p-8 flex flex-col gap-8 shadow-md">
          {/* User Header Info */}
          <div className="flex flex-col items-start justify-between">
            <h1 className="text-3xl font-mono">{userState.name}</h1>
            <p className="text-[#007BFF]">{data.jobTitle}</p>
          </div>
          {/* User Bio */}
          <div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-mono border-b-2 border-[#f3f2f2] pb-2">
                About
              </h2>
              <p className="mt-5 text-justify leading-8">{data.bio}</p>
            </div>
            {/* Edit Profile */}
          </div>
          {/* User Profile Details */}
          {/* User Header Info */}
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-mono mb-2 border-b-2 border-[#f3f2f2] pb-2">
                Contacts
              </h2>
              {data.contacts ? (
                <div className="flex flex-col gap-2 mt-5">
                  <button
                    className="text-lg flex items-center gap-2 w-fit"
                    // href={`https:${data.contacts["linkedin"]}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="font-semibold">LinkedIn:</span>{" "}
                    {data.contacts["linkedin"]}
                  </button>
                  <button
                    className="text-lg flex items-center gap-2 w-fit"
                    // href={`https:${data.contacts["website"]}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="font-semibold">Website:</span>{" "}
                    {data.contacts["website"]}
                  </button>
                  <button className="text-lg flex items-center gap-2 w-fit">
                    <span className="font-semibold">Email:</span> {data.email}
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            <h2 className="text-2xl font-mono border-b-2 border-[#f3f2f2] pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-3 mt-5">
              {data.skills ? (
                data.skills.map((skill, index) => (
                  <span className="border px-3 py-2 rounded-lg" key={index}>
                    {skill}
                  </span>
                ))
              ) : (
                <p>No skills available</p>
              )}
            </div>
          </div>
          <button
            onClick={() => setCurrentPage("editProfile")}
            className="p-2 border border-[#e7e8e9] rounded-lg text-[#007BFF] hover:text-white hover:bg-[#007BFF]"
          >
            Edit Profile
          </button>
        </div>
      )}
      {currentPage === "editProfile" && <EditForm data={data} />}
    </div>
  );
};

export default UserProfile;
