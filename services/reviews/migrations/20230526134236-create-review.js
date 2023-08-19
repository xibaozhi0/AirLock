'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      id: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.TEXT
      },
      targetId: {
        type: Sequelize.STRING
      },
      authorId: {
        type: Sequelize.STRING
      },
      targetType: {
        type: Sequelize.STRING
      },
      bookingId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};