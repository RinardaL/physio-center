module.exports = (sequelize, DataTypes) => {
  const ExercisePlan = sequelize.define(
    "ExercisePlan",
    {
      plan_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      total_duration: {
        type: DataTypes.INTEGER, // in minutes
        allowNull: true,
      },
    },
    {
      tableName: "ExercisePlan",
      timestamps: false,
    }
  );

  return ExercisePlan;
};