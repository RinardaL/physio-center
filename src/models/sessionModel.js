const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Session = sequelize.define(
  "Session",
  {
    session_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    therapist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    treatment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    start_time: {
      type: DataTypes.TIME,
    },
    end_time: {
      type: DataTypes.TIME,
    },
    status: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    progress: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Session",
    timestamps: false,
  }
);

module.exports = Session;