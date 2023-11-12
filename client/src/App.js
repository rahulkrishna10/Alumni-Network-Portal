import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AlumniAuth from "./pages/Alumni/AlumniAuth";
import UserProfile from "./components/UserProfile/UserProfile";
import AlumniHome from "./pages/Alumni/AlumniHome";
import JobPost from "./pages/Alumni/JobPost";
import JobBoard from "./pages/Alumni/JobBoard";
import AdminLogin from "./components/AdminLogin";
import AdminContextProvider from "./store/AdminContextProvider";
import AdminAuth from "./pages/Admin/AdminAuth";
import AdminHome from "./pages/Admin/AdminHome";
import StudentAuth from "./pages/Students/StudentAuth";
import StudentHome from "./pages/Students/StudentHome";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/admin/login" element={<AdminLogin />} />
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
      <Route
        path="/student"
        element={
          <StudentAuth>
            <StudentHome />
          </StudentAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminAuth>
            <AdminHome />
          </AdminAuth>
        }
      />
    </Routes>
  );
}

export default App;
