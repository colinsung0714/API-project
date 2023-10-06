'use strict';

/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


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
    await SpotImage.bulkCreate([
      {
       spotId:1,
       url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse1.jpg',
       preview:true
      },
      {
        spotId: 2,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse2.jpg',
        preview: true
        
      },
      {
        spotId: 3,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse3.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse4.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse5.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse6.jpg',
        preview: true
      },    
      {
        spotId: 7,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse7.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse8.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse9.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse10.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse11.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse12.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse13.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse14.jpg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse15.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse16.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse17.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse18.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse19.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse20.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse21.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse22.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse23.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse24.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse25.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse26.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse27.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse28.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse29.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://airbrb-project.s3.us-west-1.amazonaws.com/samplehouse30.jpg',
        preview: false
      },

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
