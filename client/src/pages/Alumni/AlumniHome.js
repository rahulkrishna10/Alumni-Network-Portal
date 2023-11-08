import { useContext } from "react";

const AlumniHome = () => {
  const userState = JSON.parse(localStorage.getItem("userState"));
  return (
    <div className="p-5">
      <h1 className="text-xl font-mono">Welcome, {userState.name}</h1>
    </div>
  );
};

export default AlumniHome;
