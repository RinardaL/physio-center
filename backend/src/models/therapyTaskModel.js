// One item of a therapy plan: an exercise or instruction the patient has to do.
// The patient toggles `status` between "todo" and "done" from their own page.
module.exports = (sequelize, DataTypes) => {
  const TherapyTask = sequelize.define(
    "TherapyTask",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      treatment_plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      exercise_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sets: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reps: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      frequency: {
        type: DataTypes.STRING, // e.g. "daily", "3x per week"
        allowNull: true,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM("todo", "done"),
        allowNull: false,
        defaultValue: "todo",
      },
      completed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "TherapyTask",
    }
  );

  return TherapyTask;
};
