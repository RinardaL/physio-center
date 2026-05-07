import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
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
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className={darkMode ? "app dark" : "app"} style={{ display: "flex" }}>
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>

        <Sidebar />

        <div
          style={{
            marginLeft: "240px",
            padding: "30px",
            width: "calc(100% - 240px)",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/therapists" element={<Therapists />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/assessments" element={<Assessments />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}