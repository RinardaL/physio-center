const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Exercise = sequelize.define(
  "Exercise",
  {
    exercise_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    difficulty: DataTypes.STRING,
    duration_minutes: DataTypes.INTEGER,
  },
  {
    tableName: "Exercise",
    timestamps: false,
  }
);

module.exports = Exercise;