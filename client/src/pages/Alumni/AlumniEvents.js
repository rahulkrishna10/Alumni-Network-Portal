import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../store/AuthContextProvider";
import EventCard from "../../components/EventCard";

const JobBoard = () => {
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
    <div className="h-fullflex flex-col">
      <div className="p-10 mx-10 flex flex-col items-start gap-5">
        <h1 className="text-2xl px-10 font-mono">Events</h1>
        <div className="px-10 flex flex-row flex-wrap gap-3 items-center justify-between">
          {events.map((data) => {
            return <EventCard key={data._id} data={data} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
