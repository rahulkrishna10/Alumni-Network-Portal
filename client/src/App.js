import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AlumniAuth from "./pages/Alumni/AlumniAuth";
import UserProfile from "./components/UserProfile/UserProfile";
import AlumniHome from "./pages/Alumni/AlumniHome";
import JobPost from "./pages/Alumni/JobPost";
import JobBoard from "./pages/Alumni/JobBoard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/alumni"
        element={
          <AlumniAuth>
            <AlumniHome />
          </AlumniAuth>
        }
      />
      <Route
        path="/alumni/profile"
        element={
          <AlumniAuth>
            <UserProfile />
          </AlumniAuth>
        }
      />
      <Route
        path="/alumni/job"
        element={
          <AlumniAuth>
            <JobBoard />
          </AlumniAuth>
        }
      />
      <Route
        path="/alumni/job/create"
        element={
          <AlumniAuth>
            <JobPost />
          </AlumniAuth>
        }
      />
    </Routes>
  );
}

export default App;
