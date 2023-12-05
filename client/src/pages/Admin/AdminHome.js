import { useEffect, useState } from "react";
import { FaUsers, FaSuitcase, FaBullhorn } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const AdminHome = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState({});
  const [userCounts, setUserCounts] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";

    const fetchData = async (endpoint, stateKey) => {
      try {
        const response = await axios.get(BASE_URL + endpoint);
        setCount((prevCount) => ({
          ...prevCount,
          [stateKey]: response.data,
        }));
      } catch (error) {
        console.error(`Error fetching data from ${BASE_URL + endpoint}`, error);
      }
    };

    axios
      .get(BASE_URL + "/admin/users/created_dates")
      .then((response) => {
        setUserCounts(response.data);
        setLatestUsers(response.data.slice(-5));
      })
      .catch((error) => {
        console.error("Error fetching user creation dates:", error);
      });

    fetchData("/admin/event/count", "eventCount");
    fetchData("/admin/job/count", "jobCount");
    fetchData("/admin/users/count", "usersCount");
  }, []);

  const userCountsByDate = userCounts.reduce((counts, user) => {
    const date = new Date(user.createdDate).toLocaleDateString();
    counts[date] = (counts[date] || 0) + 1;
    return counts;
  }, {});

  const labels = Object.keys(userCountsByDate);
  const data = {
    labels,
    datasets: [
      {
        label: "User Registrations",
        data: Object.values(userCountsByDate),
        fill: false,
        borderColor: "#007BFF",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        labels,
      },
      y: {
        suggestedMin: 0,
        suggestedMax:
          Math.ceil(Math.max(...Object.values(userCountsByDate)) / 0.5) * 0.5,
        stepSize: 0.5,
      },
    },
    elements: {
      line: {
        tension: 0.1,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="m-20 w-full flex flex-col items-center md:justify-center md:mt-16 gap-7">
      <div className="flex flex-col md:justify-between">
        <div className="flex flex-col md:flex-row items-center justify-around gap-5">
          {count.usersCount ? (
            <>
              <div className="w-[300px] p-5 rounded-lg shadow-md relative border border-[#F8F9FA]">
                <FaUsers className="text-4xl text-[#007BFF] absolute top-1/4 right-5" />
                <div>
                  <p className="text-base text-neutral-400">Students</p>
                  <span className="text-4xl">
                    {count.usersCount.studentsCount}
                  </span>
                </div>
              </div>

              <div className="w-[300px] p-5 rounded-lg shadow-md relative border border-[#F8F9FA]">
                <PiStudentBold className="text-4xl text-[#3fb445] absolute top-1/4 right-5" />
                <div>
                  <p className="text-base text-neutral-400">Alumni</p>
                  <span className="text-4xl">
                    {count.usersCount.alumniCount}
                  </span>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="w-[300px] p-5 rounded-lg shadow-md relative border border-[#F8F9FA]">
            <FaSuitcase className="text-3xl text-[#ffd000] absolute top-8 right-5" />
            <div>
              <h3 className="text-base text-neutral-400">Jobs</h3>
              <span className="text-4xl">{count.jobCount}</span>
            </div>
          </div>

          <div className="w-[300px] p-5 rounded-lg shadow-md relative border border-[#F8F9FA]">
            <FaBullhorn className="text-3xl text-[#ff2a2a] absolute top-8 right-5" />
            <div>
              <h3 className="text-base text-neutral-400">Events</h3>
              <span className="text-4xl">{count.eventCount}</span>
            </div>
          </div>
        </div>

        <div className="w-[300px] md:w-full flex flex-col md:flex-row justify-between">
          <div className="md:min-w-[1000px] h-auto md:mx-7 md:my-10 py-5 px-5 flex flex-col justify-between gap-5 items-center shadow-lg rounded-lg border border-[#F8F9FA]">
            <h1 className="text-xl font-semibold place-self-start">
              New Users
            </h1>
            <p className="text-sm text-neutral-500">
              Charting the Path to Success: Witness the impressive surge in new
              registered users on our admin dashboard! Each line tells a story
              of growth, engagement, and the ever-expanding community. Join the
              journey to excellence!
            </p>
            {userCounts.length > 0 ? (
              <Line data={data} options={options} />
            ) : (
              <p>Loading user data...</p>
            )}{" "}
          </div>
          <div className="w-full md:mx-7 my-10 py-5 px-5 shadow-lg border border-[#F8F9FA] flex flex-col justify-between gap-5 rounded-lg">
            <div className="">
              <h1 className="text-xl font-semibold">Recent Users</h1>
              <p className="text-sm text-neutral-500 mt-3">
                Most recently joined users
              </p>
              <div className="flex flex-col gap-5 mt-5">
                {latestUsers.map((data) => {
                  return (
                    <p className="shadow-sm border border-[#F8F9FA] rounded-lg p-5">
                      {data.name}
                    </p>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => navigate("/admin/users")}
              className="p-4 text-[#007BFF] hover:bg-[#007BFF] hover:text-white border rounded-lg"
            >
              Manage Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
