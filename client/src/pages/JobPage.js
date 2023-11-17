import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../store/AuthContextProvider";

const JobPage = () => {
  const { userState } = useContext(AuthContext);
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

  console.log(data);

  return (
    <div className="m-10 w-[60%] mx-auto border py-5 px-10 flex flex-col gap-5">
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
        <h2 className="text-2xl font-mono">About</h2>
        <p className="text-justify">{data.description}</p>
      </div>
      <p className="text-gray-600 w-fit hover:underline cursor-pointer">
        Posted by {data.posted_by_name}
      </p>
      {/* 
      <h2 className="text-2xl font-mono">Contacts</h2>
      <p>{data.contactEmail}</p>
      <p>{data.contactPhone}</p>
      */}
    </div>
  );
};

export default JobPage;
