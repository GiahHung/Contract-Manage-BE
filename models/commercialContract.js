"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class CommercialContract extends Model {
    static associate(models) {
      CommercialContract.belongsTo(models.Contract, {
        foreignKey: "contract_id",
        as: "contract",
        onDelete: "CASCADE",
      });
    }
  }

  CommercialContract.init(
    {
      contract_id: DataTypes.INTEGER,
      business_scope: DataTypes.STRING(200),
      payment: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: "CommercialContract",
      tableName: "CommercialContracts",
    }
  );

  return CommercialContract;
};
