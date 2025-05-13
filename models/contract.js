"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Contract extends Model {
    static associate(models) {}
  }

  Contract.init(
    {
      contract_code: DataTypes.STRING(50),
      customer: DataTypes.STRING(200),
      employee_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      money: DataTypes.FLOAT,
      title: DataTypes.STRING(200),
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY,
      signed_date: DataTypes.DATEONLY,
      status: {
        type: DataTypes.ENUM("pending", "active", "completed", "cancelled"), // điều chỉnh giá trị phù hợp
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Contract",
      tableName: "Contracts",
    }
  );

  return Contract;
};
