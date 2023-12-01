import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../store/AuthContextProvider";
import MiniEventCard from "../../components/MiniEventCard";
import { PiArrowCircleRight } from "react-icons/pi";

const AlumniHome = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const { userState } = useContext(AuthContext);

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    const headers = {
      Authorization: `Bearer ${userState.token}`,
    };
    axios
      .get(BASE_URL + "/alumni/events", { headers })
      .then((response) => setEvents(response.data))
      .catch((e) => console.log(e.message));
    // eslint-disable-next-line
  }, []);
  return (
    <div className="flex justify-between h-[85%] p-5 mx-20 mb-10">
      <div className="flex flex-col justify-around">
        <h1 className="text-5xl font-extralight">Dashboard</h1>
        <div className="flex flex-col gap-5 w-[550px] my-5 bg-[#f8f8f8] p-10 rounded-xl">
          <h3 className="text-3xl font-thin">Hi {userState.name}</h3>
          <p>
            Welcome back, {userState.name}! Reconnect with old friends, explore
            career opportunities, and relive the memories that shaped your
            journey.
          </p>
          <button
            onClick={() => navigate(`/${userState.user_type}/profile`)}
            className="px-3 py-2 bg-[#007BFF] w-fit text-white mt-5 text-xs rounded-md"
          >
            View Profile
          </button>
        </div>
        <div>
          <h2 className="text-3xl font-thin">New Events</h2>
          <div className="flex gap-5 items-center my-3">
            {events.slice(0, 3).map((data) => {
              return (
                <MiniEventCard
                  user={userState.user_type}
                  key={data._id}
                  data={data}
                />
              );
            })}
            <PiArrowCircleRight
              className="text-5xl text-[#007BFF] hover:cursor-pointer"
              onClick={() => navigate(`/${userState.user_type}/events`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniHome;
