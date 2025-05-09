"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Contract extends Model {
    static associate(models) {}
  }

  Contract.init(
    {
      contract_code: DataTypes.STRING(50),
      customer_id: DataTypes.INTEGER,
      employee_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      title: DataTypes.STRING(200),
      content: DataTypes.TEXT,
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
