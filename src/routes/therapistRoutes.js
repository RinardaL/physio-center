const express = require("express");
const router = express.Router();

const {
  createTherapist,
  getTherapists,
  getTherapist,
  updateTherapist,
  deleteTherapist,
} = require("../controllers/therapistController");

router.post("/", createTherapist);
router.get("/", getTherapists);
router.get("/:id", getTherapist);
router.put("/:id", updateTherapist);
router.delete("/:id", deleteTherapist);

module.exports = router;