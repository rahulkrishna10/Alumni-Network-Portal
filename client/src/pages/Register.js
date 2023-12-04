import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
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
        localStorage.setItem("userState", JSON.stringify(response.data));
        if (formData.user_type === "alumni") {
          navigate("/alumni");
        } else {
          navigate("/student");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="lg:w-[50%] flex flex-col justify-evenly border p-10 lg:px-20 py-10 gap-5 shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-mono">Create Account</h2>
        <div className="flex flex-col gap-2 justify-between">
          <label className="text-base text-gray-600" htmlFor="name">
            Name
          </label>
          <input
            className="p-2 outline-none border-2 focus:border-[#007BFF]"
            type="text"
            name="name"
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <label className="text-base text-gray-600" htmlFor="email">
            Email
          </label>
          <input
            className="p-2 outline-none border-2 focus:border-[#007BFF]"
            type="email"
            name="email"
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <label className="text-base text-gray-600" htmlFor="password">
            Password
          </label>
          <input
            className="p-2 outline-none border-2 focus:border-[#007BFF]"
            type="password"
            name="password"
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-2 justify-between">
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
          Create Account
        </button>
        <p>
          Already have an account?{" "}
          <NavLink to="/login" className="hover:underline text-[#007BFF]">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
