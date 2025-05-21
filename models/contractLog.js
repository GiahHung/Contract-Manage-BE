"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ContractLog extends Model {
    static associate(models) {
      ContractLog.belongsTo(models.Contract, {
        foreignKey: "contract_id",
        as: "contract",
      });

      // Nếu bạn muốn lưu ai thực hiện action, có thể map về User:
      ContractLog.belongsTo(models.User, {
        foreignKey: "performed_by",
        as: "performer",
      });

      // Nếu muốn lưu ai tạo bản ghi (nếu khác performed_by):
      ContractLog.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "creator",
      });
    }
  }

  ContractLog.init(
    {
      contract_id: DataTypes.INTEGER,
      action: DataTypes.STRING(100),
      performed_by: DataTypes.INTEGER,
      performed_at: DataTypes.DATE, 
      note: DataTypes.TEXT,
      status: DataTypes.STRING(50),
      created_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ContractLog",
      tableName: "ContractLogs",
    }
  );

  return ContractLog;
};
