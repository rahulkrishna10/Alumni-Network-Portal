import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import DeletePopup from "../../components/DeletePopup";
import NewUserModal from "../../components/NewUserModal";

const ManageUsers = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [modalPopup, setModalPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    axios
      .get(BASE_URL + "/admin/users")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((e) => console.log(e.message));
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const BASE_URL = "http://localhost:3001";
      await axios.delete(`${BASE_URL}/admin/user/${userId}`);

      const response = await axios.get(`${BASE_URL}/admin/users`);
      setData(response.data);
      setFilteredData(response.data);
      setPopup(false);
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = data.filter((user) =>
      Object.values(user).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTermLowerCase)
      )
    );
    setFilteredData(filtered);
  };

  const pageSize = 5;
  const totalPageCount = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const hasNextPage = (currentPage + 1) * pageSize < filteredData.length;

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
    <div className="md:m-20 w-full md:mt-16 gap-7 relative p-5">
      <div className={(`-z-50` && modalPopup) || popup ? `blur-sm` : ``}>
        <div className={`text-left w-full mt-3`}>
          <div className="flex flex-col md:flex-row justify-between">
            <span className="text-left font-mono text-2xl py-5">
              User Management
            </span>
            <div className="flex gap-5 items-center justify-between">
              <form
                className="flex items-center bg-[#F8F9FA] p-1 md:px-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search User"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-1 w-[200px] md:w-[250px] font-mono outline-none bg-inherit"
                />
                <button type="submit">
                  <FiSearch />
                </button>
              </form>
              <button
                className="bg-[#007BFF] text-white px-3 py-2 rounded-md"
                onClick={() => setModalPopup(!modalPopup)}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto shadow-md">
          <table className="md:w-full text-sm text-left text-black">
            <thead className="text-black capitalize border-b-2">
              <tr>
                {Object.keys(data[0] || {}).map(
                  (key, index) =>
                    !["isProfile", "password", "token", "__v"].includes(
                      key
                    ) && (
                      <th
                        className="px-5 text-[#474747] text-lg font-light"
                        key={index}
                      >
                        {key}
                      </th>
                    )
                )}
                <th className="p-5 text-[#474747] text-lg font-light">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  className="bg-white hover:bg-[#4da3ff] hover:text-white"
                  key={index}
                >
                  {Object.keys(row).map(
                    (key) =>
                      !["isProfile", "password", "token", "__v"].includes(
                        key
                      ) && (
                        <td className="p-5 text-[16px] text-base" key={key}>
                          {["createdAt", "updatedAt"].includes(key)
                            ? row[key]
                              ? new Date(row[key]).toLocaleString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  second: "numeric",
                                  hour12: true,
                                })
                              : "null"
                            : !row[key]
                            ? "null"
                            : row[key]}
                        </td>
                      )
                  )}
                  <td className="p-5">
                    <button
                      onClick={() => {
                        setPopup(!popup);
                        setSelectedUserId(row._id);
                      }}
                      className="text-red-500 text-2xl w-fit xl p-2 rounded-md"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
      </div>
      {popup ? (
        <DeletePopup
          className="absolute md:w-[600px] h-auto top-[35%] md:left-[25%] left-[14%] bg-white border p-8 rounded-3xl flex flex-col justify-between gap-8"
          onClose={() => setPopup(false)}
          onDelete={() => handleDeleteUser(selectedUserId)}
        />
      ) : (
        ""
      )}
      {modalPopup ? (
        <NewUserModal
          className="absolute bg-white h-auto md:w-[600px] top-[5%] left-[18%] md:left-[20%] z-50"
          onClose={() => setModalPopup(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ManageUsers;
