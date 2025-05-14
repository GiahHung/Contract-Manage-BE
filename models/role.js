"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: "role",
        as: "users",
      });
    }
  }

  Role.init(
    {
      role_name: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "Roles",
    }
  );

  return Role;
};
