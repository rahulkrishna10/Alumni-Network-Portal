import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AlumniAuth from "./pages/Alumni/AlumniAuth";
import { AuthContext } from "./store/AuthContext";
import UserProfile from "./components/UserProfile/UserProfile";
import AlumniHome from "./pages/Alumni/AlumniHome";
import JobPost from "./pages/Alumni/JobPost";

function App() {
  const { isAuthenticated, userState } = useContext(AuthContext);
  console.log(isAuthenticated);
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
            <JobPost />
          </AlumniAuth>
        }
      />
    </Routes>
  );
}

export default App;
