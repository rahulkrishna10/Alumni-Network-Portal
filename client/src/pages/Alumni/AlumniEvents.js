import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../store/AuthContextProvider";
import EventCard from "../../components/EventCard";

const AlumniEvents = () => {
  const [events, setEvents] = useState([]);
  const { userState } = useContext(AuthContext);

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    const headers = {
      Authorization: `Bearer ${userState.token}`,
    };

    axios
      .get(BASE_URL + "/alumni/events", { headers })
      .then((response) => {
        const currentDate = new Date();
        const upcomingEvents = response.data.filter(
          (event) => new Date(event.startDate) > currentDate
        );

        setEvents(upcomingEvents);
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="p-10 md:mx-10 flex flex-col md:items-center lg:items-start gap-5">
        <h1 className="text-2xl md:px-10 font-mono">Upcoming Events</h1>
        <div className="lg:px-10 flex flex-row md:mx-5 flex-wrap gap-3 md:items-center justify-start md:justify-between">
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

export default AlumniEvents;
