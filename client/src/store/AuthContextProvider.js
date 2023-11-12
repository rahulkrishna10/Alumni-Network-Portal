import React, { createContext, useReducer } from "react";
// import { AuthContext } from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  userState: {},
};

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = async (formData) => {
    try {
      const response = await axios.post(BASE_URL + "/users/login", formData);
      const userData = response.data;
      dispatch({
        type: "LOGIN",
        payload: userData,
      });
      localStorage.setItem("userState", JSON.stringify(userData));
      if (userData.user_type === "alumni") {
        navigate("/alumni");
      } else if (userData.user_type === "student") {
        navigate("/student");
      }
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const logout = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.post(BASE_URL + "/users/logout", {}, { headers });
      dispatch({
        type: "LOGOUT",
      });
      localStorage.removeItem("userState");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        userState: state.userState,
        login,
        logout,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
