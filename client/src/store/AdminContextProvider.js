import { createContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

const initialState = {
  isAuthenticated: false,
  adminState: {},
};

const AdminReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        adminState: action.payload,
      };
    case "AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: true,
        adminState: action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};
const BASE_URL = "http://localhost:3001";

const AdminContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(AdminReducer, initialState);

  const login = async (formData) => {
    try {
      const response = await axios.post(BASE_URL + "/admin/login", formData);
      const adminData = response.data;
      console.log("Working");
      dispatch({
        type: "LOGIN",
        payload: adminData,
      });
      localStorage.setItem("adminState", JSON.stringify(adminData));
      navigate("/admin");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const logout = async (token) => {
    try {
      localStorage.removeItem("adminState");
      navigate("/admin/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        adminState: state.adminState,
        login,
        logout,
        dispatch,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
