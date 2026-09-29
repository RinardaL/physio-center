import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./route/ProtectedRoute";
import RoleRoute from "./route/RoleRoute";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/public/Home";
import About from "./pages/admin/About";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import Service from "./pages/public/Service";
import Therapist from "./pages/public/Therapist";

import MyTherapy from "./pages/patient/MyTherapy";
import Appointment from "./pages/admin/Appointment";

import Dashboard from "./pages/admin/Dashboard";
import Therapy from "./pages/admin/Therapy";
import Appointments from "./pages/admin/Appointments";
import Therapists from "./pages/admin/Therapists";
import Sessions from "./pages/admin/Sessions";
import Exercises from "./pages/admin/Exercises";
import Equipment from "./pages/admin/Equipment";
import Assessments from "./pages/admin/Assessments";
import Patients from "./pages/admin/Patients";
import Treatments from "./pages/admin/Treatments";
import TreatmentPlan from "./pages/admin/TreatmentPlan";
import ExercisesPlan from "./pages/admin/ExercisePlan";
import Payment from "./pages/admin/Payment";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/therapist" element={<Therapist />} />
        <Route path="/services" element={<Service />} />
        <Route path="/about" element={<About />} />

        {/* ANY LOGGED-IN USER */}
        <Route element={<ProtectedRoute />}>
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/my-therapy" element={<MyTherapy />} />
        </Route>

        {/* THERAPIST ONLY */}
        <Route element={<RoleRoute allowedRole="therapist" />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/therapy" element={<Therapy />} />
            <Route path="/manage-appointments" element={<Appointments />} />
            <Route path="/therapists" element={<Therapists />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/treatment-plans" element={<TreatmentPlan />} />
            <Route path="/exercise-plans" element={<ExercisesPlan />} />
            <Route path="/payments" element={<Payment />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
