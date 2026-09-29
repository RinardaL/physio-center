// Model relationships. Loaded once by models/index.js.
// `constraints: false` keeps Sequelize from adding database foreign keys on
// existing tables during sync({ alter: true }); the associations still work
// for `include` queries.
const {
  Patient,
  Therapist,
  Treatment,
  Session,
  TreatmentPlan,
  Exercise,
  ClinicalAssessment,
  Appointment,
  User,
  TherapyTask,
} = require("./index");

const soft = { constraints: false };

// Login accounts <-> clinic records
User.hasOne(Patient, { foreignKey: "user_id", as: "patientProfile", ...soft });
Patient.belongsTo(User, { foreignKey: "user_id", as: "account", ...soft });

User.hasOne(Therapist, { foreignKey: "user_id", as: "therapistProfile", ...soft });
Therapist.belongsTo(User, { foreignKey: "user_id", as: "account", ...soft });

// Sessions
Patient.hasMany(Session, { foreignKey: "patient_id", ...soft });
Session.belongsTo(Patient, { foreignKey: "patient_id", ...soft });

Therapist.hasMany(Session, { foreignKey: "therapist_id", ...soft });
Session.belongsTo(Therapist, { foreignKey: "therapist_id", ...soft });

Treatment.hasMany(Session, { foreignKey: "treatment_id", ...soft });
Session.belongsTo(Treatment, { foreignKey: "treatment_id", ...soft });

// Therapy plans (TreatmentPlan) and their tasks
Patient.hasMany(TreatmentPlan, { foreignKey: "patient_id", ...soft });
TreatmentPlan.belongsTo(Patient, { foreignKey: "patient_id", ...soft });

Therapist.hasMany(TreatmentPlan, { foreignKey: "therapist_id", ...soft });
TreatmentPlan.belongsTo(Therapist, { foreignKey: "therapist_id", ...soft });

TreatmentPlan.hasMany(TherapyTask, { foreignKey: "treatment_plan_id", as: "tasks", ...soft });
TherapyTask.belongsTo(TreatmentPlan, { foreignKey: "treatment_plan_id", ...soft });

Exercise.hasMany(TherapyTask, { foreignKey: "exercise_id", ...soft });
TherapyTask.belongsTo(Exercise, { foreignKey: "exercise_id", as: "exercise", ...soft });

// Clinical assessments
Patient.hasMany(ClinicalAssessment, { foreignKey: "patient_id", ...soft });
ClinicalAssessment.belongsTo(Patient, { foreignKey: "patient_id", ...soft });
ClinicalAssessment.belongsTo(Therapist, { foreignKey: "therapist_id", ...soft });

// Appointments are booked between login accounts
User.hasMany(Appointment, { foreignKey: "patientId", as: "patientAppointments", ...soft });
Appointment.belongsTo(User, { foreignKey: "patientId", as: "patient", ...soft });

User.hasMany(Appointment, { foreignKey: "therapistId", as: "therapistAppointments", ...soft });
Appointment.belongsTo(User, { foreignKey: "therapistId", as: "therapist", ...soft });

module.exports = {};
