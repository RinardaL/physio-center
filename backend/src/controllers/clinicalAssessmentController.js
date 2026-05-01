const ClinicalAssessment = require("../models/clinicalAssessmentModel");

exports.createAssessment = async (req, res) => {
  const data = await ClinicalAssessment.create(req.body);
  res.status(201).json(data);
};

exports.getAssessments = async (req, res) => {
  const data = await ClinicalAssessment.findAll();
  res.json(data);
};

exports.getAssessment = async (req, res) => {
  const data = await ClinicalAssessment.findByPk(req.params.id);
  res.json(data);
};

exports.updateAssessment = async (req, res) => {
  const item = await ClinicalAssessment.findByPk(req.params.id);
  await item.update(req.body);
  res.send("Updated");
};

exports.deleteAssessment = async (req, res) => {
  const item = await ClinicalAssessment.findByPk(req.params.id);
  await item.destroy();
  res.send("Deleted");
};