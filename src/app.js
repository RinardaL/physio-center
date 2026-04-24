const express = require("express");
const app = express();

app.use(express.json());

// routes
const therapistRoutes = require("./routes/therapistRoutes");
app.use("/therapists", therapistRoutes);


// test route
app.get("/", (req, res) => {
  res.send("SERVER IS WORKING 🚀");
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server error");
});

module.exports = app;