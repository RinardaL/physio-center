import "./navbar.css";
import { NavLink } from "react-router-dom";
import logo from "../assets/physio-logo.png";
export default function Navbar() {
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
      </ul>
    </nav>
  );
}