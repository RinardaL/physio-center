const {
  Patient,
  Therapist,
  Treatment,
  Session,
  TreatmentPlan,
  ExercisePlan,
  Exercise,
  ClinicalAssessment,
  Payment,
} = require("./index");



Patient.hasMany(Session, { foreignKey: "patient_id" });
Patient.hasMany(TreatmentPlan, { foreignKey: "patient_id" });
Patient.hasMany(ClinicalAssessment, { foreignKey: "patient_id" });
Patient.hasMany(Payment, { foreignKey: "patient_id" });



Therapist.hasMany(Session, { foreignKey: "therapist_id" });
Therapist.hasMany(TreatmentPlan, { foreignKey: "therapist_id" });



Treatment.hasMany(Session, { foreignKey: "treatment_id" });



Session.belongsTo(Patient, { foreignKey: "patient_id" });
Session.belongsTo(Therapist, { foreignKey: "therapist_id" });
Session.belongsTo(Treatment, { foreignKey: "treatment_id" });



TreatmentPlan.belongsTo(Patient, { foreignKey: "patient_id" });
TreatmentPlan.belongsTo(Therapist, { foreignKey: "therapist_id" });

TreatmentPlan.hasMany(ExercisePlan, { foreignKey: "plan_id" });


ExercisePlan.belongsTo(TreatmentPlan, { foreignKey: "plan_id" });
ExercisePlan.belongsTo(Exercise, { foreignKey: "exercise_id" });

Exercise.hasMany(ExercisePlan, { foreignKey: "exercise_id" });



ClinicalAssessment.belongsTo(Patient, { foreignKey: "patient_id" });
ClinicalAssessment.belongsTo(Therapist, { foreignKey: "therapist_id" });



Payment.belongsTo(Patient, { foreignKey: "patient_id" });


Session.hasOne(Payment, { foreignKey: "session_id" });
Payment.belongsTo(Session, { foreignKey: "session_id" });

module.exports = {};