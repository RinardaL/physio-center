const express = require("express");
const app = express();

app.use(express.json());

//routes
 const therapistRoutes = require("./routes/therapistRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const clinicalAssessmentRoutes= require("./routes/clinicalAssessmentRoutes");
const equipmentRoutes= require("./routes/equipmentRoutes");



app.use("/therapists", therapistRoutes);
app.use("/sessions", sessionRoutes);
app.use("/exercises", require("./routes/exerciseRoutes"));
app.use("/assessments", require("./routes/clinicalAssessmentRoutes"));
app.use("/equipment", require("./routes/equipmentRoutes"));


// test route
app.get("/", (req, res) => {
  res.send("SERVER IS WORKING 🚀");
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server error");
});

module.exports = app;