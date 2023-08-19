'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid')
const dataReviews = require('../seeders/reviews.json')
const reviews = Object.values(dataReviews)

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', dataReviews?.map(review => ({
      ...review,
      id: review.id || uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    })))

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {})
  }
};




