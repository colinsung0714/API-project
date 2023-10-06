'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
    await Booking.bulkCreate([
      {
        spotId:2,
        userId:1,
        guests:2,
        startDate: "2023-07-10",
        endDate: "2023-07-15"
      },
      {
        spotId:1,
        userId:2,
        guests:2,
        startDate: "2023-08-01",
        endDate: "2023-08-07"
      },
      {
        spotId:1,
        userId:3,
        guests:2,
        startDate: "2023-09-12",
        endDate: "2023-09-20"
      },
      {
        spotId:2,
        userId:1,
        guests:2,
        startDate: "2023-12-25",
        endDate: "2023-12-30"
      },
      {
        spotId:3,
        userId:1,
        guests:4,
        startDate: "2024-1-25",
        endDate: "2024-2-10"
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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
