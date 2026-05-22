import { NavLink } from "react-router-dom";
import "./sidebar.css";

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Dumbbell,
  Monitor,
  ClipboardList,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">
        <h2>Physio Clinic</h2>
        <p>Management System</p>
      </div>

      <nav className="menu">

        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "link active" : "link"}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/therapists" className={({ isActive }) => isActive ? "link active" : "link"}>
          <Users size={18} />
          Therapists
        </NavLink>

        <NavLink to="/sessions" className={({ isActive }) => isActive ? "link active" : "link"}>
          <CalendarDays size={18} />
          Sessions
        </NavLink>

        <NavLink to="/exercises" className={({ isActive }) => isActive ? "link active" : "link"}>
          <Dumbbell size={18} />
          Exercises
        </NavLink>

        <NavLink to="/equipment" className={({ isActive }) => isActive ? "link active" : "link"}>
          <Monitor size={18} />
          Equipment
        </NavLink>

        <NavLink to="/assessments" className={({ isActive }) => isActive ? "link active" : "link"}>
          <ClipboardList size={18} />
          Assessments
        </NavLink>

        <NavLink to="/patients" className={({ isActive }) => isActive ? "link active" : "link"}>
          Patients
        </NavLink>

        <NavLink to="/treatments" className={({ isActive }) => isActive ? "link active" : "link"}>
          Treatments
        </NavLink>

        <NavLink to="/treatment-plans" className={({ isActive }) => isActive ? "link active" : "link"}>
          Treatment Plan
        </NavLink>

        <NavLink to="/exercise-plans" className={({ isActive }) => isActive ? "link active" : "link"}>
          Exercise Plan
        </NavLink>

        <NavLink to="/payments" className={({ isActive }) => isActive ? "link active" : "link"}>
          Payments
        </NavLink>

      </nav>
    </div>
  );
}