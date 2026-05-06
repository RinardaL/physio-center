import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Therapists from "./pages/Therapists";
import Sessions from "./pages/Sessions";
import Exercises from "./pages/Exercises";
import Equipment from "./pages/Equipment";
import Assessments from "./pages/Assessments";
// import Patients from "./pages/Patients";
// import Payments from "./pages/Payment";
// import TreatmentPlans from "./pages/TreatmentPlans";
// import ExercisesPlan from "./pages/ExercisesPlan";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

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
            }}>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/therapists" element={<Therapists />} />
            {/* // <Route path="/patients" element={<Patients />} /> */}
             <Route path="/sessions" element={<Sessions />} />
            {/* //<Route path="/treatment-plans" element={<TreatmentPlans />} /> */}
            {/* //Route path="/exercise-plans" element={<ExercisesPlan />}  */}
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/assessments" element={<Assessments />} />
            {/* //<Route path="/payments" element={<Payments />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}