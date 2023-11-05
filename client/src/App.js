import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AlumniPages from "./pages/Alumni/AlumniPages";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/alumni" element={<AlumniPages />} />
    </Routes>
  );
}

export default App;
