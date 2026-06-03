import { useEffect, useState } from "react";
import api from "../../api";

export default function Payment() {
  const [payments, setPayments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    amount: "",
    payment_method: "",
    status: "pending",
    payment_date: "",
  });

  // LOAD
  const loadPayments = async () => {
    try {
      const res = await api.get("/payments");
      setPayments(res.data);
    } catch (err) {
      console.log("Load error:", err);
    }
  };

  useEffect(() => {
    loadPayments();
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
      await api.post("/payments", formData);

      setFormData({
        amount: "",
        payment_method: "",
        status: "pending",
        payment_date: "",
      });

      setShowForm(false);
      loadPayments();
    } catch (err) {
      console.log(err);
    }
  };

  // SEARCH
  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();

    return (
      p.payment_method?.toLowerCase().includes(q) ||
      p.status?.toLowerCase().includes(q) ||
      String(p.amount).includes(q)
    );
  });

  return (
    <div className="dashboard">

      {/* HERO */}
      <div className="hero">
        <h1>Payments</h1>
        <p>Manage patient payments and transactions</p>
      </div>

      {/* TOOLBAR */}
      <div className="patientsToolbar">

        <input
          className="searchInput"
          placeholder="Search payments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="primaryBtn"
          onClick={() => setShowForm(true)}
        >
          + Add Payment
        </button>

      </div>

      {/* TABLE */}
      <div className="modernTable">
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty">
                  No payments found
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.payment_id}>
                  <td>
                    <strong>${p.amount}</strong>
                  </td>

                  <td>{p.payment_method}</td>

                  <td>
                    <span className="badge">
                      {p.status}
                    </span>
                  </td>

                  <td>
                    {p.payment_date
                      ? new Date(p.payment_date).toLocaleDateString()
                      : "-"}
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
            <h2>Add Payment</h2>

            <form onSubmit={handleSubmit} className="form">

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />

              <input
                name="payment_method"
                placeholder="Payment Method (cash, card, bank)"
                value={formData.payment_method}
                onChange={handleChange}
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>

              <input
                type="date"
                name="payment_date"
                value={formData.payment_date}
                onChange={handleChange}
              />

              <button className="primaryBtn" type="submit">
                Save Payment
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}