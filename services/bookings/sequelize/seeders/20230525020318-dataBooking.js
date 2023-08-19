'use strict';
// const {v4:uuidv4}=require('uuid')
const bookingsData=require('./bookings.json')
// const bookings=Object.values(bookingsDate)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
      const bookings = bookingsData.map((b) => ({
        ...b,
        checkInDate: new Date(b.checkInDate),
        checkOutDate: new Date(b.checkOutDate),
      }));
      await queryInterface.bulkInsert('Bookings', bookings, {});
    },
  //  return await queryInterface.bulkInsert('Bookings', bookings?.map(booking => ({
  //   ...booking,
    
  //   id: bookings.id || uuidv4(), // generate a UUID if id is not provided
  //   checkInDate: new Date(booking.checkInDate),
  //     checkOutDate: new Date(booking.checkOutDate),
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  // })), {
    
  // });
  // },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
