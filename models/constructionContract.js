"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ConstructionContract extends Model {
    static associate(models) {
      ConstructionContract.belongsTo(models.Contract, {
        foreignKey: "contract_id",
        as: "contract",
        onDelete: "CASCADE",
      });
    }
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
