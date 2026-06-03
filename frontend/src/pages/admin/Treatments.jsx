import { useEffect, useState } from "react";
import api from "../../api";

export default function Treatments() {
  const [treatments, setTreatments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
  });

  // LOAD
  const loadTreatments = async () => {
    try {
      const res = await api.get("/treatments");
      setTreatments(res.data);
    } catch (err) {
      console.log("Load error:", err);
    }
  };

  useEffect(() => {
    loadTreatments();
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
      await api.post("/treatments", formData);

      setFormData({
        name: "",
        description: "",
        duration: "",
        price: "",
      });

      setShowForm(false);
      loadTreatments();
    } catch (err) {
      console.log(err);
    }
  };

  // SEARCH
  const filtered = treatments.filter((t) => {
    const q = search.toLowerCase();

    return (
      t.name?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="dashboard">

      {/* HERO */}
      <div className="hero">
        <h1>Treatments</h1>
        <p>Manage clinic treatments and services</p>
      </div>

      {/* TOOLBAR */}
      <div className="patientsToolbar">

        <input
          className="searchInput"
          placeholder="Search treatments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="primaryBtn"
          onClick={() => setShowForm(true)}
        >
          + Add Treatment
        </button>

      </div>

      {/* TABLE */}
      <div className="modernTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Duration (min)</th>
              <th>Price (€)</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty">
                  No treatments found
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong>{t.name}</strong>
                  </td>

                  <td>
                    {t.description || "-"}
                  </td>

                  <td>
                    {t.duration ? `${t.duration} min` : "-"}
                  </td>

                  <td>
                    {t.price ? `€${t.price}` : "-"}
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
            <h2>Add Treatment</h2>

            <form onSubmit={handleSubmit} className="form">

              <input
                name="name"
                placeholder="Treatment name"
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
                type="number"
                name="duration"
                placeholder="Duration (minutes)"
                value={formData.duration}
                onChange={handleChange}
              />

              <input
                type="number"
                step="0.01"
                name="price"
                placeholder="Price (€)"
                value={formData.price}
                onChange={handleChange}
              />

              <button className="primaryBtn" type="submit">
                Save Treatment
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}