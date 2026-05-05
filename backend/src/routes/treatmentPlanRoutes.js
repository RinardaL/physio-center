const express = require("express");
const router = express.Router();

const {
  createTreatmentPlan,
  getAllTreatmentPlans,
  getTreatmentPlanById,
  updateTreatmentPlan,
  deleteTreatmentPlan,
} = require("../controllers/treatmentPlanController");

router.post("/", createTreatmentPlan);
router.get("/", getAllTreatmentPlans);
router.get("/:id", getTreatmentPlanById);
router.put("/:id", updateTreatmentPlan);
router.delete("/:id", deleteTreatmentPlan);

module.exports = router;