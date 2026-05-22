const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");


const ClinicalAssessment = require("./clinicalAssessmentModel")(sequelize, DataTypes);
const Equipment = require("./equipmentModel")(sequelize, DataTypes);
const Exercise = require("./exerciseModel")(sequelize, DataTypes);
const ExercisePlan = require("./exercisePlanModel")(sequelize, DataTypes);
const Patient = require("./patientModel")(sequelize, DataTypes);
const Payment = require("./paymentModel")(sequelize, DataTypes);
const Session = require("./sessionModel")(sequelize, DataTypes);
const Therapist = require("./therapistModel")(sequelize, DataTypes);
const Treatment = require("./treatmentModel")(sequelize, DataTypes);
const TreatmentPlan = require("./treatmentPlanModel")(sequelize, DataTypes);
const  User = require("./userModel")(sequelize,DataTypes);





module.exports = {
  sequelize,
  ClinicalAssessment,
  Equipment,
  Exercise,
  ExercisePlan,
  Patient,
  Payment,
  Session,
  Therapist,
  Treatment,
  TreatmentPlan,
  User,
  

};

Object.keys(module.exports).forEach((modelName) => {
  if (module.exports[modelName].associate) {
    module.exports[modelName].associate(module.exports);
  }

});

console.log("EXPORTS:", module.exports);