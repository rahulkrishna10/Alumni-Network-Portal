import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 text-white h-screen flex items-center justify-center">
      <div className="max-w-lg w-full p-8">
        <h1 className="text-4xl font-extrabold mb-4">Alumni Network Portal</h1>
        <p className="text-gray-400 mb-6">
          Connect with your alma mater and fellow graduates. Explore
          opportunities, events, and memories.
        </p>
        <div className="flex space-x-4 mb-8">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <a href="#" className="underline" onClick={() => navigate("/login")}>
            Log in here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
