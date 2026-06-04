import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/physio-logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <img src={logo} alt="Physio Logo" />
      </div>

      <ul className="navLinks">

        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/therapist">Therapists</NavLink></li>

        {user?.role === "therapist" && (
          <li>
            <span className="nav-btn" onClick={() => navigate("/dashboard")}>
              Dashboard
            </span>
          </li>
        )}

        {user && (
          <li>
            <span className="logout-link" onClick={handleLogout}>
              Logout
            </span>
          </li>
        )}

      </ul>

    </nav>
  );
}