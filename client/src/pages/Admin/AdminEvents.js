import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import DeletePopup from "../../components/DeletePopup";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import EventsPost from "../../components/EventsPost";

const AlumniEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [popup, setPopup] = useState(false);
  const [modalPopup, setModalPopup] = useState(false);

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";

    axios
      .get(BASE_URL + "/admin/events")
      .then((response) => {
        setEvents(response.data);
        setFilteredEvents(response.data);
      })
      .catch((e) => console.log(e.message));
    // eslint-disable-next-line
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      const BASE_URL = "http://localhost:3001";
      await axios.delete(`${BASE_URL}/admin/event/${eventId}`);

      const response = await axios.get(`${BASE_URL}/admin/events`);
      setEvents(response.data);
      setFilteredEvents(response.data);
      setPopup(false);
    } catch (error) {
      console.error("Error deleting event:", error.message);
    }
  };

  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = events.filter((event) =>
      Object.values(event).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTermLowerCase)
      )
    );
    setFilteredEvents(filtered);
  };

  const handleEditEvent = (eventId) => {
    console.log(`Edit event with ID: ${eventId}`);
  };

  const pageSize = 5;
  const totalPageCount = Math.ceil(filteredEvents.length / pageSize);

  const paginatedEvents = filteredEvents.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const hasNextPage = (currentPage + 1) * pageSize < filteredEvents.length;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPageCount - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="m-20 w-full mt-16 gap-7 relative">
      <div className={(`-z-50` && popup) || modalPopup ? `blur-sm` : ``}>
        <div className={`text-left w-full mt-3`}>
          <div className="flex justify-between">
            <span className="text-left font-mono text-2xl py-5">
              Alumni Events
            </span>
            <div className="flex gap-5 items-center">
              <form
                className="flex items-center bg-[#F8F9FA] p-1 px-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search Event"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-1 w-[250px] font-mono outline-none bg-inherit"
                />
                <button type="submit">
                  <FiSearch />
                </button>
              </form>
              <button
                className="bg-[#007BFF] text-white px-3 py-2 rounded-md"
                onClick={() => setModalPopup(!modalPopup)}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
        {filteredEvents.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">No events found.</div>
        ) : (
          <table className="w-full text-sm text-left text-black shadow-md">
            <thead className="text-black capitalize border-b-2">
              <tr>
                {Object.keys(events[0] || {}).map(
                  (key, index) =>
                    !["__v", "rsvp", "description"].includes(key) && (
                      <th
                        className="px-5 text-[#474747] text-lg font-light"
                        key={index}
                      >
                        {key}
                      </th>
                    )
                )}
                <th className="p-5 text-[#474747] text-lg font-light">
                  RSVP (Yes)
                </th>
                <th className="p-5 text-[#474747] text-lg font-light">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvents.map((event, index) => (
                <tr className="bg-white" key={index}>
                  {Object.keys(event).map(
                    (key) =>
                      !["__v", "rsvp", "description"].includes(key) && (
                        <td className="p-5 text-[16px] text-base" key={key}>
                          {key === "startDate"
                            ? event[key]
                              ? new Date(event[key]).toLocaleString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })
                              : "null"
                            : !event[key]
                            ? "null"
                            : event[key]}
                        </td>
                      )
                  )}
                  <td className="p-5">
                    {event.rsvp
                      ? event.rsvp.filter(
                          (response) => response.response === "yes"
                        ).length
                      : 0}
                  </td>
                  <td className="p-5">
                    <div className="flex gap-2 justify-between rounded-md">
                      <button
                        className="border p-2"
                        onClick={() => handleEditEvent(event._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="border p-2"
                        onClick={() => {
                          setPopup(!popup);
                          setSelectedEventId(event._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {filteredEvents.length > 0 && (
          <div className="flex gap-5 m-5">
            {currentPage > 0 && (
              <button
                className="p-2 w-8 h-8 border flex items-center text-black text-xs rounded-full"
                onClick={handlePrevPage}
              >
                <FaAngleLeft />
              </button>
            )}

            {Array.from({ length: totalPageCount }, (_, index) => (
              <button
                key={index}
                className={`p-2 flex items-center justify-center ${
                  currentPage === index
                    ? "bg-blue-500 w-8 h-8 text-s text-white rounded-full"
                    : "w-8 h-8 text-s text-black rounded-full border"
                }`}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            ))}

            {hasNextPage && (
              <button
                className="p-2 w-8 h-8 border flex items-center text-black text-xs rounded-full"
                onClick={handleNextPage}
              >
                <FaAngleRight />
              </button>
            )}
          </div>
        )}
      </div>
      {popup ? (
        <DeletePopup
          className="absolute w-[600px] h-auto top-[35%] left-[25%] bg-white border p-8 rounded-3xl flex flex-col justify-between gap-8"
          onClose={() => setPopup(false)}
          onDelete={() => handleDeleteEvent(selectedEventId)}
        />
      ) : (
        ""
      )}
      {modalPopup ? (
        <EventsPost
          className="absolute bg-white h-auto w-[700px] top-[5%] left-[17%] z-50"
          onClose={() => setModalPopup(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AlumniEvents;
