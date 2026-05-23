const { Exercise } = require("../models");


exports.createExercise = async (req, res) => {
  const data = await Exercise.create(req.body);
  res.status(201).json(data);
};


exports.getExercises = async (req, res) => {
  const data = await Exercise.findAll();
  res.json(data);
};


exports.getExercise = async (req, res) => {
  const data = await Exercise.findByPk(req.params.id);
  res.json(data);
};


exports.updateExercise = async (req, res) => {
  const item = await Exercise.findByPk(req.params.id);
  await item.update(req.body);
  res.send("Updated");
};


exports.deleteExercise = async (req, res) => {
  const item = await Exercise.findByPk(req.params.id);
  await item.destroy();
  res.send("Deleted");
};