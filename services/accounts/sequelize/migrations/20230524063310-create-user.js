'use strict';
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
       
        primaryKey: true,
        type: Sequelize.STRING
      },
     
      name: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      profilePicture: {
        type: Sequelize.STRING
      },
      profileDescription: {
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
    await queryInterface.dropTable('Users');
  }
};