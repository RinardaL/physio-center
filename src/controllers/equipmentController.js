const Equipment = require("../models/equipmentModel");

exports.createEquipment = async (req, res) => {
  const data = await Equipment.create(req.body);
  res.status(201).json(data);
};

exports.getEquipment = async (req, res) => {
  const data = await Equipment.findAll();
  res.json(data);
};

exports.getEquipmentById = async (req, res) => {
  const data = await Equipment.findByPk(req.params.id);
  res.json(data);
};

exports.updateEquipment = async (req, res) => {
  const item = await Equipment.findByPk(req.params.id);
  await item.update(req.body);
  res.send("Updated");
};

exports.deleteEquipment = async (req, res) => {
  const item = await Equipment.findByPk(req.params.id);
  await item.destroy();
  res.send("Deleted");
};