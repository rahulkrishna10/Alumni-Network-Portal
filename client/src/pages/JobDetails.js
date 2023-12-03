import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { MdOutlineArrowLeft } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContextProvider";
import { PiLinkThin } from "react-icons/pi";

const JobDetails = () => {
  const { userState } = useContext(AuthContext);
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    const headers = {
      Authorization: `Bearer ${userState.token}`,
    };
    axios
      .get(BASE_URL + `/alumni/job/${jobId}`, { headers })
      .then((response) => setData(response.data));
  }, []);

  const formattedPostedDate = new Date(data.posted_date).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const formattedRegistrationDate = new Date(
    data.registration_date
  ).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-5 mx-20 my-10 relative">
      <div className="flex items-center left-10 absolute">
        <MdOutlineArrowLeft className="text-black" />
        <button className="hover:underline" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
      <div className="m-10 border border-[#f8f9fa] shadow-md p-10 flex flex-col gap-5 rounded-md">
        <div>
          <h1 className="text-3xl font-mono">{data.company}</h1>
          <h2 className="text-2xl font-mono">{data.title}</h2>
          <h3 className="text-lg text-gray-600 font-mono">{data.type}</h3>
        </div>
        <div className="flex gap-10">
          <div>
            <h2 className="text-gray-600">Posted Date</h2>
            <p className="text-lg">{formattedPostedDate}</p>
          </div>
          <div>
            <h2 className="text-gray-600">Registration Date</h2>
            <p className="text-lg">{formattedRegistrationDate}</p>
          </div>
        </div>
        <div>
          <h2 className="text-gray-600">About</h2>
          <p className="text-justify leading-7">{data.description}</p>
          <div className="mt-2">
            {data.contact ? (
              <a
                href={data.contact.link}
                target="_blank"
                title={data.contact.link}
                className="w-fit text-[#007BFF] hover:underline flex items-center hover:cursor-pointer"
              >
                <PiLinkThin />
                Registration Link
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
        <p className="text-gray-600 w-fit text-s">{data.posted_by_name}</p>
      </div>
    </div>
  );
};

export default JobDetails;
