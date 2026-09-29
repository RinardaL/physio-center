import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api";
import "../therapy.css";

// Therapist view: every booking, with confirm / cancel actions.

export default function Appointments() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("pending");

  const load = async () => {
    try {
      const res = await api.get("/appointments");
      setItems(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not load appointments");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (a, status) => {
    try {
      await api.patch(`/appointments/${a.id}/status`, { status });
      toast.success(`Appointment ${status}`);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update");
    }
  };

  const visible = items.filter((a) => filter === "all" || a.status === filter);
  const count = (s) => items.filter((a) => a.status === s).length;

  return (
    <div className="dashboard">
      <div className="hero">
        <h1>Appointments</h1>
        <p>Bookings made by patients. Confirm or cancel them here.</p>
      </div>

      <div className="filterTabs">
        {[
          ["pending", `Pending (${count("pending")})`],
          ["confirmed", `Confirmed (${count("confirmed")})`],
          ["cancelled", `Cancelled (${count("cancelled")})`],
          ["all", `All (${items.length})`],
        ].map(([key, label]) => (
          <button key={key} className={filter === key ? "active" : ""} onClick={() => setFilter(key)}>
            {label}
          </button>
        ))}
      </div>

      <div className="section">
        <div className="modernTable">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Patient</th>
                <th>Therapist</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty">
                    No {filter === "all" ? "" : filter} appointments
                  </td>
                </tr>
              ) : (
                visible.map((a) => (
                  <tr key={a.id}>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td>
                      <strong>{a.patient?.name || `#${a.patientId}`}</strong>
                      <div style={{ fontSize: 12, opacity: 0.6 }}>{a.patient?.email}</div>
                    </td>
                    <td>{a.therapist?.name || `#${a.therapistId}`}</td>
                    <td>
                      <span className={`statusPill ${a.status}`}>{a.status}</span>
                    </td>
                    <td>
                      {a.status !== "confirmed" && (
                        <button className="successBtn" onClick={() => setStatus(a, "confirmed")}>
                          Confirm
                        </button>
                      )}{" "}
                      {a.status !== "cancelled" && (
                        <button className="dangerBtn" onClick={() => setStatus(a, "cancelled")}>
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
