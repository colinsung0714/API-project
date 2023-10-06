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
        userId: 2,
        review: "A wonderful spot with excellent amenities. Highly recommended!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: "Had a great experience at this spot. The location was perfect and the host was very helpful.",
        stars: 4
      },
      {
        spotId: 3,
        userId: 5,
        review: "Unfortunately, the spot was not as clean as expected. The host should improve cleanliness.",
        stars: 2
      },
      {
        spotId: 1,
        userId: 5,
        review: "Great location and amenities, but the Wi-Fi was unreliable.",
        stars: 4
      },
      {
        spotId: 4,
        userId: 5,
        review: "The view from the spot was breathtaking! An unforgettable experience.",
        stars: 5
      },
      {
        spotId: 5,
        userId: 5,
        review: "The spot was spacious and comfortable, perfect for a family getaway.",
        stars: 5
      },
      {
        spotId: 6,
        userId: 5,
        review: "The host was very responsive and accommodating. Had a pleasant stay.",
        stars: 4
      },
      {
        spotId: 7,
        userId: 5,
        review: "The spot was well-equipped, but the noise from the nearby construction was bothersome.",
        stars: 3
      },
      {
        spotId: 8,
        userId: 5,
        review: "A cozy and charming spot. Would definitely recommend it for a romantic getaway.",
        stars: 5
      },
      {
        spotId: 9,
        userId: 5,
        review: "The spot had a beautiful garden, perfect for relaxation.",
        stars: 4
      },
      {
        spotId: 10,
        userId: 5,
        review: "The cleanliness of the spot left something to be desired, but the location was excellent.",
        stars: 3
      },
      {
        spotId: 11,
        userId: 5,
        review: "A comfortable spot with friendly neighbors. Enjoyed my stay here.",
        stars: 4
      },
      {
        spotId: 12,
        userId: 5,
        review: "The host was very welcoming and provided great recommendations for local attractions.",
        stars: 5
      },
      {
        spotId: 13,
        userId: 4,
        review: "The spot had a well-equipped kitchen, making it easy to prepare meals during our stay.",
        stars: 4
      },
      {
        spotId: 14,
        userId: 5,
        review: "The spot was a bit smaller than expected, but it was clean and comfortable.",
        stars: 3
      },
      {
        spotId: 15,
        userId: 5,
        review: "I had a great time at this spot. It exceeded my expectations in every way.",
        stars: 5
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
