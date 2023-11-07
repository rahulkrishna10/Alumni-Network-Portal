import React, { useState, useEffect } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi";
import axios from "axios";

const JobPost = () => {
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const onChangeHandler = (e) => {
    if (e.target.name === "type") {
      const selectedValue = e.target.options[e.target.selectedIndex].value;
      setFormData({
        ...formData,
        [e.target.name]: selectedValue,
      });
    } else if (e.target.name === "email" || e.target.name === "link") {
      const updatedContacts = {
        ...formData.contacts,
        [e.target.name]: e.target.value,
      };

      setFormData({
        ...formData,
        contacts: updatedContacts,
      });
    } else if (e.target.name === "required_skills") {
      const skillsArray = e.target.value
        .split(",")
        .map((skill) => skill.trim());
      setFormData({
        ...formData,
        required_skills: skillsArray,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const formSubmit = async (e) => {
    const BASE_URL = "http://localhost:3001";
    const userState = JSON.parse(localStorage.getItem("userState"));
    const headers = {
      Authorization: userState.token,
    };
    try {
      const response = await axios.post(BASE_URL + "/alumni/job", formData, {
        headers,
      });
      if (response.status === 201) {
        setSuccessMessage("Job Posting was successful");
        e.target.reset();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmit(e);
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000); // Hide the message after 5 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [successMessage]);

  return (
    <>
      <div className="my-5 px-20 py-10">
        <h1 className="text-3xl font-mono">Create Post</h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col my-3 border border-[#F8F9FA] gap-8 p-5"
        >
          <div className="flex">
            <div className="w-[100%] flex flex-col gap-1 p-2">
              <label className="text-lg text-gray-600" htmlFor="title">
                Job Title
              </label>
              <input
                onChange={onChangeHandler}
                className="p-2 outline-[#007BFF] border shadow-sm border-[#F8F9FA]"
                type="text"
                name="title"
              ></input>
            </div>
            <div className="w-[100%] flex flex-col gap-1 p-2">
              <label className="text-lg text-gray-600" htmlFor="company">
                Company Name
              </label>
              <input
                onChange={onChangeHandler}
                className="p-2 outline-[#007BFF] border shadow-sm border-[#F8F9FA]"
                type="text"
                name="company"
              ></input>
            </div>
          </div>
          <div className="flex">
            <div className="w-[100%] flex flex-col gap-1 p-2">
              <label
                className="text-lg text-gray-600"
                htmlFor="required_skills"
              >
                Skills Required (separate by commas)
              </label>
              <input
                onChange={onChangeHandler}
                className="p-2 outline-[#007BFF] border shadow-sm border-[#F8F9FA]"
                type="text"
                name="required_skills"
              />
            </div>
            <div className="w-[100%] flex flex-col gap-1 p-2">
              <label className="text-lg text-gray-600" htmlFor="type">
                Job Type
              </label>
              <select
                onChange={onChangeHandler}
                className="p-2 bg-white border-2 border-[#F8F9FA]"
                name="type"
              >
                <option defaultValue="#">Select</option>
                <option value="Full-time">Full Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="w-[100%] flex flex-col gap-1 p-2">
              <label
                className="text-lg text-gray-600"
                htmlFor="registration_date"
              >
                Last Date for Registration
              </label>
              <input
                onChange={onChangeHandler}
                className="p-2 outline-[#007BFF] border shadow-sm border-[#F8F9FA]"
                type="date"
                name="registration_date"
              />
            </div>
          </div>
          <div className="w-[100%] flex flex-col gap-1 p-2">
            <label className="text-lg text-gray-600" htmlFor="required_skills">
              Contacts
            </label>
            <div className="w-[100%] flex gap-2">
              <input
                onChange={onChangeHandler}
                className="flex-1 p-2 outline-[#007BFF] border border-[#F8F9FA] shadow-sm"
                type="email"
                placeholder="Eg : example@anp.com"
                name="email"
              />
              <input
                onChange={onChangeHandler}
                className="flex-1 p-2 outline-[#007BFF] border border-[#F8F9FA] shadow-sm"
                type="url"
                placeholder="Eg : www.anp.com"
                name="link"
              />
            </div>
          </div>
          <div className="w-[100%] flex flex-col gap-1 p-2">
            <label className="text-lg text-gray-600" htmlFor="description">
              Job Descripton
            </label>
            <textarea
              onChange={onChangeHandler}
              className="p-2 outline-[#007BFF] border shadow-sm border-[#F8F9FA]"
              rows={5}
              cols={30}
              name="description"
            />
          </div>
          <button
            type="submit"
            className="w-fit text-white font-mono bg-[#007BFF] p-2 mt-5"
          >
            Create Job Posting
          </button>
          {successMessage && (
            <div className="w-fit border rounded-md p-2 inline-flex gap-2">
              <HiOutlineCheckCircle className="self-center text-xl text-green-500" />
              <span className="text-lg">{successMessage}</span>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default JobPost;
