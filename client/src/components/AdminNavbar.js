import React, { useContext, useState } from "react";
import { AdminContext } from "../store/AdminContextProvider";
import { SlHome, SlNote, SlMap, SlUser, SlLogout } from "react-icons/sl";
import { GrClose } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const { logout, adminState } = useContext(AdminContext);
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const logoutHandler = () => {
    logout(adminState.token);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="flex md:flex-col items-start justify-between md:justify-start md:items-center gap-10 md:px-5 md:py-3 md:shadow-lg md:min-w-[15%]">
      <span
        className="text-[#007BFF] md:mt-20 m-5 text-2xl font-mono"
        title="Alumni Network Portal"
      >
        <NavLink to="/admin/" className="font-semibold">
          A D M I N
        </NavLink>
      </span>

      <div className="md:hidden cursor-pointer" onClick={toggleMobileMenu}>
        <RxHamburgerMenu className="m-5" />
      </div>

      <div
        className={`md:flex flex-col gap-5 min-w-[180px] ${
          isMobileMenuOpen
            ? "flex justify-center p-10 absolute w-full h-full bg-white z-10"
            : "hidden"
        }`}
      >
        {isMobileMenuOpen ? (
          <GrClose
            className="absolute top-5 right-5 text-2xl cursor-pointer"
            onClick={toggleMobileMenu}
          />
        ) : (
          ""
        )}
        {isMobileMenuOpen ? (
          <span className="w-full text-[#007BFF] font-semibold">A D M I N</span>
        ) : (
          ""
        )}
        <NavLink
          to="/admin/"
          onClick={() => setMobileMenuOpen(false)}
          className={`flex gap-2 items-center w-full md:w-fit ${
            isActive("/admin/") &&
            "px-3 py-2 bg-[#007BFF] text-white rounded-lg"
          }`}
        >
          <SlHome className="" />
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/users"
          onClick={() => setMobileMenuOpen(false)}
          className={`flex gap-2 items-center w-full md:w-fit ${
            isActive("/admin/users") &&
            "px-3 py-2 bg-[#007BFF] text-white rounded-lg"
          }`}
        >
          <SlUser />
          Manage Users
        </NavLink>
        <NavLink
          to="/admin/events"
          onClick={() => setMobileMenuOpen(false)}
          className={`flex gap-2 items-center w-full md:w-fit ${
            isActive("/admin/events") &&
            "px-3 py-2 bg-[#007BFF] text-white rounded-lg"
          }`}
        >
          <SlMap />
          Events
        </NavLink>
        <NavLink
          to="/admin/directory"
          onClick={() => setMobileMenuOpen(false)}
          className={`flex gap-2 items-center w-full md:w-fit ${
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
