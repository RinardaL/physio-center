const db = require("../config/db");

// CREATE
const createSession = (data, callback) => {
  const sql = `
    INSERT INTO Seanca
    (patient_id, therapist_id, treatment_id, date, start_time, end_time, status, notes, progress)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.patient_id,
      data.therapist_id,
      data.treatment_id,
      data.date,
      data.start_time,
      data.end_time,
      data.status,
      data.notes,
      data.progress,
    ],
    callback
  );
};

// GET ALL
const getAllSessions = (callback) => {
  db.query("SELECT * FROM Seanca", callback);
};

// GET BY ID
const getSessionById = (id, callback) => {
  db.query("SELECT * FROM Seanca WHERE session_id = ?", [id], callback);
};

// UPDATE
const updateSession = (id, data, callback) => {
  const sql = `
    UPDATE Seanca SET
    patient_id=?, therapist_id=?, treatment_id=?, date=?,
    start_time=?, end_time=?, status=?, notes=?, progress=?
    WHERE session_id=?
  `;

  db.query(
    sql,
    [
      data.patient_id,
      data.therapist_id,
      data.treatment_id,
      data.date,
      data.start_time,
      data.end_time,
      data.status,
      data.notes,
      data.progress,
      id,
    ],
    callback
  );
};

// DELETE
const deleteSession = (id, callback) => {
  db.query("DELETE FROM Seanca WHERE session_id = ?", [id], callback);
};

module.exports = {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
};