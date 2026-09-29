const express = require("express");
const router = express.Router();
const c = require("../controllers/appointmentController");

// Mounted behind authMiddleware in server.js.
router.get("/therapists", c.listTherapists);
router.get("/", c.listAppointments);
router.post("/", c.createAppointment);
router.patch("/:id/status", c.updateStatus);

module.exports = router;
