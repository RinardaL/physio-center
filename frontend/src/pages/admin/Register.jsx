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
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        ...form,
        role: "patient"
      });

      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-box">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>

        <p onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </div>

      <div className="auth-side">
        <img src={logo} alt="Physio Logo" className="auth-logo" />
        <p>Management System for Therapists & Patients</p>
      </div>

    </div>
  );
}