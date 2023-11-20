import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaPhoneAlt, FaMailBulk, FaGlobe } from "react-icons/fa";
import { AuthContext } from "../store/AuthContextProvider";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const EventPage = () => {
  const { userState } = useContext(AuthContext);
  const { eventId } = useParams();
  const [data, setData] = useState({});
  const [rsvpChartData, setRsvpChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const BASE_URL = "http://localhost:3001";
    const headers = {
      Authorization: `Bearer ${userState.token}`,
    };
    axios
      .get(BASE_URL + `/alumni/events/${eventId}`, { headers })
      .then((response) => {
        setData(response.data);
        if (response.data.rsvp) {
          const rsvpData = response.data.rsvp;

          const yesCount = rsvpData.filter(
            (entry) => entry.response === "yes"
          ).length;

          const noCount = rsvpData.filter(
            (entry) => entry.response === "no"
          ).length;

          setRsvpChartData({
            labels: ["Yes", "No"],
            datasets: [
              {
                data: [yesCount, noCount],
                backgroundColor: ["#36A2EB", "#b5b5b5"],
              },
            ],
          });
        }
      });
  };

  const handleRsvp = (response) => {
    const BASE_URL = "http://localhost:3001";
    const headers = {
      Authorization: `Bearer ${userState.token}`,
    };

    const data = {
      response,
    };

    console.log(data);

    axios
      .post(BASE_URL + `/users/events/${eventId}/rsvp`, data, { headers })
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const dateString = data.startDate;
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    month: "short", // or 'long' for the full month name
    day: "numeric",
  });
  return (
    <div className="flex gap-5 justify-around items-stretch m-20">
      <div className="m-10 border border-[#F8F9FA] rounded-md p-10 flex flex-col gap-5 shadow-md">
        <h1 className="text-4xl">{data.title}</h1>
        <div>
          <h2 className="text-gray-600 font-mono">Description</h2>
          <p className="text-xl">{data.description}</p>
        </div>
        <div>
          <h2 className="text-gray-600 font-mono">Event Date</h2>
          <p className="text-xl">{formattedDate}</p>
        </div>
        <div>
          <h2 className="text-gray-600 font-mono">Location</h2>
          <p className="text-xl">{data.location}</p>
        </div>
        <h2 className="text-gray-600 font-mono">Contacts</h2>
        <div className="flex gap-2 items-center">
          <FaMailBulk className="text-xl" />
          <p className="text-xl">{data.contactEmail}</p>
          <FaPhoneAlt className="text-xl" />
          <p className="text-xl">{data.contactPhone}</p>
          <FaGlobe className="text-xl" />
          <p className="text-xl">{data.registrationLink}</p>
        </div>
      </div>
      <div className="m-10 w-[25%] border border-[#F8F9FA] rounded-md p-10 flex flex-col gap-5 justify-between shadow-md">
        <div className="flex flex-col gap-5">
          <h2 className="text-gray-600 font-mono text-lg">Will you attend ?</h2>
          <div className="flex gap-3">
            <button
              className="bg-[#007BFF] w-24 p-2 text-white"
              onClick={() => handleRsvp("yes")}
            >
              Yes, I'm in
            </button>
            <button
              className=" w-24 border py-2 text-[#007BFF]"
              onClick={() => handleRsvp("no")}
            >
              No
            </button>
          </div>
        </div>
        {rsvpChartData && (
          <div className="w-[300px] h-[300px] flex flex-col items-center p-8">
            <h1>RSVP Count</h1>
            <Doughnut
              data={rsvpChartData}
              options={{
                responsive: true,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
