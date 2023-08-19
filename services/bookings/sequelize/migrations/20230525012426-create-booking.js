'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        
        primaryKey: true,
        type: Sequelize.STRING
      },
      checkInDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      checkOutDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      totalCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      guestId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      listingId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'UPCOMING',
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};