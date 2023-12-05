import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaMailBulk, FaGlobe } from "react-icons/fa";
import { MdOutlineArrowLeft } from "react-icons/md";
import { AuthContext } from "../store/AuthContextProvider";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const EventPage = () => {
  const { userState } = useContext(AuthContext);
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [data, setData] = useState({});
  const [rsvpChartData, setRsvpChartData] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
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
                backgroundColor: ["#36A2EB", "#d6d6d6"],
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
    <div className="lg:w-[92%] flex flex-col lg:flex-row gap-5 justify-between lg:mx-20 my-10 relative">
      <div className="flex absolute items-center left-10">
        <MdOutlineArrowLeft className="text-black" />
        <button className="hover:underline" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
      <div className="m-10 border border-[#F8F9FA] rounded-md p-10 flex flex-col justify-between gap-5 shadow-md">
        <h1 className="text-4xl">{data.title}</h1>
        <div>
          <h2 className="text-gray-600 text-lg">Description</h2>
          <p className="text-lg">{data.description}</p>
        </div>
        <div>
          <h2 className="text-gray-600 text-lg">Event Date</h2>
          <p className="text-lg">{formattedDate}</p>
        </div>
        <div>
          <h2 className="text-gray-600 text-lg">Location</h2>
          <p className="text-lg">{data.location}</p>
        </div>
        <div className="">
          <h2 className="text-gray-600 text-lg">Contacts</h2>
          <div className="flex gap-2 lg:items-center flex-col lg:flex-row">
            <FaMailBulk className="text-xl text-[#3171b4]" />
            <p className="text-lg">{data.contactEmail}</p>
            <FaPhoneAlt className="text-xl text-[#3171b4]" />
            <p className="text-lg">{data.contactPhone}</p>
            <FaGlobe className="text-xl text-[#3171b4]" />
            <p className="text-lg">{data.registrationLink}</p>
          </div>
        </div>
      </div>
      <div className="m-10 lg:w-[25%] border border-[#F8F9FA] rounded-md p-10 flex flex-col gap-5 justify-between shadow-md">
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
          <div className="md:w-[300px] md:h-[300px] flex flex-col items-center md:p-8">
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
