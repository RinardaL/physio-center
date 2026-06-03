import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Dumbbell,
  Monitor,
  ClipboardList,
  User,
  HeartPulse,
  FileText,
  Activity,
  CreditCard,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="logo">
        <div className="logoIcon">PC</div>

        <div className="logoText">
          <h2>Physio Clinic</h2>
          <p>Management System</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="menu">

        <NavLink to="/dashboard" className="link">
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

        <NavLink to="/patients" className="link">
          <User size={18} />
          Patients
        </NavLink>

        <NavLink to="/treatments" className="link">
          <HeartPulse size={18} />
          Treatments
        </NavLink>

        <NavLink to="/treatment-plans" className="link">
          <FileText size={18} />
          Treatment Plans
        </NavLink>

        <NavLink to="/exercise-plans" className="link">
          <Activity size={18} />
          Exercise Plans
        </NavLink>

        <NavLink to="/payments" className="link">
          <CreditCard size={18} />
          Payments
        </NavLink>

      </nav>

      {/* LOGOUT */}
      <button onClick={handleLogout} className="logoutBtn">
        Logout
      </button>

    </div>
  );
}