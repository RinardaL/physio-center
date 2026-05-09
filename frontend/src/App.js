import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/public/Home";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/admin/Dashboard";
import Therapists from "./pages/admin/Therapists";
import Sessions from "./pages/admin/Sessions";
import Exercises from "./pages/admin/Exercises";
import Equipment from "./pages/admin/Equipment";
import Assessments from "./pages/admin/Assessments";


export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <BrowserRouter>

      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "8px 12px",
        }}
      >
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      <Routes>


       <Route path="/home" element={<Home />} />

      <Route path="/navbar" element={<Home />} />
        
        <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/therapists" element={<Therapists />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/assessments" element={<Assessments />} />
      </Route>

       </Routes>

    </BrowserRouter>
  );
}