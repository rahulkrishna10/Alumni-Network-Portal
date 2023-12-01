import React, { useState, useContext } from "react";
import { AdminContext } from "../store/AdminContextProvider";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login } = useContext(AdminContext);

  const [error, setError] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (!username || !password) {
      setError(true);
    } else {
      setError(false);
      login(formData);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border border-[#F8F8FA]">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center gap-5 p-8"
        >
          <div className="flex gap-3 items-center">
            <label htmlFor="username">Username</label>
            <input
              onChange={onChangeHandler}
              type="text"
              name="username"
              className="bg-[#F8F9FA] p-2"
            />
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor="password">Password</label>
            <input
              onChange={onChangeHandler}
              type="password"
              name="password"
              className="bg-[#F8F9FA] p-2"
            />
          </div>
          <button type="submit" className="bg-[#007BFF] text-white p-3 w-full">
            Login
          </button>
          {error ? (
            <span className="text-red-600">
              Username and password are required
            </span>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
