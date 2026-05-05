// to load models
const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Patient = require("./patientModel")(sequelize, DataTypes);
const Treatment = require("./treatmentModel")(sequelize, DataTypes);
const TreatmentPlan = require("./treatmentPlanModel")(sequelize, DataTypes);

module.exports = {
  sequelize,
  Patient,
  Treatment,
  TreatmentPlan,
};