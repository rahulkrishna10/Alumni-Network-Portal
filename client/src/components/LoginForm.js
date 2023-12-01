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
      <div className="min-w-[50%] bg-white text-white flex flex-col gap-5 justify-center items-center">
        <div className="bg-black w-[800px] h-[800px] flex flex-col justify-center gap-5 p-24">
          <h1 className="text-5xl font-thin">Alumni Network Portal</h1>
          <p className="text-xl font-thin">
            Log in to the alumni network portal today to reconnect with old
            friends, find new mentors, and advance your career!
          </p>
        </div>
      </div>
      <div className="m-24 flex flex-col gap-5 justify-center md:w-[50%]">
        <div className="m-5">
          <h1 className="text-3xl font-thin">Login</h1>
          <p className="text-xl font-thin mt-3 hidden md:block">
            Welcome back! Please enter you details
          </p>
        </div>
        <form
          onSubmit={submitHandler}
          action="POST"
          className="w-full m-5 p-5 flex flex-col justify-center align-middle gap-5 rounded-lg md:min-w-[400px] lg:min-w-[400px]"
        >
          <input
            name="email"
            className="p-3 focus:outline-none border border-[#F8F9FA] rounded-xl"
            type="email"
            placeholder="Email"
            onChange={emailChangeHandler}
          />
          <div className="w-full flex align-middle justify-between gap-3 relative">
            <input
              name="password"
              className="w-full p-3 focus:outline-none border border-[#F8F9FA] rounded-xl"
              type={isShow ? "text" : "password"}
              placeholder="Password"
              onChange={passwordChangeHandler}
            />
            <button
              className="text-black absolute right-[2%] top-[30%]"
              type="button"
            >
              {isShow ? (
                <FaEye onClick={handleShowPassword} />
              ) : (
                <FaEyeSlash onClick={handleShowPassword} />
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
