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
        address: '2018 W Carson St',
        city: 'Torrance',
        state: 'CA',
        country: 'United States',
        lat: 33.831172,
        lng: -118.317328,
        name: 'Cozy Apartment',
        description: 'A beautiful and cozy apartment in the heart of the city.',
        price: 2000
      },
      {
        ownerId: 2,
        address: '22135 Hawthorne Blvd',
        city: 'Torrance',
        state: 'CA',
        country: 'United States',
        lat: 33.8260963,
        lng: -118.3523585,
        name: 'Luxury Villa',
        description: 'A luxurious villa with stunning views of the city.',
        price: 5000
      },
      {
        ownerId: 3,
        address: '8826 Melrose Ave',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States',
        lat: 34.0806198,
        lng: -118.3864144,
        name: 'Seaside Retreat',
        description: 'A seaside retreat with breathtaking ocean views.',
        price: 4500
      },
      {
        ownerId: 2,
        address: '1212 3rd Street Promenade',
        city: 'Santa Monica',
        state: 'CA',
        country: 'United States',
        lat: 34.0179497,
        lng: -118.4993061,
        name: 'Modern Loft',
        description: 'A modern loft with a view of the Bay Area skyline.',
        price: 3000
      },
      {
        ownerId: 2,
        address: '414 S Western Ave B',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States',
        lat: 34.066667,
        lng: -118.3088658,
        name: 'Beachfront Condo',
        description: 'A beachfront condo with access to white sandy beaches.',
        price: 4000
      },
      {
        ownerId: 2,
        address: '1880A W.Carson',
        city: 'Carson',
        state: 'CA',
        country: 'United States',
        lat: 33.830838,
        lng: -118.313906,
        name: 'Elegant Apartment',
        description: 'An elegant apartment in the heart of New York City.',
        price: 2500
      },
      {
        ownerId: 2,
        address: '1 Pine Avenue',
        city: 'Long Beach',
        state: 'CA',
        country: 'United States',
        lat: 33.767383,
        lng:-118.192861,
        name: 'Traditional Home',
        description: 'A traditional home in the heart of Chicago with a garden.',
        price: 3500
      },
      {
        ownerId: 2,
        address: '21532 Hawthorne Blvd',
        city: 'Torrance',
        state: 'CA',
        country: 'United States',
        lat: 33.833489,
        lng: -118.351243,
        name: 'Historic House',
        description: 'A historic house in San Diego with vintage charm.',
        price: 6000
      },
      {
        ownerId: 2,
        address: '514 N Pacific Coast Hwy',
        city: 'Redondo Beach',
        state: 'CA',
        country: 'United States',
        lat: 33.850263,
        lng: -118.388674,
        name: 'Urban Penthouse',
        description: 'A luxurious penthouse in the heart of Seattle with city skyline views.',
        price: 4200
      },
      {
        ownerId: 2,
        address: '2732 Main St',
        city: 'Santa Monica',
        state: 'CA',
        country: 'United States',
        lat: 34.000193,
        lng: -118.482091,
        name: 'Lakefront Cabin',
        description: 'A cozy lakefront cabin in Austin with scenic views.',
        price: 7000
      },
      {
        ownerId: 2,
        address: '2732 Main St',
        city: 'Manhattan Beach',
        state: 'CA',
        country: 'United States',
        lat: 33.882954,
        lng: -118.410035,
        name: 'Mountain Retreat',
        description: 'A mountain retreat in Denver with access to hiking trails.',
        price: 3800
      },
      {
        ownerId: 2,
        address: '235 N Canon Dr',
        city: 'Beverly Hills',
        state: 'CA',
        country: 'United States',
        lat: 34.06849,
        lng: -118.399264,
        name: 'Music City Condo',
        description: 'A condo in the heart of Nashville with a musical atmosphere.',
        price: 2700
      },
      {
        ownerId: 2,
        address: '3322 Wilshire Blvd',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States',
        lat: 34.061619,
        lng: -118.294964,
        name: 'Luxury Suite',
        description: 'A luxurious suite in Las Vegas with a view of the Strip.',
        price: 4800
      },
      {
        ownerId: 2,
        address: '100 S Grand Ave',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States',
        lat: 34.055218,
        lng: -118.248701,
        name: 'Theme Park Villa',
        description: "A villa near Orlando's theme parks with a private pool.",
        price: 5200
      },
      {
        ownerId: 1,
        address: '180 E Ocean Blvd',
        city: 'Long Beach',
        state: 'CA',
        country: 'United States',
        lat: 33.766546,
        lng: -118.191334,
        name: 'Historic Brownstone',
        description: 'A historic brownstone in the heart of Boston with classic architecture.',
        price: 3200
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
