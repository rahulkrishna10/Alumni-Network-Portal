import React, { useState } from "react";
import axios from "axios";
import { SlClose } from "react-icons/sl";

const CreateEvent = ({ className, onClose }) => {
  const [formData, setFormData] = useState({});

  const onChangeHandler = (e) => {
    if (e.target.name === "category") {
      const selectedValue = e.target.options[e.target.selectedIndex].value;
      setFormData({
        ...formData,
        [e.target.name]: selectedValue,
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

    try {
      const response = await axios.post(BASE_URL + "/admin/event", formData);
      if (response.status === 201) {
        alert("Event Created");
        onClose();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmit(e);
    onClose();
  };

  return (
    <div className={className}>
      <SlClose
        className="absolute top-[3%] right-[4%] text-lg cursor-pointer"
        onClick={onClose}
      />
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-evenly gap-5 md:py-12 md:px-5 p-5 rounded-xl shadow-xl"
      >
        <h1 className="text-2xl text-center tracking-wide mb-5">
          Create Event
        </h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-[100%] flex flex-col gap-1 p-2">
            <label className="text-lg text-gray-600" htmlFor="title">
              Title
            </label>
            <input
              onChange={onChangeHandler}
              className="p-2 outline-[#007BFF] border shadow-sm border-[#F8F9FA]"
              type="text"
              name="title"
            ></input>
          </div>
          <div className="w-[100%] flex flex-col gap-1 p-2">
            <label className="text-lg text-gray-600" htmlFor="location">
              Location
            </label>
            <input
              onChange={onChangeHandler}
              className="p-2 outline-[#007BFF] border shadow-sm border-[#F8F9FA]"
              type="text"
              id="location"
              name="location"
            ></input>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-[100%] flex flex-col gap-1 p-2">
            <label className="text-lg text-gray-600" htmlFor="type">
              Event exclusively for
            </label>
            <select
              onChange={onChangeHandler}
              className="p-2 bg-white border-2 border-[#F8F9FA]"
              name="category"
            >
              <option defaultValue="#">Select</option>
              <option value="alumni">alumni</option>
              <option value="students">students</option>
              <option value="all">all</option>
            </select>
          </div>
          <div className="w-[100%] flex flex-col gap-1 p-2">
            <label
              className="text-lg text-gray-600"
              htmlFor="registration_date"
            >
              Event Date
            </label>
            <input
              onChange={onChangeHandler}
              className="p-2 outline-[#007BFF] border shadow-sm border-[#F8F9FA]"
              type="date"
              name="startDate"
            />
          </div>
        </div>
        <div className="w-[100%] flex flex-col gap-1 p-2">
          <h2 className="text-lg text-gray-600">Contacts</h2>
          <div className="w-[100%] flex flex-col md:flex-row gap-2">
            <input
              onChange={onChangeHandler}
              className="flex-1 p-2 outline-[#007BFF] border border-[#F8F9FA] shadow-sm"
              type="email"
              placeholder="Eg : example@anp.com"
              name="contactEmail"
            />
            <input
              onChange={onChangeHandler}
              className="flex-1 p-2 outline-[#007BFF] border border-[#F8F9FA] shadow-sm"
              type="url"
              placeholder="Eg : www.anp.com"
              name="registrationLink"
            />
            <input
              onChange={onChangeHandler}
              className="flex-1 p-2 outline-[#007BFF] border border-[#F8F9FA] shadow-sm"
              type="text"
              placeholder="Eg : 1234567890"
              name="contactPhone"
            />
          </div>
        </div>
        <div className="w-[100%] flex flex-col gap-1 p-2">
          <label className="text-lg text-gray-600" htmlFor="description">
            Descripton
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
          className="hover:text-white border hover:bg-[#007BFF] p-2 mt-5"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
