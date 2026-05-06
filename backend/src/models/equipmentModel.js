module.exports = (sequelize, DataTypes) => {
const Equipment = sequelize.define(
  "Equipment",
  {
    equipment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    condition: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
  },
  {
    tableName: "Equipment",
    timestamps: false,
  }
);

return Equipment;
};