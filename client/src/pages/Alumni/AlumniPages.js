import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";

const AlumniPages = () => {
  const { isAuthenticated, userState, logout, dispatch } =
    useContext(AuthContext);
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

  const logoutHandler = () => {
    logout(userState.token);
  };

  return (
    <div>
      <p>Welcome back, {userState.name}</p>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default AlumniPages;
