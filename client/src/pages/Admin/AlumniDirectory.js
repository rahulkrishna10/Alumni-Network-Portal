import React, { useEffect, useState } from "react";
import axios from "axios";

const AlumniDirectory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    axios
      .get(BASE_URL + "/admin/directory")
      .then((response) => setData(response.data))
      .catch((e) => console.log(e.message));
  }, []);

  const filteredData = data.filter((row) => row.isProfile);

  return (
    <div className="p-10">
      <h1 className="text-xl mx-10 font-mono">Alumni Directory</h1>
      <div className="flex justify-center mt-10">
        <table className="w-[80%] text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {filteredData.map((row, index) => (
                <React.Fragment key={index}>
                  {Object.keys(row).map((key, index) => (
                    <th className="p-5 font-mono font-light" key={index}>
                      {key}
                    </th>
                  ))}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr className="bg-white border-b" key={index}>
                {Object.values(row).map((value) => (
                  <td className="p-5" key={index}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlumniDirectory;
