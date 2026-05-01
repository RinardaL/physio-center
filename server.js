require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/db");
//sequelize.sync({ force: true })

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