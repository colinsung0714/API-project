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
       url: 'https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
       preview:true
      },
      {
        spotId: 2,
        url: 'https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
        
      },
      {
        spotId: 3,
        url: 'https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://www.livehome3d.com/assets/img/articles/design-house/how-to-design-a-house.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://hips.hearstapps.com/hmg-prod/images/victorian-style-house-4-1652804696.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://www.southernliving.com/thmb/A1aK1Xdv7iQbZ5UdiBioQml4lhQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2270901_cainc0259_1-2000-36b6699219454ee298de1d4565f1ab7d.jpg',
        preview: true
      },    {
        spotId: 1,
        url: 'https://hips.hearstapps.com/hmg-prod/images/edc100121fernandez-005-1631202315.jpg',
        preview: true
      }

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
