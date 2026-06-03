import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/physio-logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      
      <div className="logo">
        <img src={logo} alt="Physio Logo" />
      </div>

      <ul className="navLinks">

        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""}>
            Services
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
            About
          </NavLink>
        </li>

        <li>
          <NavLink to="/therapist" className={({ isActive }) => isActive ? "active" : ""}>
            Therapists
          </NavLink>
        </li>

        {user?.role === "therapist" && (
          <li>
            <button
              className="nav-btn"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
          </li>
        )}

      </ul>
    </nav>
  );
}