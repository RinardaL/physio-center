require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const sequelize = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const therapistRoutes = require("./src/routes/therapistRoutes");
const sessionRoutes = require("./src/routes/sessionRoutes");
const exerciseRoutes = require("./src/routes/exerciseRoutes");
const clinicalAssessmentRoutes = require("./src/routes/clinicalAssessmentRoutes");
const patientRoutes = require("./src/routes/patientRoutes");
const treatmentRoutes = require("./src/routes/treatmentRoutes");
const treatmentPlanRoutes = require("./src/routes/treatmentPlanRoutes");
const exercisePlanRoutes = require("./src/routes/exercisePlanRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const stripeRoutes = require("./src/routes/stripeRoutes");
const appointmentRoutes = require("./src/routes/appointmentRoutes");

require("./src/models/index");

const app = express();


app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));


app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/clinicalAssessment", clinicalAssessmentRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/treatment-plans", treatmentPlanRoutes);
app.use("/api/exercise-plans", exercisePlanRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/appointments",appointmentRoutes);

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync({ alter: true });
    console.log("Tables created");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB error:", err);
  }
})();