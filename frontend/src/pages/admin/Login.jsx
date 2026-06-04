import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./auth.css";
import logo from "../../assets/physio-logo.png";

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
    const res = await api.post("/auth/login", form);

     localStorage.setItem("token", res.data.accessToken);
     localStorage.setItem("user", JSON.stringify(res.data.user));

    const role = res.data.user.role;

    setForm({ email: "", password: "" });

    if (role === "therapist") {
      navigate("/");
    } else {
      navigate("/");
    }

  } catch (err) {
    alert(err.response?.data?.message || "Invalid credentials");
  }
};

  return (
    <div className="auth-container">
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

      <div className="auth-side">
        <img src={logo} alt="Physio Logo" className="auth-logo" />
        <p>Management System for Therapists & Patients</p>
      </div>
    </div>
  );
}