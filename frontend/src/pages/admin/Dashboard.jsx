import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./dashboard.css";
import { Sun, Moon } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    patients: 0,
    therapy: 0,
    pendingAppointments: 0,
    sessions: 0,
  });
  const [activity, setActivity] = useState([]);

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [patients, therapy, appointments, sessions] = await Promise.all([
          api.get("/patients"),
          api.get("/therapy"),
          api.get("/appointments"),
          api.get("/sessions"),
        ]);

        setStats({
          patients: patients.data.length,
          therapy: therapy.data.length,
          pendingAppointments: appointments.data.filter((a) => a.status === "pending").length,
          sessions: sessions.data.length,
        });

        // Recent activity: newest bookings and therapy plans, merged.
        const items = [
          ...appointments.data.map((a) => ({
            when: a.createdAt,
            text: `${a.patient?.name || "A patient"} booked ${a.date} at ${a.time} (${a.status})`,
          })),
          ...therapy.data.map((p) => ({
            when: p.createdAt,
            text: `Therapy "${p.title}" written for ${p.Patient ? `${p.Patient.first_name} ${p.Patient.last_name}` : "a patient"} · ${p.progress.done}/${p.progress.total} done`,
          })),
        ]
          .filter((i) => i.when)
          .sort((a, b) => new Date(b.when) - new Date(a.when))
          .slice(0, 6);
        setActivity(items);
      } catch (err) {
        console.log(err);
      }
    };

    loadStats();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="dashboard">
      <div onClick={() => setDarkMode((prev) => !prev)} className="themeToggle" title="Toggle theme">
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </div>

      <div className="hero">
        <h1>Welcome to Dashboard</h1>
        <p>Here’s what’s happening in your clinic today.</p>
      </div>

      <div className="cards">
        <div className="card">
          <h2>{stats.patients}</h2>
          <p>Patients</p>
        </div>
        <div className="card">
          <h2>{stats.therapy}</h2>
          <p>Therapy plans</p>
        </div>
        <div className="card">
          <h2>{stats.pendingAppointments}</h2>
          <p>Pending appointments</p>
        </div>
        <div className="card">
          <h2>{stats.sessions}</h2>
          <p>Sessions</p>
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="section">
          <h3>Recent Activity</h3>
          <div className="activity">
            {activity.length === 0 ? <p>No activity yet.</p> : activity.map((a, i) => <p key={i}>✔ {a.text}</p>)}
          </div>
        </div>

        <div className="section">
          <h3>Quick Actions</h3>
          <div className="actions">
            <button onClick={() => navigate("/therapy")}>+ Write Therapy</button>
            <button onClick={() => navigate("/manage-appointments")}>Review Appointments</button>
            <button onClick={() => navigate("/patients")}>+ Add Patient</button>
            <button onClick={() => navigate("/sessions")}>+ New Session</button>
          </div>
        </div>
      </div>
    </div>
  );
}
