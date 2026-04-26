const { sequelize } = require("./src/models");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync({ alter: true });
    console.log("Tables created");

  } catch (err) {
    console.error("DB error:", err);
  }
})();
