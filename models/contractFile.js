"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ContractFile extends Model {
    static associate(models) {}
  }

  ContractFile.init(
    {
      contract_id: DataTypes.INTEGER,
      file_name: DataTypes.STRING(255),
      file_path: DataTypes.STRING(500),
    },
    {
      sequelize,
      modelName: "ContractFile",
      tableName: "ContractFiles",
    }
  );

  return ContractFile;
};
