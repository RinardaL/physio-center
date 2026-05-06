import { useEffect, useState } from "react";
import api from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import "./dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    therapists: 0,
    sessions: 0,
    exercises: 0,
  });

  const [sessionsData, setSessionsData] = useState([]);

  useEffect(() => {
    loadStats();
    loadChart();
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
      console.log(err);
    }
  };

  const loadChart = async () => {
    try {
      const res = await api.get("/sessions");

      const grouped = res.data.reduce((acc, s) => {
        acc[s.date] = (acc[s.date] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.keys(grouped).map((date) => ({
        date,
        sessions: grouped[date],
      }));

      setSessionsData(chartData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard">

      {/* HERO */}
      <div className="hero">
        <h1>Physio Clinic Dashboard</h1>
        <p>Overview of system activity</p>
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

      {/* CHART */}
      <div className="chartBox">
        <h3>Sessions Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sessionsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sessions" stroke="#4f46e5" />
          </LineChart>
        </ResponsiveContainer>
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

    </div>
  );
}