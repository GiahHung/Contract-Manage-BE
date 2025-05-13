"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ConstructionContract extends Model {
    static associate(models) {}
  }

  ConstructionContract.init(
    {
      contract_id: DataTypes.INTEGER,
      location: DataTypes.STRING(200),
    },
    {
      sequelize,
      modelName: "ConstructionContract",
      tableName: "ConstructionContracts",
    }
  );

  return ConstructionContract;
};
