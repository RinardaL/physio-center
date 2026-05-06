import { useEffect, useState } from "react";
import api from "../api";
import "./dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    therapists: 0,
    sessions: 0,
    exercises: 0,
    assessments: 0,
  });

  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("darkMode") === "true";
});
  // load stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const [therapists, sessions, exercises, assessments] =
          await Promise.all([
            api.get("/therapists"),
            api.get("/sessions"),
            api.get("/exercises"),
            api.get("/assessments"),
          ]);
          

        setStats({
          therapists: therapists.data.length,
          sessions: sessions.data.length,
          exercises: exercises.data.length,
          assessments: assessments.data.length,
        });
      } catch (err) {
        console.log(err);
      }
    };

    loadStats();
  }, []);

  // dark mode + localStorage

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="dashboard">
      <button
  onClick={() => setDarkMode(prev => !prev)}
  style={{
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "8px 12px",
    cursor: "pointer"
  }}
>
  {darkMode ? "Light Mode ☀" : "Dark Mode 🌙"}
</button> 
      {/* HERO */}
      <div className="hero">
        <div>
          <h1>Welcome back 👋</h1>
          <p>Here’s what’s happening in your clinic today.</p>
        </div>
       </div>

      {/* STATS */}
      <div className="cards">
        <div className="card">
          <h2>{stats.therapists}</h2>
          <p>Therapists</p>
        </div>

        <div className="card">
          <h2>{stats.sessions}</h2>
          <p>Sessions</p>
        </div>

        <div className="card">
          <h2>{stats.exercises}</h2>
          <p>Exercises</p>
        </div>

        <div className="card">
          <h2>{stats.assessments}</h2>
          <p>Assessments</p>
        </div>
      </div>

      {/* GRID */}
      <div className="dashboardGrid">
        <div className="section">
          <h3>Recent Activity</h3>
          <div className="activity">
            <p>✔ New session added</p>
            <p>✔ Assessment completed</p>
            <p>✔ Exercise updated</p>
            <p>✔ New therapist registered</p>
          </div>
        </div>

        <div className="section">
          <h3>Quick Actions</h3>
          <div className="actions">
            <button>+ Add Patient</button>
            <button>+ New Session</button>
            <button>+ Add Exercise</button>
            <button>+ Add Assessment</button>
          </div>
        </div>
      </div>
    </div>
  );
}