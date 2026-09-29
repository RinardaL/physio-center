module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define("Patient", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: true,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    medical_history: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // Login account (User) this patient record belongs to, if the patient has one.
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return Patient;
};