import React, { useState, useContext } from "react";
import { FiUser, FiLogOut, FiBell } from "react-icons/fi";
import { AuthContext } from "../store/AuthContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { logout, userState } = useContext(AuthContext);
  const [isDropDown, setIsDropDown] = useState(false);
  const dropDownHandler = () => {
    setIsDropDown((prev) => !prev);
  };

  const logoutHandler = () => {
    logout(userState.token);
  };

  return (
    <nav className="flex justify-between items-center px-5 py-3 shadow-sm h-[8%]">
      <span
        className="text-[#007BFF] text-2xl font-mono tracking-widest"
        title="Alumni Network Portal"
      >
        <NavLink to="/alumni">ANP</NavLink>
      </span>
      <div className="flex flex-row items-center gap-5">
        <NavLink to="/alumni/job">Jobs</NavLink>
        <NavLink to="/alumni/events">Events</NavLink>
        <div className="p-2">
          <FiBell className="text-lg" />
        </div>
        <div className="flex flex-row items-center gap-2 border border-[#F8F9FA] p-2 relative">
          <button className="text-black" onClick={dropDownHandler}>
            My Account
          </button>
          {isDropDown && (
            <div className="flex flex-col items-center gap-2 absolute right-[0px] top-16 border border-[#F8F9FA] px-3 py-5 w-[150px]">
              <NavLink
                onClick={() => {
                  setIsDropDown(false);
                }}
                to="/alumni/profile"
                className="flex flex-row items-center gap-2"
              >
                <FiUser />
                Profile
              </NavLink>
              <button
                onClick={logoutHandler}
                className="flex flex-row items-center gap-2"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
