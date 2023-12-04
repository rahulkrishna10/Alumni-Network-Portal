import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../store/AuthContextProvider";
import MiniEventCard from "../../components/MiniEventCard";
import { PiArrowCircleRight } from "react-icons/pi";
import ImageCarousel from "../../components/ImageCarousel";
import CETImg1 from "../../images/CETImg1.jpg";
import CETImg2 from "../../images/CETImg2.jpg";
import CETImg3 from "../../images/CETImg3.jpg";

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
    <div className="lg:flex justify-between h-[85%] py-10 px-24 md:my-14 lg:my-0 lg:mx-20 lg:mb-10 gap-5">
      <div className="lg:flex lg:flex-col lg:justify-around">
        <h1 className="text-5xl font-extralight">Dashboard</h1>
        <div className="flex flex-col gap-5 w-fit lg:w-[550px] my-5 bg-[#f8f8f8] p-10 rounded-xl">
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
        <div className="flex justify-center flex-col">
          <h2 className="text-3xl font-thin text-center md:text-left">
            New Events
          </h2>
          <div className="flex flex-col md:flex-row gap-5 items-center my-3">
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
      <div className="w-[50%] flex flex-col gap-5 border border-[#F8F9FA] rounded-2xl p-7 hover:shadow-md">
        <ImageCarousel images={[CETImg1, CETImg3]} />
        <div className="p-5 flex flex-col gap-5 rounded-lg h-1/2">
          <h1 className="text-4xl">C E T A A - M C A</h1>
          <p className="text-base text-justify">
            The College of Engineering, Trivandrum was established in 1939 as
            the first Engineering College in the then Travancore State. The
            first classes were started on 3rd July 1939 during the reign of the
            Travancore King, Sri Chithira Thirunal Balarama Varma and as the
            head of the then Travancore state he deserves his share of credit in
            the establishment of the college. Initially the College was housed
            in the former office and bungalow of the Chief Engineer (present PMG
            Office). Maj T.H. Mathewman, a Britisher was the first Principal.
            Started as a constituent College of Travancore University, the
            College had an initial intake of 21 students each for Degree and
            Diploma courses in Civil, Mechanical and Electrical branches. With
            the establishment of the Directorate of Technical Education in the
            late fifties, the College administration came under the control of
            the Government of Kerala. The College was shifted to the present
            sprawling 125 acres in 1960.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlumniHome;
