const Therapist = require("../models/therapistModel");

// CREATE
const createTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.create(req.body);
    res.status(201).json(therapist);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET ALL
const getTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.findAll();
    res.json(therapists);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET BY ID
const getTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.findByPk(req.params.id);
    if (!therapist) return res.status(404).send("Not found");
    res.json(therapist);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// UPDATE
const updateTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.findByPk(req.params.id);
    if (!therapist) return res.status(404).send("Not found");

    await therapist.update(req.body);
    res.send("Updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// DELETE
const deleteTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.findByPk(req.params.id);
    if (!therapist) return res.status(404).send("Not found");

    await therapist.destroy();
    res.send("Deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createTherapist,
  getTherapists,
  getTherapist,
  updateTherapist,
  deleteTherapist,
};