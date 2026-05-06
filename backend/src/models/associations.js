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


// =====================
// PATIENT 1:N
// =====================
Patient.hasMany(Session, { foreignKey: "patient_id" });
Patient.hasMany(TreatmentPlan, { foreignKey: "patient_id" });
Patient.hasMany(ClinicalAssessment, { foreignKey: "patient_id" });
Patient.hasMany(Payment, { foreignKey: "patient_id" });


// =====================
// THERAPIST 1:N
// =====================
Therapist.hasMany(Session, { foreignKey: "therapist_id" });
Therapist.hasMany(TreatmentPlan, { foreignKey: "therapist_id" });


// =====================
// TREATMENT 1:N SESSION
// =====================
Treatment.hasMany(Session, { foreignKey: "treatment_id" });


// =====================
// SESSION RELATIONS
// =====================
Session.belongsTo(Patient, { foreignKey: "patient_id" });
Session.belongsTo(Therapist, { foreignKey: "therapist_id" });
Session.belongsTo(Treatment, { foreignKey: "treatment_id" });


// =====================
// TREATMENT PLAN
// =====================
TreatmentPlan.belongsTo(Patient, { foreignKey: "patient_id" });
TreatmentPlan.belongsTo(Therapist, { foreignKey: "therapist_id" });

TreatmentPlan.hasMany(ExercisePlan, { foreignKey: "plan_id" });


// =====================
// EXERCISE PLAN (N:M logjikë)
// =====================
ExercisePlan.belongsTo(TreatmentPlan, { foreignKey: "plan_id" });
ExercisePlan.belongsTo(Exercise, { foreignKey: "exercise_id" });

Exercise.hasMany(ExercisePlan, { foreignKey: "exercise_id" });


// =====================
// CLINICAL ASSESSMENT
// =====================
ClinicalAssessment.belongsTo(Patient, { foreignKey: "patient_id" });
ClinicalAssessment.belongsTo(Therapist, { foreignKey: "therapist_id" });


// =====================
// PAYMENT
// =====================
Payment.belongsTo(Patient, { foreignKey: "patient_id" });

// 1:1 Session → Payment
Session.hasOne(Payment, { foreignKey: "session_id" });
Payment.belongsTo(Session, { foreignKey: "session_id" });

module.exports = {};