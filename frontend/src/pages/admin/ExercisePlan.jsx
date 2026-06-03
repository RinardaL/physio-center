import { useEffect, useState } from "react";
import api from "../../api";

export default function ExercisesPlan() {
  const [exercises, setExercises] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    difficulty: "",
    duration_minutes: "",
  });

  // LOAD
  const loadExercises = async () => {
    try {
      const res = await api.get("/exercises");
      setExercises(res.data);
    } catch (err) {
      console.log("Load error:", err);
    }
  };

  useEffect(() => {
    loadExercises();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/exercises", formData);

      setFormData({
        name: "",
        description: "",
        difficulty: "",
        duration_minutes: "",
      });

      setShowForm(false);
      loadExercises();
    } catch (err) {
      console.log(err);
    }
  };

  // SEARCH
  const filtered = exercises.filter((ex) => {
    const q = search.toLowerCase();

    return (
      ex.name?.toLowerCase().includes(q) ||
      ex.description?.toLowerCase().includes(q) ||
      ex.difficulty?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="dashboard">

      {/* HERO */}
      <div className="hero">
        <h1>Exercises</h1>
        <p>Manage rehabilitation exercises and difficulty levels</p>
      </div>

      {/* TOOLBAR */}
      <div className="patientsToolbar">

        <input
          className="searchInput"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="primaryBtn"
          onClick={() => setShowForm(true)}
        >
          + Add Exercise
        </button>

      </div>

      {/* TABLE */}
      <div className="modernTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Difficulty</th>
              <th>Duration</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty">
                  No exercises found
                </td>
              </tr>
            ) : (
              filtered.map((ex) => (
                <tr key={ex.exercise_id}>
                  <td>
                    <strong>{ex.name}</strong>
                  </td>

                  <td>{ex.description || "-"}</td>

                  <td>
                    <span className="badge">
                      {ex.difficulty || "-"}
                    </span>
                  </td>

                  <td>
                    {ex.duration_minutes ? `${ex.duration_minutes} min` : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="modal" onClick={() => setShowForm(false)}>
          <div
            className="modalBox"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add Exercise</h2>

            <form onSubmit={handleSubmit} className="form">

              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />

              <input
                name="difficulty"
                placeholder="Difficulty (easy / medium / hard)"
                value={formData.difficulty}
                onChange={handleChange}
              />

              <input
                type="number"
                name="duration_minutes"
                placeholder="Duration (minutes)"
                value={formData.duration_minutes}
                onChange={handleChange}
              />

              <button className="primaryBtn" type="submit">
                Save Exercise
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}