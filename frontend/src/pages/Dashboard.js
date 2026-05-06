import { useEffect, useState } from "react";
import api from "../api";
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
    try {
      const therapists = await api.get("/therapists");
      const sessions = await api.get("/sessions");
      const exercises = await api.get("/exercises");

      setStats({
        therapists: therapists.data.length,
        sessions: sessions.data.length,
        exercises: exercises.data.length,
      });
    } catch (err) {
      console.log("API error:", err);
    }
  };

  return (
    <div className="dashboard">
      <div className="hero">
        <h1>Physio Clinic Admin</h1>
        <p>Manage therapists, sessions and exercises efficiently</p>
      </div>

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