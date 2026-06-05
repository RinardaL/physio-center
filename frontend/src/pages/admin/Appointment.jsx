

import { useState } from "react";
import api from "../../api"; 
import "./appointment.css";
import Navbar from "../../components/Navbar";

export default function Appointment() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    therapistId: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Nuk je i kyçur.");
      return;
    }

    if (!form.therapistId || !form.date || !form.time) {
      alert("Plotëso të gjitha fushat.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/appointments", form); 
      alert("Termini u rezervua!");
      setForm({ therapistId: "", date: "", time: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Gabim gjatë rezervimit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-container">
      <Navbar />
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="therapistId"
          placeholder="Therapist ID"
          value={form.therapistId}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Duke rezervuar..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}