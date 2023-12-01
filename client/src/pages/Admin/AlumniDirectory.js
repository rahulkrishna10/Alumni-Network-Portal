import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const AlumniDirectory = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    axios
      .get(BASE_URL + "/admin/directory")
      .then((response) => setData(response.data))
      .catch((e) => console.log(e.message));
  }, []);

  const pageSize = 6;
  const totalPageCount = Math.ceil(data.length / pageSize);

  const filteredData = data
    .filter((row) =>
      selectedYear ? row.passingOutYear == selectedYear : row.isProfile
    )
    .slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const hasNextPage = (currentPage + 1) * pageSize < data.length;

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    console.log("Year selected");
    setCurrentPage(0);
  };

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
    <div className="p-10">
      <h1 className="text-2xl mx-20 font-mono">Alumni Directory</h1>
      <select
        className="mx-20 p-2 mt-6 bg-white border rounded-s"
        onChange={handleYearChange}
      >
        <option value="">Select Year</option>
        {Array.from({ length: 11 }, (_, index) => {
          const year = 2017 + index;
          return (
            <option key={index} value={year}>
              {year}
            </option>
          );
        })}
      </select>

      <div className="m-20 flex flex-col items-start mt-10">
        <table className="w-full text-sm text-left border-2 border-[#F8F9FA] text-black shadow-sm">
          <thead className="text-xl text-black capitalize">
            <tr>
              {Object.keys(filteredData[0] || {}).map(
                (key, index) =>
                  key !== "isProfile" && (
                    <th className="p-5 text-[#474747] font-normal" key={index}>
                      {key === "passingOutYear"
                        ? "Passing Out Year"
                        : key === "dateOfBirth"
                        ? "Date Of Birth"
                        : key}
                    </th>
                  )
              )}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, index) => (
              <tr
                className="bg-white hover:bg-[#4da3ff] hover:cursor-pointer hover:text-white"
                key={index}
              >
                {Object.keys(row).map(
                  (key) =>
                    key !== "isProfile" && (
                      <td className="p-5 text-[16px] font-medium" key={key}>
                        {key === "dateOfBirth"
                          ? row[key]
                            ? new Date(row[key]).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "null"
                          : !row[key]
                          ? "null"
                          : row[key]}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-5 m-5 justify-center">
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

          {currentPage < totalPageCount - 1 && (
            <button
              className="p-2 w-8 h-8 border flex items-center text-black text-xs rounded-full"
              onClick={handleNextPage}
            >
              <FaAngleRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlumniDirectory;
