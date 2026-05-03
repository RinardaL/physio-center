import { useEffect, useState } from "react";
import axios from "axios";

export default function Sessions() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    patient_id: "",
    therapist_id: "",
    treatment_id: "",
    date: "",
    start_time: "",
    end_time: "",
    status: "",
    notes: "",
    progress: "",
  });

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    const res = await axios.get("/sessions");
    setData(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`/sessions/${editingId}`, form);
    } else {
      await axios.post("/sessions", form);
    }

    setForm({
      patient_id: "",
      therapist_id: "",
      treatment_id: "",
      date: "",
      start_time: "",
      end_time: "",
      status: "",
      notes: "",
      progress: "",
    });

    setEditingId(null);
    loadSessions();
  };

  const handleEdit = (s) => {
    setForm(s);
    setEditingId(s.session_id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/sessions/${id}`);
    loadSessions();
  };

  return (
    <div className="container">
      <h2>Sessions</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input name="patient_id" placeholder="Patient ID" value={form.patient_id} onChange={handleChange} />
        <input name="therapist_id" placeholder="Therapist ID" value={form.therapist_id} onChange={handleChange} />
        <input name="treatment_id" placeholder="Treatment ID" value={form.treatment_id} onChange={handleChange} />
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <input name="start_time" placeholder="Start Time" value={form.start_time} onChange={handleChange} />
        <input name="end_time" placeholder="End Time" value={form.end_time} onChange={handleChange} />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} />
        <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
        <input name="progress" placeholder="Progress" value={form.progress} onChange={handleChange} />

        <button type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Therapist</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((s) => (
            <tr key={s.session_id}>
              <td>{s.session_id}</td>
              <td>{s.patient_id}</td>
              <td>{s.therapist_id}</td>
              <td>{s.date}</td>
              <td>{s.status}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.session_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}