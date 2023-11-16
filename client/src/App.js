import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import LoginForm from "./components/LoginForm";
import UserProfile from "./components/UserProfile/UserProfile";
import AlumniAuth from "./pages/Alumni/AlumniAuth";
import AlumniHome from "./pages/Alumni/AlumniHome";
import AlumniEvents from "./pages/Alumni/AlumniEvents";

import JobPost from "./pages/Alumni/JobPost";
import JobBoard from "./pages/JobBoard";
import AdminLogin from "./components/AdminLogin";
import AdminAuth from "./pages/Admin/AdminAuth";
import AdminHome from "./pages/Admin/AdminHome";
import StudentAuth from "./pages/Students/StudentAuth";
import StudentHome from "./pages/Students/StudentHome";
import AlumniDirectory from "./pages/Admin/AlumniDirectory";
import EventPage from "./pages/EventPage";
import SearchProfile from "./pages/SearchProfile";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
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
        path="/alumni/search/:search"
        element={
          <AlumniAuth>
            <SearchProfile />
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
        path="/alumni/events"
        element={
          <AlumniAuth>
            <AlumniEvents />
          </AlumniAuth>
        }
      />
      <Route
        path="/alumni/event/:eventId"
        element={
          <AlumniAuth>
            <EventPage />
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
        path="/student/profile"
        element={
          <StudentAuth>
            <UserProfile />
          </StudentAuth>
        }
      />
      <Route
        path="/student/job"
        element={
          <StudentAuth>
            <JobBoard />
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
      <Route
        path="/admin/directory"
        element={
          <AdminAuth>
            <AlumniDirectory />
          </AdminAuth>
        }
      />
    </Routes>
  );
}

export default App;
