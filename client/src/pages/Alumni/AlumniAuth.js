import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import Navbar from "../../components/Navbar";

const AlumniAuth = ({ children }) => {
  const { isAuthenticated, dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("userState");
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
    window.location.href = "/login";
    return;
  }

  return (
    <div className="h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default AlumniAuth;
