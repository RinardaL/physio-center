const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SERVER IS WORKING 🚀");
});
// routes
const patientRoutes = require("./routes/patientRoutes");

app.use("/patients", patientRoutes);

module.exports = app;