import React, { useState } from "react";
import axios from "axios";
import { SlClose } from "react-icons/sl";

const NewUserModal = ({ className, onClose }) => {
  const [formData, setFormData] = useState({});

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const BASE_URL = "http://localhost:3001";
    await axios
      .post(BASE_URL + "/users", formData)
      .then((response) => {
        alert("User Created");
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
        className="flex flex-col justify-evenly gap-5 border py-16 px-5 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl text-center tracking-widest mb-5">
          Create Account
        </h2>
        <div className="flex flex-col gap-2 justify-between px-2">
          <label className="text-base text-gray-600" htmlFor="name">
            Full Name
          </label>
          <input
            className="p-2 outline-none border shadow-sm border-[#F8F9FA] focus:border-[#007BFF]"
            type="text"
            name="name"
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-2 justify-between px-2">
          <label className="text-base text-gray-600" htmlFor="email">
            Email
          </label>
          <input
            className="p-2 outline-none border shadow-sm border-[#F8F9FA] focus:border-[#007BFF]"
            type="email"
            name="email"
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-2 justify-between px-2">
          <label className="text-base text-gray-600" htmlFor="password">
            Password
          </label>
          <input
            className="p-2 outline-none border shadow-sm border-[#F8F9FA] focus:border-[#007BFF]"
            type="password"
            name="password"
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-2 justify-between px-2">
          <label className="text-base text-gray-600" htmlFor="user_type">
            User Type
          </label>
          <select
            onChange={onChangeHandler}
            className="p-3 bg-white border"
            name="user_type"
            required
          >
            <option value="" selected>
              Select
            </option>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </select>
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

export default NewUserModal;
