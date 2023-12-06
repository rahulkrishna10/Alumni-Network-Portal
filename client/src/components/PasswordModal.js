import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../store/AuthContextProvider";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { SlClose } from "react-icons/sl";

const PasswordModal = ({ className, onClose }) => {
  const [isShowCurrent, setIsShowCurrent] = useState(false);
  const [isShownew, setIsShowNew] = useState(false);

  const { userState } = useContext(AuthContext);

  const [formData, setFormData] = useState({});

  const handleShowPasswordCurrent = (e) => {
    e.preventDefault();
    setIsShowCurrent(!isShowCurrent);
  };

  const handleShowPasswordNew = (e) => {
    e.preventDefault();
    setIsShowNew(!isShownew);
  };

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const BASE_URL = "http://localhost:3001";
    const headers = {
      Authorization: `Bearer ${userState.token}`,
    };
    await axios
      .patch(BASE_URL + "/users/change-password", formData, { headers })
      .then((response) => {
        alert("Password Changed");
        onClose();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className={className}>
      <SlClose
        className="absolute top-[3%] right-[4%] text-lg cursor-pointer"
        onClick={onClose}
      />
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-evenly gap-5 p-5 md:py-16 md:px-5 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl text-center tracking-wide mb-5">
          Change Password
        </h2>
        <div className="flex flex-col gap-2 justify-between px-2 relative">
          <label className="text-base text-gray-600" htmlFor="name">
            Current Password
          </label>
          <input
            className="p-2 outline-none border shadow-sm focus:border-[#007BFF]"
            type={isShowCurrent ? "text" : "password"}
            name="currentPassword"
            onChange={onChangeHandler}
            required
          />
          <button
            className="text-black absolute right-[3%] top-[60%]"
            type="button"
          >
            {isShowCurrent ? (
              <FaEye onClick={handleShowPasswordCurrent} />
            ) : (
              <FaEyeSlash onClick={handleShowPasswordCurrent} />
            )}
          </button>
        </div>
        <div className="flex flex-col gap-2 justify-between px-2 relative">
          <label className="text-base text-gray-600" htmlFor="email">
            New Password
          </label>
          <input
            className="p-2 outline-none border shadow-sm focus:border-[#007BFF]"
            type={isShownew ? "text" : "password"}
            name="newPassword"
            onChange={onChangeHandler}
            required
          />
          <button
            className="text-black absolute right-[3%] top-[60%]"
            type="button"
          >
            {isShownew ? (
              <FaEye onClick={handleShowPasswordNew} />
            ) : (
              <FaEyeSlash onClick={handleShowPasswordNew} />
            )}
          </button>
        </div>

        <button
          className="text-[#007BFF] border p-2 rounded-md hover:text-white hover:bg-[#007BFF]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordModal;
