require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const sequelize = require("./src/config/db");
require("./src/models"); // registers models + associations

const auth = require("./src/middleware/authMiddleware");
const requireTherapist = require("./src/middleware/requireTherapist");

const authRoutes = require("./src/routes/authRoutes");
const therapistRoutes = require("./src/routes/therapistRoutes");
const sessionRoutes = require("./src/routes/sessionRoutes");
const exerciseRoutes = require("./src/routes/exerciseRoutes");
const clinicalAssessmentRoutes = require("./src/routes/clinicalAssessmentRoutes");
const patientRoutes = require("./src/routes/patientRoutes");
const treatmentRoutes = require("./src/routes/treatmentRoutes");
const treatmentPlanRoutes = require("./src/routes/treatmentPlanRoutes");
const exercisePlanRoutes = require("./src/routes/exercisePlanRoutes");
const equipmentRoutes = require("./src/routes/equipmentRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const stripeRoutes = require("./src/routes/stripeRoutes");
const appointmentRoutes = require("./src/routes/appointmentRoutes");
const therapyRoutes = require("./src/routes/therapyRoutes");

const app = express();

// Stripe needs the raw body to verify webhook signatures: keep this before express.json().
app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// ---------- ROUTES ----------
// Public
app.use("/api/auth", authRoutes);
app.use("/api/stripe", stripeRoutes); // checkout is protected inside; webhook stays public

// Any logged-in user (patients and therapists)
app.use("/api/appointments", auth, appointmentRoutes);
app.use("/api/therapy", auth, therapyRoutes);

// Any logged-in user may read, only therapists may change
app.use("/api/therapists", auth, requireTherapist.forWrites, therapistRoutes);
app.use("/api/exercises", auth, requireTherapist.forWrites, exerciseRoutes);
app.use("/api/treatments", auth, requireTherapist.forWrites, treatmentRoutes);

// Therapists only (clinic management)
app.use("/api/patients", auth, requireTherapist, patientRoutes);
app.use("/api/sessions", auth, requireTherapist, sessionRoutes);
app.use("/api/clinicalAssessment", auth, requireTherapist, clinicalAssessmentRoutes);
app.use("/api/assessments", auth, requireTherapist, clinicalAssessmentRoutes); // alias used by the frontend
app.use("/api/treatment-plans", auth, requireTherapist, treatmentPlanRoutes);
app.use("/api/exercise-plans", auth, requireTherapist, exercisePlanRoutes);
app.use("/api/equipment", auth, requireTherapist, equipmentRoutes);
app.use("/api/payments", auth, requireTherapist, paymentRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

// 404 for unknown API paths
app.use("/api", (req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` }));

// Central error handler (bad JSON, unexpected throws)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync({ alter: true });
    console.log("Tables synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB error:", err);
  }
})();
