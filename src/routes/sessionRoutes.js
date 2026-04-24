const express = require("express");
const router = express.Router();

const {
  createSession,
  getSessions,
  getSession,
  updateSession,
  deleteSession,
} = require("../controllers/sessionController");

 
const validateSession = require("../middleware/validateSession");


//CREATE
router.post("/",validateSession,createSession);

// GET ALL
router.get("/", getSessions);

// GET BY ID
router.get("/:id", getSession);

// UPDATE
router.put("/:id",validateSession,updateSession);

// DELETE
router.delete("/:id", deleteSession);

module.exports = router;