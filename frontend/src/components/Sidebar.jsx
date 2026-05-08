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

import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="logo">
        <h2>Physio Clinic</h2>
        <p>Management System</p>
      </div>

      {/* MENU */}
      <nav className="menu">

        <NavLink to="/" className="link">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/therapists" className="link">
          <Users size={18} />
          Therapists
        </NavLink>

        <NavLink to="/sessions" className="link">
          <CalendarDays size={18} />
          Sessions
        </NavLink>

        <NavLink to="/exercises" className="link">
          <Dumbbell size={18} />
          Exercises
        </NavLink>

        <NavLink to="/equipment" className="link">
          <Monitor size={18} />
          Equipment
        </NavLink>

        <NavLink to="/assessments" className="link">
          <ClipboardList size={18} />
          Assessments
        </NavLink>

      
      <NavLink className="link" to="/patients">Patients</NavLink>
      <NavLink  className="link" to="/treatments">Treatments</NavLink>
      <NavLink className="link" to="/treatment-plans">Treatments Plan</NavLink>
      <NavLink className="link" to="/exercise-plans">Exercises Plan</NavLink>
      <NavLink className="link" to="/payments">Payments</NavLink>

      </nav>
    </div>
  );
}