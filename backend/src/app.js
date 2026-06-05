const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());



const therapistRoutes = require("./routes/therapistRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const clinicalAssessmentRoutes = require("./routes/clinicalAssessmentRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const patientRoutes = require("./routes/patientRoutes");
const treatmentRoutes = require("./routes/treatmentRoutes");
const treatmentPlanRoutes = require("./routes/treatmentPlanRoutes");
const exercisePlanRoutes = require("./routes/exercisePlanRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const appointmentRoutes=require("./routes/appointmentRoutes.js");


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/therapists", therapistRoutes);
app.use("/sessions", sessionRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/assessments", clinicalAssessmentRoutes);
app.use("/equipment", equipmentRoutes);
app.use("/patients", patientRoutes);
app.use("/treatments", treatmentRoutes);
app.use("/treatment-plans", treatmentPlanRoutes);
app.use("/exercise-plans", exercisePlanRoutes);
app.use("/payments", paymentRoutes);
app.use("/appointments",appointmentRoutes);

app.get("/", (req, res) => {
  res.send("SERVER IS WORKING");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server error");
});

module.exports = app;