module.exports = (sequelize, DataTypes) => {
  const Treatment = sequelize.define("Treatment", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    duration: {
      type: DataTypes.INTEGER, // minutes
      allowNull: true,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });

  return Treatment;
};