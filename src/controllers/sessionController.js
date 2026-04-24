const Session = require("../models/sessionModel");

// CREATE
const createSession = (req, res) => {
  Session.createSession(req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.status(201).send("Session created");
  });
};

// GET ALL
const getSessions = (req, res) => {
  Session.getAllSessions((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// GET BY ID
const getSession = (req, res) => {
  Session.getSessionById(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};

// UPDATE
const updateSession = (req, res) => {
  Session.updateSession(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Updated successfully");
  });
};

// DELETE
const deleteSession = (req, res) => {
  Session.deleteSession(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Deleted successfully");
  });
};

module.exports = {
  createSession,
  getSessions,
  getSession,
  updateSession,
  deleteSession,
};