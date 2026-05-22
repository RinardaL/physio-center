import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", form);

      // ruaj token + user (shumë e rëndësishme për role)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // redirect
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT SIDE */}
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <p onClick={() => navigate("/register")}>
          Don't have an account? Register
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-side">
        <h1>Physio Center</h1>
        <p>Management System for Therapists & Patients</p>
      </div>

    </div>
  );
}