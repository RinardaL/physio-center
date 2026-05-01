const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ClinicalAssessment = sequelize.define(
  "ClinicalAssessment",
  {
    assessment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patient_id: DataTypes.INTEGER,
    therapist_id: DataTypes.INTEGER,
    diagnosis: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    pain_level: DataTypes.INTEGER,
  },
  {
    tableName: "ClinicalAssessment",
    timestamps: false,
  }
);

module.exports = ClinicalAssessment;