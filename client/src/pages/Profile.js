import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContextProvider";
import { FaLinkedinIn, FaGlobe } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { MdOutlineArrowLeft } from "react-icons/md";

const Profile = () => {
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();
  const { id } = useParams();
  const { userState } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [profileStatus, setProfileStatus] = useState(false);

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    const headers = {
      Authorization: `Bearer ${userState.token}`,
    };
    axios
      .get(BASE_URL + "/users/profile/" + id, {
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
    <div className="md:w-[60%] flex flex-col mx-auto p-5 my-5">
      <div className="flex flex-row items-center">
        <MdOutlineArrowLeft className="text-black" />
        <button onClick={() => navigate(-1)} className="hover:underline">
          Back to home
        </button>
      </div>

      <div className="my-5 p-8 flex flex-col gap-8 shadow-md">
        <div className="flex flex-col items-start justify-between">
          <h1 className="text-3xl font-mono">{userData.name}</h1>
          <p className="text-[#007BFF]">{data.jobTitle}</p>
        </div>
        {profileStatus ? (
          <>
            <div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-mono border-b-2 border-[#f3f2f2] pb-2">
                  About
                </h2>
                <p className="mt-5 text-justify leading-8">{data.bio}</p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-2xl font-mono mb-2 border-b-2 border-[#f3f2f2] pb-2">
                  Contacts
                </h2>
                {data.contacts ? (
                  <div className="flex flex-col gap-2 mt-5">
                    <a
                      className="text-lg flex items-center gap-2 w-fit"
                      href={`https:${data.contacts["linkedin"]}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="font-semibold">LinkedIn:</span>{" "}
                      {data.contacts["linkedin"]}
                    </a>
                    <a
                      className="text-lg flex items-center gap-2 w-fit"
                      href={`https:${data.contacts["website"]}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="font-semibold">Website:</span>{" "}
                      {data.contacts["website"]}
                    </a>
                    <a className="text-lg flex items-center gap-2 w-fit">
                      <span className="font-semibold">Email:</span> {data.email}
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <h2 className="text-2xl font-mono border-b-2 border-[#f3f2f2] pb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-3 mt-3">
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
          </>
        ) : (
          <p>Profile Not Found</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
