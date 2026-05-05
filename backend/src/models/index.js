// to load models
const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Patient = require("./patientModel")(sequelize, DataTypes);

module.exports = {
  sequelize,
  Patient,
};