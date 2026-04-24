const db = require("../config/db");

// CREATE
const createTherapist = (data, callback) => {
  const sql = "INSERT INTO Terapisti (emri, mbiemri, specializimi) VALUES (?, ?, ?)";
  db.query(sql, [data.emri, data.mbiemri, data.specializimi], callback);
};

// GET ALL
const getAllTherapists = (callback) => {
  db.query("SELECT * FROM Terapisti", callback);
};

// GET BY ID
const getTherapistById = (id, callback) => {
  db.query("SELECT * FROM Terapisti WHERE terapisti_id = ?", [id], callback);
};

// UPDATE
const updateTherapist = (id, data, callback) => {
  const sql = "UPDATE Terapisti SET emri=?, mbiemri=?, specializimi=? WHERE terapisti_id=?";
  db.query(sql, [data.emri, data.mbiemri, data.specializimi, id], callback);
};

// DELETE
const deleteTherapist = (id, callback) => {
  db.query("DELETE FROM Terapisti WHERE terapisti_id = ?", [id], callback);
};

module.exports = {
  createTherapist,
  getAllTherapists,
  getTherapistById,
  updateTherapist,
  deleteTherapist,
};