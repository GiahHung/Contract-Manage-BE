"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CommercialContracts", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      contract_id: {
        type: Sequelize.INTEGER,

        allowNull: false,
      },
      business_scope: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true,
      },
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Nếu dùng ENUM, hãy xóa type trước khi drop table
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_CommercialContracts_status";'
    );
    await queryInterface.dropTable("CommercialContracts");
  },
};
