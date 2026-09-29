module.exports = (sequelize, DataTypes) => {
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
    // Login account (User) of this therapist, if they have one.
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Therapist",
    timestamps: false,
  }
);
return Therapist;
};
