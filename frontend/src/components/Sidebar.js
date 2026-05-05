import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3 className="logo">Physio Admin</h3>

      <Link className="link" to="/">Dashboard</Link>
      <Link className="link" to="/therapists">Therapists</Link>
      <Link className="link" to="/patients">Patients</Link>
      <Link className="link" to="/treatments">Treatments</Link>
      <Link className="link" to="/treatment-plans">Treatments Plan</Link>
      <Link className="link" to="/sessions">Sessions</Link>
      <Link className="link" to="/exercises">Exercises</Link>
      <Link className="link" to="/exercise-plans">Exercises Plan</Link>
      <Link className="link" to="/equipment">Equipment</Link>
      <Link className="link" to="/payments">Payments</Link>
      <Link className="link" to="/assessments">Assessments</Link>
    </div>
  );
}