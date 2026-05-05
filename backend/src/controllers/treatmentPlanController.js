const { TreatmentPlan } = require("../models");

// create
exports.createTreatmentPlan = async (req, res) => {
  try {
    const plan = await TreatmentPlan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all
exports.getAllTreatmentPlans = async (req, res) => {
  try {
    const plans = await TreatmentPlan.findAll();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get one
exports.getTreatmentPlanById = async (req, res) => {
  try {
    const plan = await TreatmentPlan.findByPk(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update
exports.updateTreatmentPlan = async (req, res) => {
  try {
    const plan = await TreatmentPlan.findByPk(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Not found" });
    }

    await plan.update(req.body);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete
exports.deleteTreatmentPlan = async (req, res) => {
  try {
    const plan = await TreatmentPlan.findByPk(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Not found" });
    }

    await plan.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};