"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class CommercialContract extends Model {
    static associate(models) {}
  }

  CommercialContract.init(
    {
      contract_id: DataTypes.INTEGER,
      business_scope: DataTypes.STRING(200),
      payment_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CommercialContract",
      tableName: "CommercialContracts",
    }
  );

  return CommercialContract;
};
