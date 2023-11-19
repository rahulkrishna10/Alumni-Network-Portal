import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/AuthContextProvider";
import { FaLinkedinIn, FaGlobe } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { MdOutlineArrowLeft } from "react-icons/md";
import EditForm from "../EditProfile/EditForm";
import CreateProfile from "../../pages/CreateProfile";

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
    <div className="md:w-[50%] mx-auto my-5">
      <div className="flex flex-row items-center">
        <MdOutlineArrowLeft className="text-black" />
        <Link to="/alumni" className="hover:underline">
          Back to home
        </Link>
      </div>
      {!profileStatus && <CreateProfile />}
      {profileStatus && currentPage === "userProfile" && (
        <>
          {/* User Profile Header */}
          <div className="border border-[#F8F9FA] my-5 p-8 flex shadow-sm">
            {/* User Header Info */}
            <div className="flex flex-col items-start justify-between">
              <h1 className="text-3xl font-mono">{userState.name}</h1>
              <p className="text-[#007BFF]">{data.jobTitle}</p>
              {/* User Bio */}
              <div className="mt-5">
                <h2 className="text-2xl font-mono">About</h2>
                <p className="text-justify">{data.bio}</p>
              </div>
              {/* Edit Profile */}
              <button
                onClick={() => setCurrentPage("editProfile")}
                className="mt-5 p-2 border border-[#F8F9FA] rounded-lg text-[#007BFF]"
              >
                Edit Profile
              </button>
            </div>
          </div>
          {/* User Profile Details */}
          <div className="border border-[#F8F9FA] my-5 p-5 flex shadow-sm">
            {/* User Header Info */}
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-2xl font-mono mb-2">Contacts</h2>
                {data.contacts ? (
                  <div className="">
                    <a
                      className="text-lg flex items-center gap-2"
                      href={`https:${data.contacts["linkedin"]}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaLinkedinIn />
                      {data.contacts["linkedin"]}
                    </a>
                    <a
                      className="text-lg flex items-center gap-2"
                      href={`https:${data.contacts["website"]}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaGlobe />
                      {data.contacts["website"]}
                    </a>
                    <a className="text-lg flex items-center gap-2">
                      <AiFillMail />
                      {data.email}
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <h2 className="text-2xl font-mono">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {data.skills ? (
                  data.skills.map((skill, index) => (
                    <span className="border p-2 rounded-3xl">{skill}</span>
                  ))
                ) : (
                  <p>No skills available</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {currentPage === "editProfile" && <EditForm data={data} />}
    </div>
  );
};

export default UserProfile;
