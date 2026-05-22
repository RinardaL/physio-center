require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes")

// load associations
require("./src/models/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

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