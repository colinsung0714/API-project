'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Spots'
        },
        onDelete:"CASCADE"
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Users'
        },
        onDelete:"CASCADE"
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull:false
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull:false
      },
      guests: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      accomodation: {
        type: Sequelize.DECIMAL(10,2),
      },
      serviceFee: {
        type: Sequelize.DECIMAL(10,2),
      },
      taxes: {
        type: Sequelize.DECIMAL(10,2),
      },
      total: {
        type: Sequelize.DECIMAL(10,2),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.dropTable(options);
  }
};