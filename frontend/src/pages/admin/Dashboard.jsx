import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./dashboard.css";
import { Sun, Moon } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    therapists: 0,
    sessions: 0,
    exercises: 0,
    assessments: 0,
  });

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  
  useEffect(() => {
    const loadStats = async () => {
      try {
        const [t, s, e, a] = await Promise.all([
          api.get("/therapists"),
          api.get("/sessions"),
          api.get("/exercises"),
          api.get("/assessments"),
        ]);

        setStats({
          therapists: t.data.length,
          sessions: s.data.length,
          exercises: e.data.length,
          assessments: a.data.length,
        });
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

      
    <div
  onClick={() => setDarkMode(prev => !prev)}
  className="themeToggle"
  title="Toggle theme"
>
  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
</div>

      
      <div className="hero">
        <h1>Welcome to Dashboard</h1>
        <p>Here’s what’s happening in your clinic today.</p>
      </div>

      
      <div className="cards">
        <div className="card"><h2>{stats.therapists}</h2><p>Therapists</p></div>
        <div className="card"><h2>{stats.sessions}</h2><p>Sessions</p></div>
        <div className="card"><h2>{stats.exercises}</h2><p>Exercises</p></div>
        <div className="card"><h2>{stats.assessments}</h2><p>Assessments</p></div>
      </div>

      
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
            <button onClick={() => navigate("/patients")}>+ Add Patient</button>
            <button onClick={() => navigate("/sessions")}>+ New Session</button>
            <button onClick={() => navigate("/exercises")}>+ Add Exercise</button>
            <button onClick={() => navigate("/assessments")}>+ Add Assessment</button>
          </div>
        </div>

      </div>
    </div>
  );
}