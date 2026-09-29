const express = require("express");
const router = express.Router();
const requireTherapist = require("../middleware/requireTherapist");
const c = require("../controllers/therapyController");

// Mounted behind authMiddleware in server.js.

// Patient side
router.get("/mine", c.myPlans);
router.patch("/tasks/:taskId/status", c.setTaskStatus);

// Therapist side
router.get("/", requireTherapist, c.listPlans);
router.post("/", requireTherapist, c.createPlan);
router.get("/:id", c.getPlan);
router.put("/:id", requireTherapist, c.updatePlan);
router.delete("/:id", requireTherapist, c.deletePlan);
router.post("/:id/tasks", requireTherapist, c.addTask);
router.put("/tasks/:taskId", requireTherapist, c.updateTask);
router.delete("/tasks/:taskId", requireTherapist, c.deleteTask);

module.exports = router;
