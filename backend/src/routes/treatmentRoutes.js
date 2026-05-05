const express = require("express");
const router = express.Router();

const {
  createTreatment,
  getAllTreatments,
  getTreatmentById,
  updateTreatment,
  deleteTreatment,
} = require("../controllers/treatmentController");

router.get("/", getAllTreatments);
router.post("/", createTreatment);
router.get("/:id", getTreatmentById);
router.put("/:id", updateTreatment);
router.delete("/:id", deleteTreatment);

module.exports = router;