'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


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
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Main Street',
        city: 'New York City',
        state: 'NY',
        country: 'United States',
        lat: 40.7128,
        lng: -74.0060,
        name: 'Cozy Apartment',
        description: 'A beautiful and cozy apartment in the heart of the city.',
        price: 2000
      },
      {
        ownerId: 2,
        address: '456 Elm Avenue',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 34.0522,
        lng: -118.2437,
        name: 'Luxury Villa',
        description: 'A luxurious villa with stunning views of the city.',
        price: 5000
      },
      {
        ownerId: 3,
        address: '789 Oak Street',
        city: 'London',
        state: 'England',
        country: 'United Kingdom',
        lat: 51.5074,
        lng: -0.1278,
        name: 'Charming Cottage',
        description: 'A charming cottage nestled in the English countryside.',
        price: 1500
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Cozy Apartment', 'Luxury Villa', 'Charming Cottage'] }
    }, {});
  }
};
