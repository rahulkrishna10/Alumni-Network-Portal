import React from "react";

const JobPost = () => {
  return (
    <div className="md:w-[50%] mx-auto my-5">
      <h1 className="text-3xl font-mono">Create Post</h1>
      <form className="flex flex-col my-3 border border-[#F8F9FA] p-5">
        <div className="w-[100%] flex flex-col">
          <label className="mb-5 text-xl" htmlFor="title">
            Job Title
          </label>
          <input
            className="p-2 outline-[#007BFF] border shadow-sm border-[#F8F9FA]"
            type="text"
            name="title"
          ></input>
        </div>

        <div className="w-[100%] flex flex-col">
          <label className="my-5 text-xl" htmlFor="companyName">
            Company Name
          </label>
          <input
            className="p-2 outline-[#007BFF] border shadow-sm border-[#F8F9FA]"
            type="text"
            name="companyName"
          ></input>
        </div>

        <div className="w-[100%] flex flex-col">
          <label className="my-5 text-xl" htmlFor="jobType">
            Job Type
          </label>
          <select
            className="p-2 bg-white border-2 border-[#F8F9FA]"
            name="jobType"
          >
            <option value="Full-time">Full Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="w-[100%] flex flex-col">
          <label className="my-5 text-xl" htmlFor="skills">
            Skills Required (separate by commas)
          </label>
          <input
            className="p-2 outline-[#007BFF] border shadow-sm border-[#F8F9FA]"
            type="text"
            name="skills"
          />
        </div>

        <div className="w-[100%] flex flex-col">
          <label className="my-5 text-xl" htmlFor="description">
            Job Descripton
          </label>
          <textarea
            className="p-2 outline-[#007BFF] border shadow-sm border-[#F8F9FA]"
            rows={5}
            cols={30}
            name="description"
          />
        </div>
        <button className="w-fit text-white font-mono bg-[#007BFF] p-2 mt-5">
          Create Job Posting
        </button>
      </form>
    </div>
  );
};

export default JobPost;
