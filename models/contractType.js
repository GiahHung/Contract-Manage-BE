"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ContractType extends Model {
    static associate(models) {
      // Ví dụ: ContractType.hasMany(models.Contract, { foreignKey: 'type_id' });
    }
  }

  ContractType.init(
    {
      type_name: DataTypes.STRING(100)
    },
    {
      sequelize,
      modelName: "ContractType",
      tableName: "ContractTypes",
    }
  );

  return ContractType;
};
