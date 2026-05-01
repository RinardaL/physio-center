const Session = require("../models/sessionModel");

// CREATE
const createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET ALL
const getSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll();
    res.json(sessions);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET BY ID
const getSession = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (!session) return res.status(404).send("Not found");
    res.json(session);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// UPDATE
const updateSession = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (!session) return res.status(404).send("Not found");

    await session.update(req.body);
    res.send("Updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// DELETE
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (!session) return res.status(404).send("Not found");

    await session.destroy();
    res.send("Deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createSession,
  getSessions,
  getSession,
  updateSession,
  deleteSession,
};