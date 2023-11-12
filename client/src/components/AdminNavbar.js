import React, { useContext } from "react";
import { AdminContext } from "../store/AdminContextProvider";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  const { logout, adminState } = useContext(AdminContext);

  const logoutHandler = () => {
    logout(adminState.token);
  };

  return (
    <nav className="flex justify-between items-center px-5 py-3 shadow-sm h-[8%]">
      <span
        className="text-[#007BFF] text-2xl font-mono tracking-widest"
        title="Alumni Network Portal"
      >
        <NavLink to="/admin">ANP</NavLink>
      </span>
      <div className="flex flex-row items-center gap-5">
        <NavLink to="/admin/users">Manage Users</NavLink>
        <NavLink to="/admin/events">Events</NavLink>
        <NavLink to="/admin/directory">Alumni Directory</NavLink>
        <div className="flex flex-row items-center gap-2 border border-[#F8F9FA] p-2 relative hover:shadow-sm">
          <button className="text-black" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
