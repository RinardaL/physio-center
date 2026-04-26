//to load models
const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Patient = require("./Patient")(sequelize, DataTypes);

module.exports = {
  sequelize,
  Patient,
};