import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";

import {
  LayoutDashboard,
  ClipboardCheck,
  CalendarCheck,
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
    localStorage.removeItem("user");
    navigate("/login");
  };

  const links = [
    ["/dashboard", LayoutDashboard, "Dashboard"],
    ["/therapy", ClipboardCheck, "Therapy Plans"],
    ["/manage-appointments", CalendarCheck, "Appointments"],
    ["/patients", User, "Patients"],
    ["/therapists", Users, "Therapists"],
    ["/sessions", CalendarDays, "Sessions"],
    ["/exercises", Dumbbell, "Exercises"],
    ["/equipment", Monitor, "Equipment"],
    ["/assessments", ClipboardList, "Assessments"],
    ["/treatments", HeartPulse, "Treatments"],
    ["/treatment-plans", FileText, "Treatment Plans"],
    ["/exercise-plans", Activity, "Exercise Plans"],
    ["/payments", CreditCard, "Payments"],
  ];

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
        {links.map(([to, Icon, label]) => (
          <NavLink key={to} to={to} className="link">
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT */}
      <button onClick={handleLogout} className="logoutBtn">
        Logout
      </button>
    </div>
  );
}
