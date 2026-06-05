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
  Appointment,
  User,
} = require("./index");



Patient.hasMany(Session, { foreignKey: "patient_id" });
Patient.hasMany(TreatmentPlan, { foreignKey: "patient_id" });
Patient.hasMany(ClinicalAssessment, { foreignKey: "patient_id" });
Patient.hasMany(Payment, { foreignKey: "patient_id" });



Therapist.hasMany(Session, { foreignKey: "therapist_id" });
Therapist.hasMany(TreatmentPlan, { foreignKey: "therapist_id" });



Treatment.hasMany(Session, { foreignKey: "treatment_id" });



Session.belongsTo(User, { foreignKey: "patient_id" });
Session.belongsTo(User, { foreignKey: "therapist_id" });
Session.belongsTo(Treatment, { foreignKey: "treatment_id" });



TreatmentPlan.belongsTo(Patient, { foreignKey: "patient_id" });
TreatmentPlan.belongsTo(Therapist, { foreignKey: "therapist_id" });

TreatmentPlan.hasMany(ExercisePlan, { foreignKey: "plan_id" });


ExercisePlan.belongsTo(TreatmentPlan, { foreignKey: "plan_id" });
ExercisePlan.belongsTo(Exercise, { foreignKey: "exercise_id" });

Exercise.hasMany(ExercisePlan, { foreignKey: "exercise_id" });



ClinicalAssessment.belongsTo(User, { foreignKey: "patient_id" });
ClinicalAssessment.belongsTo(User, { foreignKey: "therapist_id" });



Payment.belongsTo(User, { foreignKey: "patient_id" });


Session.hasOne(Payment, { foreignKey: "session_id" });
Payment.belongsTo(Session, { foreignKey: "session_id" });



// =======================
// USER ↔ APPOINTMENT
// =======================

// pacienti
User.hasMany(Appointment, {
  foreignKey: "patientId",
  as: "patientAppointments",
});

Appointment.belongsTo(User, {
  foreignKey: "patientId",
  as: "patient",
});


// terapisti
User.hasMany(Appointment, {
  foreignKey: "therapistId",
  as: "therapistAppointments",
});

Appointment.belongsTo(User, {
  foreignKey: "therapistId",
  as: "therapist",
});
module.exports = {};