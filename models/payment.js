"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Payment extends Model {
    static associate(models) {
      // Ví dụ: Payment.hasMany(models.User, { foreignKey: 'Payment' });
    }
  }

  Payment.init(
    {
      Payment_name: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "Payments",
    }
  );

  return Payment;
};
