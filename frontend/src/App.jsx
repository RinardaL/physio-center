import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./route/ProtectedRoute";
import RoleRoute from "./route/RoleRoute";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/public/Home";
import About from "./pages/admin/About";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import Service from "./pages/public/Service";

import Dashboard from "./pages/admin/Dashboard";
import Therapists from "./pages/admin/Therapists";
import Sessions from "./pages/admin/Sessions";
import Exercises from "./pages/admin/Exercises";
import Equipment from "./pages/admin/Equipment";
import Assessments from "./pages/admin/Assessments";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ANY LOGGED USER */}
        <Route element={<ProtectedRoute />}>
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service/>}/>
        </Route>

        {/* THERAPIST ONLY */}
        <Route element={<RoleRoute allowedRole="therapist" />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/therapists" element={<Therapists />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/assessments" element={<Assessments />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}