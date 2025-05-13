"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class LabourContract extends Model {
    static associate(models) {}
  }

  LabourContract.init(
    {
      contract_id: DataTypes.INTEGER,
      position: DataTypes.STRING(200),
      work_hour: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: "LabourContract",
      tableName: "LabourContracts",
    }
  );

  return LabourContract;
};
