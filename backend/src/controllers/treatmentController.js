const { Treatment } = require("../models");

// create
exports.createTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.create(req.body);
    res.status(201).json(treatment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all
exports.getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.findAll();
    res.json(treatments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get one
exports.getTreatmentById = async (req, res) => {
  try {
    const treatment = await Treatment.findByPk(req.params.id);

    if (!treatment) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(treatment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update
exports.updateTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findByPk(req.params.id);

    if (!treatment) {
      return res.status(404).json({ message: "Not found" });
    }

    await treatment.update(req.body);
    res.json(treatment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete
exports.deleteTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findByPk(req.params.id);

    if (!treatment) {
      return res.status(404).json({ message: "Not found" });
    }

    await treatment.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};