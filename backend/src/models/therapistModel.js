const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Therapist = sequelize.define(
  "Therapist",
  {
    therapist_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Therapist",
    timestamps: false,
  }
);

module.exports = Therapist;