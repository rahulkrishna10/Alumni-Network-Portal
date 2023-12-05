import axios from "axios";
import React, { useEffect, useState } from "react";
import { SlClose } from "react-icons/sl";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";

const RSVPModal = ({ className, selectedEventId, onClose }) => {
  const [rsvpData, setRSVPData] = useState([]);
  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    axios
      .get(BASE_URL + "/admin/event/" + selectedEventId)
      .then((response) => {
        setRSVPData(response.data);
      })
      .catch((err) => console.error(err.details));
  }, []);

  return (
    <div className={className}>
      <SlClose
        className="absolute top-[3%] right-[4%] text-lg cursor-pointer"
        onClick={onClose}
      />
      <div className="flex flex-col justify-evenly gap-5 md:py-12 md:px-5 p-5">
        <h1 className="text-2xl text-center tracking-wide mb-5">RSVP</h1>
        {rsvpData.length > 0 ? (
          <div className="w-[100%] flex flex-col gap-5">
            {rsvpData.map((data) => (
              <div className="flex items-center gap-2">
                <span className="text-xl text-black">{data.name}</span>
                {data.response === "yes" ? (
                  <CiCircleCheck className="text-xl text-green-500" />
                ) : (
                  <CiCircleRemove className="text-xl text-red-500" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No RSVP for this events.</p>
        )}
      </div>
    </div>
  );
};

export default RSVPModal;
