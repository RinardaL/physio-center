import { useEffect, useState } from "react";
import api from "../../api";

export default function Equipment() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    status: "available",
  });

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      const res = await api.get("/equipment");
      setData(res.data);
    } catch {
      setData([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/equipment/${editingId}`, form);
    } else {
      await api.post("/equipment", form);
    }

    setForm({ name: "", status: "available" });
    setEditingId(null);
    loadEquipment();
  };

  const handleEdit = (e) => {
    setForm(e);
    setEditingId(e.equipment_id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/equipment/${id}`);
    loadEquipment();
  };

  return (
    <div className="page">
      <h2>Equipment</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Equipment name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="available">Available</option>
          <option value="in_use">In Use</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <button>{editingId ? "Update" : "Add"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((e) => (
            <tr key={e.equipment_id}>
              <td>{e.equipment_id}</td>
              <td>{e.name}</td>
              <td>
                <span className={`status ${e.status}`}>
                  {e.status}
                </span>
              </td>
              <td>
                <button onClick={() => handleEdit(e)}>Edit</button>
                <button onClick={() => handleDelete(e.equipment_id)}>
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