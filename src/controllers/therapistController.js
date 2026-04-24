const Therapist = require("../models/therapistModel");

// CREATE
const createTherapist = (req, res) => {
  Therapist.createTherapist(req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.status(201).send("Therapist created");
  });
};

// GET ALL
const getTherapists = (req, res) => {
  Therapist.getAllTherapists((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// GET BY ID
const getTherapist = (req, res) => {
  const { id } = req.params;

  Therapist.getTherapistById(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send("Not found");
    res.json(results[0]);
  });
};

// UPDATE
const updateTherapist = (req, res) => {
  const { id } = req.params;

  Therapist.updateTherapist(id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Updated successfully");
  });
};

// DELETE
const deleteTherapist = (req, res) => {
  const { id } = req.params;

  Therapist.deleteTherapist(id, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Deleted successfully");
  });
};

module.exports = {
  createTherapist,
  getTherapists,
  getTherapist,
  updateTherapist,
  deleteTherapist,
};