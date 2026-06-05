const express = require("express");
const router = express.Router();

const { createAppointment } = require("../controllers/appointmentController");
const auth = require("../middleware/authMiddleware");


router.post("/", auth, createAppointment);
module.exports = router;