import { useEffect, useState } from "react";
import axios from "axios";

export default function Exercises() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    duration: "",
    difficulty: "",
  });

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    const res = await axios.get("/exercises");
    setData(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`/exercises/${editingId}`, form);
    } else {
      await axios.post("/exercises", form);
    }

    setForm({
      name: "",
      description: "",
      duration: "",
      difficulty: "",
    });

    setEditingId(null);
    loadExercises();
  };

  const handleEdit = (ex) => {
    setForm(ex);
    setEditingId(ex.exercise_id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/exercises/${id}`);
    loadExercises();
  };

  return (
    <div className="container">
      <h2>Exercises</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="duration"
          placeholder="Duration (min)"
          value={form.duration}
          onChange={handleChange}
        />
        <input
          name="difficulty"
          placeholder="Difficulty (easy/medium/hard)"
          value={form.difficulty}
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
            <th>Duration</th>
            <th>Difficulty</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((ex) => (
            <tr key={ex.exercise_id}>
              <td>{ex.exercise_id}</td>
              <td>{ex.name}</td>
              <td>{ex.duration}</td>
              <td>{ex.difficulty}</td>
              <td>
                <button onClick={() => handleEdit(ex)}>Edit</button>
                <button onClick={() => handleDelete(ex.exercise_id)}>
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