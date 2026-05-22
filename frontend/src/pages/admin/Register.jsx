import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./auth.css";
import logo from "../../assets/physio-logo.png";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);

      alert("Account created");
      navigate("/login");
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-box">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <button type="submit">Register</button>
        </form>

        <p onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </div>

      <div className="auth-side">
        <img src={logo} alt="Physio Logo" className="auth-logo" />
        <h1>Physio Center</h1>
        <p>Management System for Therapists & Patients</p>
      </div>

    </div>
  );
}