import axios from "axios";
import React, { useState } from "react";

const CreateProfile = () => {
  const [formData, setFormData] = useState({});
  const [isEmployed, setIsEmployed] = useState(false);

  const toggleEmploymentStatus = () => {
    setIsEmployed(!isEmployed);
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "skills") {
      const skillsArray = e.target.value
        .split(",")
        .map((skill) => skill.trim());
      setFormData({
        ...formData,
        skills: skillsArray,
      });
    } else if (
      e.target.name === "linkedin" ||
      e.target.name === "website" ||
      e.target.name === "phone"
    ) {
      const updatedContacts = {
        ...formData.contacts,
        [e.target.name]: e.target.value,
      };
      setFormData({
        ...formData,
        contacts: updatedContacts,
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
      const response = await axios.post(BASE_URL + "/users/profile", formData, {
        headers,
      });
      if (response.status === 201) {
        e.target.reset();
        if (userState.user_type === "alumni") {
          window.location.href = "/alumni";
        } else {
          window.location.href = "/student";
        }
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    formSubmit(e);
  };
  return (
    <div className="mt-5 mb-20">
      <h1 className="text-3xl font-mono">Create Profile</h1>
      <form
        onSubmit={onsubmitHandler}
        className="mt-5 p-5 border border-[#F8F9FA] shadow-sm flex flex-col gap-5"
      >
        <h2 className="text-2xl font-semibold">Basic Info</h2>
        <div className="flex gap-3">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="">Passing Out Year</label>
            <input
              onChange={onChangeHandler}
              className="p-2 border rounded-md"
              type="text"
              name="passingOutYear"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="gender">Gender</label>
            <div className="flex gap-2">
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={formData.gender === "male"}
                onChange={onChangeHandler}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={formData.gender === "female"}
                onChange={onChangeHandler}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleEmploymentStatus}
          className={`w-fit p-2 rounded-md ${
            isEmployed ? "bg-green-500" : "bg-red-500"
          } text-black border`}
        >
          {isEmployed ? "I am employed" : "I am unemployed"}
        </button>
        {isEmployed && (
          <>
            <h1 className="text-2xl font-semibold">Job Details</h1>
            <div className="flex gap-3">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="jobtitle">Job Title</label>
                <input
                  onChange={onChangeHandler}
                  className="p-2 border rounded-md"
                  type="text"
                  name="jobTitle"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="">Company Name</label>
                <input
                  onChange={onChangeHandler}
                  className="p-2 border rounded-md"
                  type="text"
                  name="companyName"
                />
              </div>
            </div>
          </>
        )}
        <h1 className="text-2xl font-semibold">Contacts</h1>
        <div className="flex gap-3">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="">LinkedIn</label>
            <input
              onChange={onChangeHandler}
              className="p-2 border rounded-md"
              type="text"
              name="linkedin"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="">Phone</label>
            <input
              onChange={onChangeHandler}
              className="p-2 border rounded-md"
              type="text"
              name="phone"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="">Website</label>
            <input
              onChange={onChangeHandler}
              className="p-2 border rounded-md"
              type="text"
              name="website"
            />
          </div>
        </div>
        <h1 className="text-2xl font-semibold">About Me</h1>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Skills (seperated by commas)</label>
            <input
              onChange={onChangeHandler}
              className="p-2 border rounded-md"
              type="text"
              name="skills"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="bio">Bio</label>
            <textarea
              onChange={onChangeHandler}
              className="w-full border rounded-md mb-2 p-2"
              name="bio"
              id=""
              cols="30"
              rows="4"
              placeholder="A brief description of the your background and achievements..."
            ></textarea>
          </div>
        </div>
        <button
          onSubmit={onsubmitHandler}
          className="p-2 bg-[#007BFF] text-white border hover:bg-[#1c72ce] hover:text-white rounded-md"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
