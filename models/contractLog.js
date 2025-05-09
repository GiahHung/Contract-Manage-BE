"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ContractLog extends Model {
    static associate(models) {}
  }

  ContractLog.init(
    {
      
      contract_id: DataTypes.INTEGER,
      action: DataTypes.STRING(100),
      performed_by: DataTypes.STRING(100),
      performed_at: DataTypes.DATE,
      note: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ContractLog",
      tableName: "ContractLogs",
    }
  );

  return ContractLog;
};
