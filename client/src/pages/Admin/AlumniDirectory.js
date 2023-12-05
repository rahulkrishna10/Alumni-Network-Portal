import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleLeft, FaAngleRight, FaFileCsv } from "react-icons/fa6";

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

  const pageSize = 5;
  const totalPageCount = Math.ceil(data.length / pageSize);

  const filteredData = data
    .filter((row) =>
      selectedYear ? row.passingOutYear === +selectedYear : row.isProfile
    )
    .slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const hasNextPage = (currentPage + 1) * pageSize < data.length;

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
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

  const downloadCsv = () => {
    const csvContent = filteredData.map((row) =>
      Object.keys(row)
        .filter((key) => key !== "isProfile")
        .map((key) => (row[key] ? row[key] : "null"))
        .join(",")
    );

    const csvString = csvContent.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "alumni_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="md:p-10 w-full md:mt-14 p-5">
      <h1 className="text-2xl mx-5 md:mx-10 font-mono">Alumni Directory</h1>
      <div className="mx-5 md:mx-10 md:mt-6">
        <label className="mr-2">Filter:</label>
        <select
          className="p-2 bg-white border rounded-s"
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
      </div>

      <div className="md:mx-10 md:my-20 flex flex-col items-start md:mt-10 p-5 shadow-md overflow-x-auto">
        <table className="w-full text-left text-black">
          <thead className="text-black text-base capitalize border-b-2">
            <tr>
              {Object.keys(filteredData[0] || {}).map(
                (key, index) =>
                  key !== "isProfile" && (
                    <th
                      className="p-5 text-[#474747] text-lg font-light"
                      key={index}
                    >
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
          <button
            className="p-2 w-8 h-8 border flex items-center text-black text-xs rounded-full"
            title="Download Alumni Data"
            onClick={downloadCsv}
          >
            <FaFileCsv />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniDirectory;
