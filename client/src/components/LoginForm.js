import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../store/AuthContextProvider";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [isShow, setIsShow] = useState(false);
  const handleShowPassword = (e) => {
    e.preventDefault();
    setIsShow(!isShow);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const emailChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setError(true);
    } else {
      setError(false);
      login(formData);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-row justify-center">
      <div className="min-w-[50%] bg-black text-white p-24 hidden lg:flex lg:flex-col gap-5 justify-center align-middle">
        <h1 className="text-5xl font-thin">Alumni Network Portal</h1>
        <p className="text-xl font-thin">
          Log in to the alumni network portal today to reconnect with old
          friends, find new mentors, and advance your career!
        </p>
      </div>
      <div className="w-screen m-24 flex flex-col gap-5 justify-center md:w-[50%]">
        <div className="m-5">
          <h1 className="text-3xl font-thin">Login</h1>
          <p className="text-xl font-thin mt-3 hidden md:block">
            Welcome back! Please enter you details
          </p>
        </div>
        <form
          onSubmit={submitHandler}
          action="POST"
          className="w-full m-5 p-5 border border-slate-100 flex flex-col justify-center align-middle gap-5 rounded-lg md:min-w-[400px] lg:min-w-[400px]"
        >
          <input
            name="email"
            className="p-1 focus:outline-none border-[#0f0f0f] focus:border-b-2 duration-75 ease-in-out"
            type="email"
            placeholder="Email"
            onChange={emailChangeHandler}
          />
          <div className="w-full flex align-middle justify-between">
            <input
              name="password"
              className="w-full p-1 focus:outline-none border-[#0f0f0f] focus:border-b-2 duration-75 ease-in-out"
              type={isShow ? "text" : "password"}
              placeholder="Password"
              onChange={passwordChangeHandler}
            />
            <button className="text-black" type="button">
              {isShow ? (
                <FaEyeSlash onClick={handleShowPassword} />
              ) : (
                <FaEye onClick={handleShowPassword} />
              )}
            </button>
          </div>
          <button
            className="p-3 bg-[#242424] text-white hover:bg-[#0f0f0f] shadow-sm"
            type="submit"
          >
            Login
          </button>
          <p className="text-gray-500">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-[#007BFF] hover:underline">
              Register here
            </NavLink>
          </p>
          {error && (
            <p className="p-3 border border-red-600 bg-red-100 text-red-600">
              Email and Password is Required!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
