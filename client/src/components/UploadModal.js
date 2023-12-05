import React, { useState } from "react";
import axios from "axios";
import { SlClose } from "react-icons/sl";

const UplodaModal = ({ className, onClose }) => {
  const [file, setFile] = useState({});

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      console.log(formData);

      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3001/admin/users/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 0,
        }
      );

      if (response.status === 200) {
        alert("Users Created");
        window.location.reload();
      }

      console.log("File upload response:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  return (
    <div className={className}>
      <SlClose
        className="absolute top-[3%] right-[4%] text-lg cursor-pointer"
        onClick={onClose}
      />
      <div className="flex flex-col justify-evenly gap-5 p-5 md:py-16 md:px-5 rounded-xl shadow-xl">
        <h2 className="text-2xl text-center tracking-wide mb-5">File Upload</h2>
        <input type="file" onChange={handleFileChange} />
        <button
          className="text-[#007BFF] border p-2 rounded-md hover:text-white hover:bg-[#007BFF]"
          type="submit"
          onClick={handleUpload}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UplodaModal;
