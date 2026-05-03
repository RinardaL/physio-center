import { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    therapists: 0,
    sessions: 0,
    exercises: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const therapists = await axios.get("/therapists");
    const sessions = await axios.get("/sessions");
    const exercises = await axios.get("/exercises");

    setStats({
      therapists: therapists.data.length,
      sessions: sessions.data.length,
      exercises: exercises.data.length,
    });
  };

  return (
    <div className="dashboard">
      {/* HERO */}
      <div className="hero">
        <h1>Physio Clinic Admin</h1>
        <p>Manage therapists, sessions and exercises efficiently</p>
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
      </div>

      {/* QUICK ACTIONS */}
      <div className="section">
        <h3>Quick Actions</h3>
        <div className="actions">
          <button>+ Add Therapist</button>
          <button>+ New Session</button>
          <button>+ Add Exercise</button>
        </div>
      </div>

      {/* RECENT ACTIVITY (fake UI for now) */}
      <div className="section">
        <h3>Recent Activity</h3>

        <div className="activity">
          <p>✔ New therapist added</p>
          <p>✔ Session updated</p>
          <p>✔ Exercise created</p>
        </div>
      </div>
    </div>
  );
}