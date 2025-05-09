"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Role extends Model {
    static associate(models) {
      // Ví dụ: Role.hasMany(models.User, { foreignKey: 'role' });
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
