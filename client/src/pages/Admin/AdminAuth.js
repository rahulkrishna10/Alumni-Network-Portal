import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../store/AdminContextProvider";
import AdminNavbar from "../../components/AdminNavbar.js";

const AdminAuth = ({ children }) => {
  const { isAuthenticated, dispatch } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("adminState");
    if (storedData) {
      dispatch({
        type: "AUTHENTICATED",
        payload: JSON.parse(storedData),
      });
    }
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    window.location.href = "/admin/login";
    return;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <AdminNavbar />
      {children}
    </div>
  );
};

export default AdminAuth;
