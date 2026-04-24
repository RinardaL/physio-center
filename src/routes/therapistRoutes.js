const express = require("express");
const router = express.Router();

const {
  createTherapist,
  getTherapists,
  getTherapist,
  updateTherapist,
  deleteTherapist,
} = require("../controllers/therapistController");


const validateTherapist = require("../middleware/validateTherapist");

// CREATE
router.post("/", validateTherapist, createTherapist);

// GET ALL
router.get("/", getTherapists);

// GET BY ID
router.get("/:id", getTherapist);

// UPDATE
router.put("/:id", validateTherapist, updateTherapist);

// DELETE
router.delete("/:id", deleteTherapist);


module.exports = router;