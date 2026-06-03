import { useEffect, useState } from "react";
import api from "../../api";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    address: "",
    medical_history: "",
  });

  // LOAD
  const loadPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (err) {
      console.log("Load error:", err);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  // INPUT CHANGE
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
      await api.post("/patients", formData);

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        gender: "",
        address: "",
        medical_history: "",
      });

      setShowForm(false);
      loadPatients();
    } catch (err) {
      console.log(err);
    }
  };

  // SEARCH
  const filtered = patients.filter((p) => {
    const q = search.toLowerCase();

    return (
      `${p.first_name} ${p.last_name}`.toLowerCase().includes(q) ||
      p.email?.toLowerCase().includes(q) ||
      p.phone?.includes(q)
    );
  });

  const initials = (f, l) =>
    `${(f?.[0] || "?")}${(l?.[0] || "?")}`.toUpperCase();

  return (
    <div className="dashboard">

      {/* HERO */}
      <div className="hero">
        <h1>Patients</h1>
        <p>Manage all patient records</p>
      </div>

      {/* SECTION */}
      <div className="section">

        <div className="patientsToolbar">
          <input
            className="searchInput"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="primaryBtn"
            onClick={() => setShowForm(true)}
          >
            + Add Patient
          </button>
        </div>

        {/* TABLE */}
        <div className="modernTable">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Gender</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty">
                    No patients found
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id}>
                    <td className="nameCell">
                      <div className="avatar">
                        {initials(p.first_name, p.last_name)}
                      </div>
                      <div>
                        <strong>
                          {p.first_name} {p.last_name}
                        </strong>
                        <div style={{ fontSize: "12px", opacity: 0.6 }}>
                          {p.address || "-"}
                        </div>
                      </div>
                    </td>

                    <td>{p.email || "-"}</td>
                    <td>{p.phone || "-"}</td>
                    <td>{p.date_of_birth || "-"}</td>

                    <td>
                      <span className="badge">
                        {p.gender || "-"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL */}
      {showForm && (
        <div className="modal" onClick={() => setShowForm(false)}>
          <div
            className="modalBox"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add Patient</h2>

            <form onSubmit={handleSubmit} className="form">

              <input
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />

              <input
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />

              <textarea
                name="medical_history"
                placeholder="Medical History"
                value={formData.medical_history}
                onChange={handleChange}
              />

              <button className="primaryBtn" type="submit">
                Save Patient
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}