"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "role",
        as: "roleInfo", // alias khi include
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email cannot be empty" },
          isEmail: { msg: "Email must be a valid email address" },
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password cannot be empty" },
        },
      },
      phone: {
        type: DataTypes.STRING(20),
        validate: {
          notEmpty: { msg: "Phone cannot be empty" },
          is: {
            args: /^[0-9\-\+]{9,20}$/,
            msg: "Phone number must be valid",
          },
        },
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Role cannot be empty" },
          isInt: { msg: "Role must be an integer" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true, // Nếu bạn có createdAt/updatedAt
    }
  );

  return User;
};
