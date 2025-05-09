"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Customer extends Model {
    static associate(models) {}
  }

  Customer.init(
    {
     
      name: DataTypes.STRING(100),
      email: {
        type: DataTypes.STRING(100),
        validate: {
          isEmail: true,
        },
      },
      phone: DataTypes.STRING(20),
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "Customers",
    }
  );

  return Customer;
};
