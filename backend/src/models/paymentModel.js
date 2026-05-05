module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      payment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      payment_method: {
        type: DataTypes.STRING, // cash, card, bank transfer
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING, // paid, pending, failed
        defaultValue: "pending",
      },

      payment_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "Payments",
      timestamps: false,
    }
  );

  return Payment;
};