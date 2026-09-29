import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api";

const emptyForm = () => ({
  patient_id: "",
  therapist_id: "",
  treatment_id: "",
  date: "",
  start_time: "",
  end_time: "",
  status: "scheduled",
  notes: "",
  progress: "",
});

export default function Sessions() {
  const [data, setData] = useState([]);
  const [patients, setPatients] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());

  const load = async () => {
    try {
      const [s, p, t, tr] = await Promise.all([
        api.get("/sessions"),
        api.get("/patients"),
        api.get("/therapists"),
        api.get("/treatments"),
      ]);
      setData(s.data);
      setPatients(p.data);
      setTherapists(t.data);
      setTreatments(tr.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not load sessions");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const patientName = (id) => {
    const p = patients.find((x) => x.id === id);
    return p ? `${p.first_name} ${p.last_name}` : `#${id}`;
  };
  const therapistName = (id) => {
    const t = therapists.find((x) => x.therapist_id === id);
    return t ? `${t.first_name} ${t.last_name}` : `#${id}`;
  };
  const treatmentName = (id) => treatments.find((x) => x.id === id)?.name || `#${id}`;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.patient_id || !form.therapist_id || !form.treatment_id) {
      return toast.error("Choose a patient, a therapist and a treatment");
    }

    const payload = {
      ...form,
      patient_id: Number(form.patient_id),
      therapist_id: Number(form.therapist_id),
      treatment_id: Number(form.treatment_id),
      start_time: form.start_time || null,
      end_time: form.end_time || null,
      date: form.date || null,
    };

    try {
      if (editingId) {
        await api.put(`/sessions/${editingId}`, payload);
        toast.success("Session updated");
      } else {
        await api.post("/sessions", payload);
        toast.success("Session added");
      }
      setForm(emptyForm());
      setEditingId(null);
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save the session");
    }
  };

  const handleEdit = (s) => {
    setForm({
      patient_id: s.patient_id || "",
      therapist_id: s.therapist_id || "",
      treatment_id: s.treatment_id || "",
      date: s.date || "",
      start_time: s.start_time || "",
      end_time: s.end_time || "",
      status: s.status || "scheduled",
      notes: s.notes || "",
      progress: s.progress || "",
    });
    setEditingId(s.session_id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this session?")) return;
    try {
      await api.delete(`/sessions/${id}`);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete");
    }
  };

  return (
    <div className="dashboard">
      <div className="hero">
        <h1>Sessions</h1>
        <p>Treatment sessions between patients and therapists</p>
      </div>

      <div className="patientsToolbar">
        <div />
        <button
          className="primaryBtn"
          onClick={() => {
            setEditingId(null);
            setForm(emptyForm());
            setShowForm(true);
          }}
        >
          + New Session
        </button>
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
                <th>Treatment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty">
                    No sessions yet
                  </td>
                </tr>
              ) : (
                data.map((s) => (
                  <tr key={s.session_id}>
                    <td>{s.date || "-"}</td>
                    <td>
                      {s.start_time ? String(s.start_time).slice(0, 5) : "-"}
                      {s.end_time ? ` – ${String(s.end_time).slice(0, 5)}` : ""}
                    </td>
                    <td>{patientName(s.patient_id)}</td>
                    <td>{therapistName(s.therapist_id)}</td>
                    <td>{treatmentName(s.treatment_id)}</td>
                    <td>
                      <span className="badge">{s.status || "-"}</span>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(s)}>Edit</button>
                      <button onClick={() => handleDelete(s.session_id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="modal" onClick={() => setShowForm(false)}>
          <div className="modalBox" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Edit Session" : "New Session"}</h2>
            <form onSubmit={handleSubmit} className="form">
              <select name="patient_id" value={form.patient_id} onChange={handleChange} required>
                <option value="">Patient</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.first_name} {p.last_name}
                  </option>
                ))}
              </select>

              <select name="therapist_id" value={form.therapist_id} onChange={handleChange} required>
                <option value="">Therapist</option>
                {therapists.map((t) => (
                  <option key={t.therapist_id} value={t.therapist_id}>
                    {t.first_name} {t.last_name}
                    {t.specialization ? ` · ${t.specialization}` : ""}
                  </option>
                ))}
              </select>

              <select name="treatment_id" value={form.treatment_id} onChange={handleChange} required>
                <option value="">Treatment</option>
                {treatments.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                    {t.duration ? ` · ${t.duration} min` : ""}
                  </option>
                ))}
              </select>

              <input type="date" name="date" value={form.date} onChange={handleChange} required />
              <div style={{ display: "flex", gap: 10 }}>
                <input type="time" name="start_time" value={form.start_time} onChange={handleChange} />
                <input type="time" name="end_time" value={form.end_time} onChange={handleChange} />
              </div>

              <select name="status" value={form.status} onChange={handleChange}>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <input name="progress" placeholder="Progress (e.g. pain reduced, full range of motion)" value={form.progress} onChange={handleChange} />
              <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />

              <button className="primaryBtn" type="submit">
                {editingId ? "Update Session" : "Save Session"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
