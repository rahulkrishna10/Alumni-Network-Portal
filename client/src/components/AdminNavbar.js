import React, { useContext } from "react";
import { AdminContext } from "../store/AdminContextProvider";
import { SlHome, SlNote, SlMap, SlUser, SlLogout } from "react-icons/sl";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const { logout, adminState } = useContext(AdminContext);
  const location = useLocation();

  const logoutHandler = () => {
    logout(adminState.token);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="flex flex-col items-center gap-10 px-5 py-3 shadow-lg min-w-[15%]">
      <span
        className="text-[#007BFF] mt-20 text-2xl font-mono tracking-widest"
        title="Alumni Network Portal"
      >
        <span to="/admin/" className="font-semibold">
          ADMIN
        </span>
      </span>
      <div className="flex flex-col gap-5 min-w-[180px]">
        <NavLink
          to="/admin/"
          className={`flex gap-2 items-center w-fit ${
            isActive("/admin/") &&
            "px-3 py-2 bg-[#007BFF] text-white rounded-lg"
          }`}
        >
          <SlHome className="" />
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/users"
          className={`flex gap-2 items-center w-fit ${
            isActive("/admin/users") &&
            "px-3 py-2 bg-[#007BFF] text-white rounded-lg"
          }`}
        >
          <SlUser />
          Manage Users
        </NavLink>
        <NavLink
          to="/admin/events"
          className={`flex gap-2 items-center w-fit ${
            isActive("/admin/events") &&
            "px-3 py-2 bg-[#007BFF] text-white rounded-lg"
          }`}
        >
          <SlMap />
          Events
        </NavLink>
        <NavLink
          to="/admin/directory"
          className={`flex gap-2 items-center w-fit ${
            isActive("/admin/directory") &&
            "px-3 py-2 bg-[#007BFF] text-white rounded-lg"
          }`}
        >
          <SlNote />
          Alumni Directory
        </NavLink>
        <button
          className="flex gap-2 items-center text-black text-left"
          onClick={logoutHandler}
        >
          <SlLogout />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
