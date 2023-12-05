import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../store/AuthContextProvider";
import EventCard from "../../components/EventCard";

const StudentEvents = () => {
  const [events, setEvents] = useState([]);
  const { userState } = useContext(AuthContext);

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    const headers = {
      Authorization: `Bearer ${userState.token}`,
    };
    axios
      .get(BASE_URL + "/student/events", { headers })
      .then((response) => {
        console.log(response);
        return setEvents(response.data);
      })
      .catch((e) => console.log(e.message));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col">
      <div className="p-10 mx-10 flex flex-col items-center lg:items-start gap-5">
        <h1 className="text-2xl md:px-10 font-mono">Upcoming Events</h1>
        <div className="lg:px-10 flex flex-row mx-5 flex-wrap gap-3 items-center justify-between">
          {events.map((data) => {
            return (
              <EventCard
                user={userState.user_type}
                key={data._id}
                data={data}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentEvents;
