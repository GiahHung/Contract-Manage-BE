"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Contract extends Model {
    static associate(models) {
      Contract.hasOne(models.LabourContract, {
        foreignKey: "contract_id",
        as: "labourDetail",
        onDelete: "CASCADE",
      });

      // A contract can have one ConstructionContract
      Contract.hasOne(models.ConstructionContract, {
        foreignKey: "contract_id",
        as: "constructionDetail",
        onDelete: "CASCADE",
      });

      // A contract can have one CommercialContract
      Contract.hasOne(models.CommercialContract, {
        foreignKey: "contract_id",
        as: "commercialDetail",
        onDelete: "CASCADE",
      });

      // Optionally, a contract belongs to an Employee
      Contract.belongsTo(models.User, {
        foreignKey: "employee_id",
        as: "employee",
      });
    }
  }

  Contract.init(
    {
      contract_code: DataTypes.STRING(50),
      customer: DataTypes.STRING(200),
      employee_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      money: DataTypes.FLOAT,
      title: DataTypes.STRING(200),
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY,
      signed_date: DataTypes.DATEONLY,
      status: {
        type: DataTypes.ENUM("pending", "active", "completed", "cancelled"), // điều chỉnh giá trị phù hợp
        allowNull: false,
        defaultValue: "pending",
      },
      filepath: {
        type: DataTypes.STRING,
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
