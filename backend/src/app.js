const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// routes
const therapistRoutes = require("./routes/therapistRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const clinicalAssessmentRoutes = require("./routes/clinicalAssessmentRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const patientRoutes = require("./routes/patientRoutes");
const treatmentRoutes = require("./routes/treatmentRoutes");
const treatmentPlanRoutes = require("./routes/treatmentPlanRoutes");

app.use("/therapists", therapistRoutes);
app.use("/sessions", sessionRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/assessments", clinicalAssessmentRoutes);
app.use("/equipment", equipmentRoutes);
app.use("/patients", patientRoutes);
app.use("/treatments", treatmentRoutes);
app.use("/treatment-plans", treatmentPlanRoutes);


// test route
app.get("/", (req, res) => {
  res.send("SERVER IS WORKING");
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server error");
});

module.exports = app;