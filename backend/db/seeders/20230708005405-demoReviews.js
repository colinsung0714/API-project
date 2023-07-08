'use strict';

const { Review } = require('../models');

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
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: "A wonderful spot with excellent amenities. Highly recommended!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: "Had a great experience at this spot. The location was perfect and the host was very helpful.",
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: "Unfortunately, the spot was not as clean as expected. The host should improve cleanliness.",
        stars: 2
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
