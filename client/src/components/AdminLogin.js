import React, { useState, useContext } from "react";
import { AdminContext } from "../store/AdminContextProvider";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login } = useContext(AdminContext);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
    <div className="bg-gray-900 text-black h-screen flex items-center justify-center">
      <div className="max-w-lg w-full m-5 md:m-0 p-8 bg-white rounded-md shadow-md">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
          Admin Login
        </h1>
        <form className="mb-6" onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={onChangeHandler}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            Login
          </button>
        </form>
        {error && (
          <p className="text-sm text-red-600">
            Username and password are required
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
