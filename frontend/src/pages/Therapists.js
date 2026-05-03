import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function Therapists() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    specialization: "",
  });

  useEffect(() => {
    loadTherapists();
  }, []);

  const loadTherapists = async () => {
    const res = await axios.get("/therapists");
    setData(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`/therapists/${editingId}`, form);
    } else {
      await axios.post("/therapists", form);
    }

    setForm({ first_name: "", last_name: "", specialization: "" });
    setEditingId(null);
    loadTherapists();
  };

  const handleEdit = (t) => {
    setForm({
      first_name: t.first_name,
      last_name: t.last_name,
      specialization: t.specialization,
    });
    setEditingId(t.therapist_id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/therapists/${id}`);
    loadTherapists();
  };

  return (
    
  <div className="container">
    
      <h2>Therapists</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
        />
        <input
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
        />
        <button type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>
    
{/* TABLE */}
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Lastname</th>
      <th>Specialization</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {data.map((t) => (
      <tr key={t.therapist_id}>
        <td>{t.therapist_id}</td>
        <td>{t.first_name}</td>
        <td>{t.last_name}</td>
        <td>{t.specialization}</td>
        <td>
          <button onClick={() => handleEdit(t)}>Edit</button>
          <button onClick={() => handleDelete(t.therapist_id)}>
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