import { useEffect, useState } from "react";
import { FaUsers, FaSuitcase, FaBullhorn } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import axios from "axios";

const AdminHome = () => {
  const [count, setCount] = useState({});

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

    fetchData("/admin/event/count", "eventCount");
    fetchData("/admin/job/count", "jobCount");
    fetchData("/admin/users/count", "usersCount");
  }, []);

  return (
    <div className="m-20 w-full mt-16 gap-7">
      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-around gap-5">
          {count.usersCount ? (
            <>
              <div className="w-[300px] flex justify-around items-center gap-2 p-5 py-10 rounded-lg shadow-md">
                <div>
                  <p className="text-lg text-neutral-400">Students</p>
                  <span className="text-4xl">
                    {count.usersCount.studentsCount}
                  </span>
                </div>
                <FaUsers className="text-4xl text-[#007BFF]" />
              </div>

              <div className="w-[300px] flex justify-around items-center gap-2 p-5 py-10 rounded-lg shadow-md">
                <div>
                  <p className="text-lg text-neutral-400">Alumni</p>
                  <span className="text-4xl">
                    {count.usersCount.alumniCount}
                  </span>
                </div>
                <PiStudentBold className="text-4xl text-[#007BFF]" />
              </div>
            </>
          ) : (
            ""
          )}

          <div className="w-[300px] flex justify-around items-center gap-2 p-5 py-10 rounded-lg shadow-md">
            <div>
              <h3 className="text-xl text-neutral-400">Jobs</h3>
              <span className="text-4xl">{count.jobCount}</span>
            </div>
            <FaSuitcase className="text-4xl text-[#007BFF]" />
          </div>

          <div className="w-[300px] flex justify-around items-center gap-2 p-5 py-10 rounded-lg shadow-md">
            <div>
              <h3 className="text-xl text-neutral-400">Events</h3>
              <span className="text-4xl">{count.eventCount}</span>
            </div>
            <FaBullhorn className="text-4xl text-[#007BFF]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
