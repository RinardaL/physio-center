import { useEffect, useState } from "react";
import api from "../../api";

export default function TreatmentPlan() {
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    notes: "",
  });

  // LOAD
  const loadPlans = async () => {
    try {
      const res = await api.get("/treatment-plans");
      setPlans(res.data);
    } catch (err) {
      console.log("Load error:", err);
    }
  };

  useEffect(() => {
    loadPlans();
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
      await api.post("/treatment-plans", formData);

      setFormData({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        notes: "",
      });

      setShowForm(false);
      loadPlans();
    } catch (err) {
      console.log(err);
    }
  };

  // SEARCH
  const filtered = plans.filter((p) => {
    const q = search.toLowerCase();

    return (
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="dashboard">

      {/* HERO */}
      <div className="hero">
        <h1>Treatment Plans</h1>
        <p>Manage patient treatment plans and progress</p>
      </div>

      {/* TOOLBAR */}
      <div className="patientsToolbar">

        <input
          className="searchInput"
          placeholder="Search treatment plans..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="primaryBtn"
          onClick={() => setShowForm(true)}
        >
          + Add Plan
        </button>

      </div>

      {/* TABLE */}
      <div className="modernTable">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty">
                  No treatment plans found
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.title}</strong>
                  </td>

                  <td>
                    {p.description || "-"}
                  </td>

                  <td>
                    {p.start_date}
                  </td>

                  <td>
                    {p.end_date || "-"}
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
            <h2>Add Treatment Plan</h2>

            <form onSubmit={handleSubmit} className="form">

              <input
                name="title"
                placeholder="Title"
                value={formData.title}
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
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
              />

              <textarea
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
              />

              <button className="primaryBtn" type="submit">
                Save Plan
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}