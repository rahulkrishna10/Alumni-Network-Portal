import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { MdOutlineArrowLeft } from "react-icons/md";

const EditJob = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const onChangeHandler = (e) => {
    if (e.target.name === "required_skills") {
      const skillsArray = e.target.value
        .split(",")
        .map((skill) => skill.trim());
      setFormData({
        ...formData,
        skills: skillsArray,
      });
    } else if (e.target.name === "email" || e.target.name === "link") {
      const updatedContact = {
        ...formData.contact,
        [e.target.name]: e.target.value,
      };
      setFormData({
        ...formData,
        contact: updatedContact,
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
      const response = await axios.patch(
        BASE_URL + "/alumni/job/" + data._id,
        formData,
        {
          headers,
        }
      );
      if (response.status === 200) {
        e.target.reset();
        alert(`Job Updated Successfully`);
        navigate(-1);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    formSubmit(e);
  };

  const onDeleteHandler = async (e) => {
    e.preventDefault();
    const BASE_URL = "http://localhost:3001";
    const userState = JSON.parse(localStorage.getItem("userState"));
    const headers = {
      Authorization: userState.token,
    };
    try {
      const response = await axios.delete(
        BASE_URL + "/alumni/job/" + data._id,
        { headers }
      );
      if (response.status === 200) {
        alert("Job Deleted Successfully");
        navigate(-1);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="m-10 px-32 relative">
      <div className="flex items-center absolute left-52">
        <MdOutlineArrowLeft className="text-black" />
        <button className="hover:underline" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
      <div className="my-5 px-20 py-10 ">
        <h1 className="text-3xl font-mono">Edit Job</h1>
        <form
          onSubmit={onsubmitHandler}
          className="flex flex-col my-3 border border-[#F8F9FA] gap-8 p-5 shadow-sm"
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
                defaultValue={data.title}
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
                defaultValue={data.company}
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
                defaultValue={data.required_skills}
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
                <option value="Full-time" selected={data.type === "Full-time"}>
                  Full Time
                </option>
                <option
                  value="Internship"
                  selected={data.type === "Internship"}
                >
                  Internship
                </option>
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
                defaultValue={data.registration_date}
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
                defaultValue={data.contact.email}
              />
              <input
                onChange={onChangeHandler}
                className="flex-1 p-2 outline-[#007BFF] border border-[#F8F9FA] shadow-sm"
                type="url"
                placeholder="Eg : www.anp.com"
                name="link"
                defaultValue={data.contact.link}
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
              defaultValue={data.description}
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="w-fit text-white font-mono bg-[#007BFF] p-2 mt-5"
            >
              Update Job
            </button>
            <button
              className="w-fit text-white font-mono bg-red-500 p-2 mt-5"
              onClick={onDeleteHandler}
            >
              Delete Job
            </button>
          </div>
          {/* {successMessage && (
            <div className="w-fit border rounded-md p-2 inline-flex gap-2">
              <HiOutlineCheckCircle className="self-center text-xl text-green-500" />
              <span className="text-lg">{successMessage}</span>
            </div>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default EditJob;
