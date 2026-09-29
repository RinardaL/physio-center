import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api";
import "./appointment.css";
import "../therapy.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Patient view: book an appointment with a therapist and see / cancel own bookings.

export default function Appointment() {
  const [therapists, setTherapists] = useState([]);
  const [mine, setMine] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ therapistId: "", date: "", time: "" });
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isPatient = user?.role === "patient";

  const load = async () => {
    try {
      const [t, a] = await Promise.all([api.get("/appointments/therapists"), api.get("/appointments")]);
      setTherapists(t.data);
      setMine(a.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not load appointments");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.therapistId || !form.date || !form.time) return toast.error("Please fill in all fields.");

    setLoading(true);
    try {
      await api.post("/appointments", form);
      toast.success("Appointment booked! The clinic will confirm it.");
      setForm({ therapistId: "", date: "", time: "" });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not book the appointment.");
    } finally {
      setLoading(false);
    }
  };

  const cancel = async (a) => {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      await api.patch(`/appointments/${a.id}/status`, { status: "cancelled" });
      toast.success("Appointment cancelled");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not cancel");
    }
  };

  return (
    <>
      <Navbar />

      {isPatient && (
        <div className="appointment-container">
          <h2>Book Appointment</h2>
          <p style={{ textAlign: "center", color: "#8a7a70", marginTop: -10 }}>
            Monday to Friday 08:00–18:00 · Saturday 08:00–14:00
          </p>
          <form onSubmit={handleSubmit}>
            <select name="therapistId" value={form.therapistId} onChange={handleChange}>
              <option value="">Choose a therapist</option>
              {therapists.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <input type="date" name="date" value={form.date} onChange={handleChange} min={new Date().toISOString().slice(0, 10)} />
            <input type="time" name="time" value={form.time} onChange={handleChange} step="1800" />
            <button type="submit" disabled={loading}>
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </div>
      )}

      <div className="patientPage" style={{ marginTop: isPatient ? 0 : 40 }}>
        <h1 style={{ fontSize: 24 }}>{isPatient ? "My Appointments" : "Appointments"}</h1>
        {mine.length === 0 ? (
          <div className="emptyState">No appointments yet.</div>
        ) : (
          <ul className="taskList">
            {mine.map((a) => (
              <li key={a.id} className={`taskItem ${a.status === "confirmed" ? "done" : ""}`}>
                <div className="taskBody">
                  <div className="taskTitle">
                    {a.date} at {a.time}
                  </div>
                  <div className="taskDetail">
                    With {a.therapist?.name || "therapist"}
                    {!isPatient && a.patient ? ` · Patient: ${a.patient.name}` : ""}
                  </div>
                </div>
                <div className="taskActions">
                  <span className={`statusPill ${a.status}`}>{a.status}</span>
                  {a.status !== "cancelled" && (
                    <button className="dangerBtn" onClick={() => cancel(a)}>
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </>
  );
}
