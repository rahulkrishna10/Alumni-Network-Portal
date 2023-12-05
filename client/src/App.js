import React from "react";
import { Routes, Route } from "react-router-dom";

// Common Routes
import Register from "./pages/Register";
import LoginForm from "./components/LoginForm";
import UserProfile from "./components/UserProfile";
import SearchProfile from "./pages/SearchProfile";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import EventPage from "./pages/EventPage";
import JobBoard from "./pages/JobBoard";

//Alumni Routes
import AlumniAuth from "./pages/Alumni/AlumniAuth";
import AlumniHome from "./pages/Alumni/AlumniHome";
import AlumniEvents from "./pages/Alumni/AlumniEvents";
import JobPost from "./pages/Alumni/JobPost";
import EditJob from "./pages/Alumni/EditJob";

//Student Routes
import StudentAuth from "./pages/Students/StudentAuth";
import StudentHome from "./pages/Students/StudentHome";
import StudentEvents from "./pages/Students/StudentEvents";

//Admin Routes
import AdminLogin from "./components/AdminLogin";
import AdminAuth from "./pages/Admin/AdminAuth";
import AdminHome from "./pages/Admin/AdminHome";
import AlumniDirectory from "./pages/Admin/AlumniDirectory";
import AdminEvents from "./pages/Admin/AdminEvents";
import ManageUsers from "./pages/Admin/ManageUsers";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
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
        path="/alumni/job/:jobId"
        element={
          <AlumniAuth>
            <JobDetails />
          </AlumniAuth>
        }
      />
      <Route
        path="/alumni/job/edit/:jobId"
        element={
          <AlumniAuth>
            <EditJob />
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
        path="/alumni/search/user/:id"
        element={
          <AlumniAuth>
            <Profile />
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
        path="/student/job/:jobId"
        element={
          <StudentAuth>
            <JobDetails />
          </StudentAuth>
        }
      />
      <Route
        path="/student/events"
        element={
          <StudentAuth>
            <StudentEvents />
          </StudentAuth>
        }
      />
      <Route
        path="/student/event/:eventId"
        element={
          <StudentAuth>
            <EventPage />
          </StudentAuth>
        }
      />
      <Route
        path="/student/search/:search"
        element={
          <StudentAuth>
            <SearchProfile />
          </StudentAuth>
        }
      />
      <Route
        path="/student/search/user/:id"
        element={
          <StudentAuth>
            <Profile />
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
        path="/admin/users"
        element={
          <AdminAuth>
            <ManageUsers />
          </AdminAuth>
        }
      />
      <Route
        path="/admin/events"
        element={
          <AdminAuth>
            <AdminEvents />
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
