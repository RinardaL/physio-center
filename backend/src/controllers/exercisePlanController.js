const { ExercisePlan } = require("../models");

// create
exports.createExercisePlan = async (req, res) => {
  try {
    const plan = await ExercisePlan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all
exports.getAllExercisePlans = async (req, res) => {
  try {
    const plans = await ExercisePlan.findAll();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get one
exports.getExercisePlanById = async (req, res) => {
  try {
    const plan = await ExercisePlan.findByPk(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update
exports.updateExercisePlan = async (req, res) => {
  try {
    const plan = await ExercisePlan.findByPk(req.params.id);

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
exports.deleteExercisePlan = async (req, res) => {
  try {
    const plan = await ExercisePlan.findByPk(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Not found" });
    }

    await plan.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};