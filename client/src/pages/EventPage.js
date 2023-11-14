import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../store/AuthContextProvider";

const EventPage = () => {
  const { userState } = useContext(AuthContext);
  const { eventId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    const headers = {
      Authorization: `Bearer ${userState.token}`,
    };
    axios
      .get(BASE_URL + `/alumni/events/${eventId}`, { headers })
      .then((response) => setData(response.data));
  }, []);

  console.log(data);

  const dateString = data.startDate;
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    month: "short", // or 'long' for the full month name
    day: "numeric",
  });
  return (
    <div className="m-10 w-[60%] mx-auto border p-10 flex flex-col gap-3">
      <h1 className="text-3xl font-mono">{data.title}</h1>
      <div>
        <h2 className="text-gray-600">Event Date</h2>
        <p className="text-xl">{formattedDate}</p>
      </div>
      <div>
        <h2 className="text-2xl font-mono">About</h2>
        <p>{data.description}</p>
      </div>
      <div>
        <h2 className="text-2xl font-mono">Location</h2>
        <p>{data.location}</p>
      </div>
      <h2 className="text-2xl font-mono">Contacts</h2>
      <p>{data.contactEmail}</p>
      <p>{data.contactPhone}</p>
      <p>{data.registrationLink}</p>
    </div>
  );
};

export default EventPage;
