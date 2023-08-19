'use strict';
const { v4: uuidv4 } = require('uuid')
// const [user] = require('../models/user');
const dataUsers = require('./users.json')
const users = Object.values(dataUsers)
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   
      await queryInterface.bulkInsert('Users', usersData, {});
     },
  

    // return await queryInterface.bulkInsert('Users', dataUsers?.map(user => ({
    //   ...user,
    //   id: user.id || uuidv4(), // generate a UUID if id is not provided
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // })), {
    //   updateOnDuplicate: ['name', 'role', 'profilePicture', 'profileDescription']
    // });




 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Users', null, {});
},

}
