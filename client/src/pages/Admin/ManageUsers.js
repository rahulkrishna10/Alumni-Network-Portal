import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import DeletePopup from "../../components/DeletePopup";

const ManageUsers = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <div className="m-20 flex flex-col items-start mt-10 gap-7 relative">
      <table className="w-full text-sm text-left text-black shadow-md">
        <caption className="text-left">
          <div className="flex justify-between">
            <span className="text-left font-light text-2xl py-5">
              User Management
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
                  placeholder="Search User"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-1 w-[250px] font-mono outline-none bg-inherit"
                />
                <button type="submit">
                  <FiSearch />
                </button>
              </form>
              <button className="bg-[#007BFF] text-white px-3 py-2 rounded-md">
                Add User
              </button>
            </div>
          </div>
        </caption>
        <thead className="text-black capitalize border-b-2">
          <tr>
            {Object.keys(data[0] || {}).map(
              (key, index) =>
                !["isProfile", "password", "token", "__v"].includes(key) && (
                  <th
                    className="px-5 text-[#474747] text-lg font-light"
                    key={index}
                  >
                    {key}
                  </th>
                )
            )}
            <th className="p-5 text-[#474747] text-lg font-light">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((row, index) => (
            <tr
              className="bg-white hover:bg-[#4da3ff] hover:text-white"
              key={index}
            >
              {Object.keys(row).map(
                (key) =>
                  !["isProfile", "password", "token", "__v"].includes(key) && (
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
      {popup ? (
        <DeletePopup
          className="absolute w-[600px] h-auto top-[45%] left-[35%] bg-white border p-8 rounded-3xl flex flex-col justify-between gap-8"
          onClose={() => setPopup(false)}
          onDelete={() => handleDeleteUser(selectedUserId)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ManageUsers;
