import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api/exercises";

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
    try {
      const res = await axios.get(API);
      setData(res.data);
    } catch (err) {
      console.log("Load error:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      duration: Number(form.duration),
      difficulty: form.difficulty,
    };

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, payload);
      } else {
        await axios.post(API, payload);
      }

      setForm({
        name: "",
        description: "",
        duration: "",
        difficulty: "",
      });

      setEditingId(null);
      loadExercises();
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  const handleEdit = (ex) => {
    setForm({
      name: ex.name || "",
      description: ex.description || "",
      duration: ex.duration || "",
      difficulty: ex.difficulty || "",
    });

    setEditingId(ex.exercise_id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      loadExercises();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div className="page">
      <h2>Exercises</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <textarea
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

      <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
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
                <td>{ex.description}</td>
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
    </div>
  );
}