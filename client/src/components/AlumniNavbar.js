import React, { useState, useContext } from "react";
import { FiUser, FiLogOut, FiSearch } from "react-icons/fi";
import { AuthContext } from "../store/AuthContextProvider";
import { NavLink, useNavigate } from "react-router-dom";

const AlumniNavbar = () => {
  const navigate = useNavigate();
  const { logout, userState } = useContext(AuthContext);
  const [isDropDown, setIsDropDown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropDownHandler = () => {
    setIsDropDown((prev) => !prev);
  };

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const logoutHandler = () => {
    logout(userState.token);
  };

  const searchButtonHandler = (e) => {
    e.preventDefault();
    e.target.reset();
    navigate(`/alumni/search/${searchValue ? searchValue : null}`);
  };

  return (
    <nav className="flex flex-row justify-between items-center px-5 py-3 shadow-sm h-[8%]">
      <span
        className="text-[#007BFF] text-2xl font-mono tracking-widest"
        title="Alumni Network Portal"
      >
        <span>ANP</span>
      </span>
      <div className="flex flex-row items-center gap-5">
        <div className="flex flex-row items-center gap-5 text-sm lg:text-base lg:pr-5 md:border-r-2 border-[#F8F9FA]">
          <form
            onSubmit={searchButtonHandler}
            className="flex items-center bg-[#F8F9FA] p-1 px-3"
          >
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="p-1 w-full md:w-[250px] font-mono outline-none bg-inherit"
              onChange={onChangeHandler}
            />
            <button type="submit">
              <FiSearch />
            </button>
          </form>
          <NavLink to="/alumni" className="hover:border-b border-[#007BFF]">
            Home
          </NavLink>
          <NavLink to="/alumni/job" className="hover:border-b border-[#007BFF]">
            Jobs
          </NavLink>
          <NavLink
            to="/alumni/events"
            className="hover:border-b border-[#007BFF]"
          >
            Events
          </NavLink>
        </div>
        <div className="flex flex-row items-center gap-2 border border-[#F8F9FA] p-2 relative hover:shadow-sm">
          <button
            className="text-black text-xs lg:text-base"
            onClick={dropDownHandler}
          >
            Account
          </button>
          {isDropDown && (
            <div className="flex flex-col items-center gap-2 absolute right-[0px] top-16 border border-[#F8F9FA] px-3 py-5 w-[150px] bg-white z-10">
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

export default AlumniNavbar;
