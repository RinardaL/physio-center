const express = require("express");
const router = express.Router();

const {
  createExercisePlan,
  getAllExercisePlans,
  getExercisePlanById,
  updateExercisePlan,
  deleteExercisePlan,
} = require("../controllers/exercisePlanController");

router.post("/", createExercisePlan);
router.get("/", getAllExercisePlans);
router.get("/:id", getExercisePlanById);
router.put("/:id", updateExercisePlan);
router.delete("/:id", deleteExercisePlan);

module.exports = router;