'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('listings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      costPerNight: {
        type: Sequelize.FLOAT
      },
      hostId: {
        type: Sequelize.STRING
      },
      locationType: {
        type: Sequelize.STRING
      },
      mumOfBeds: {
        type: Sequelize.INTEGER
      },
      photoThumbnail: {
        type: Sequelize.STRING
      },
      isFeatured: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('listings');
  }
};