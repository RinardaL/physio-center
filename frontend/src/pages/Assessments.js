import { useEffect, useState } from "react";
import axios from "axios";

export default function Assessments() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    notes: "",
    date: "",
  });

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      const res = await axios.get("/assessments");
      setData(res.data);
    } catch {
      setData([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`/assessments/${editingId}`, form);
    } else {
      await axios.post("/assessments", form);
    }

    setForm({ notes: "", date: "" });
    setEditingId(null);
    loadAssessments();
  };

  const handleEdit = (a) => {
    setForm(a);
    setEditingId(a.assessment_id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/assessments/${id}`);
    loadAssessments();
  };

  return (
    <div className="container">
      <h2>Clinical Assessments</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <button>{editingId ? "Update" : "Add"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a) => (
            <tr key={a.assessment_id}>
              <td>{a.assessment_id}</td>
              <td>{a.date}</td>
              <td>{a.notes}</td>
              <td>
                <button onClick={() => handleEdit(a)}>Edit</button>
                <button onClick={() => handleDelete(a.assessment_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}