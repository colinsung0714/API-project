'use strict';
const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
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
    await User.bulkCreate([
      { 
        firstName:'Demo',
        lastName:'Lition',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profileUrl:'https://opentables.s3.us-west-1.amazonaws.com/fubao.jpg'
      },
      { 
        firstName:'Fake',
        lastName:'Userone',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        profileUrl:'https://opentables.s3.us-west-1.amazonaws.com/default-profile-pic.jpg'
      },
      {
        firstName:'Faketwo',
        lastName:'Usertwo',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        profileUrl:'https://opentables.s3.us-west-1.amazonaws.com/default-profile-pic.jpg'
      },
      {
        firstName:'Steven',
        lastName:'Park',
        email: 'bbobay@user.io',
        username: 'bbobay',
        hashedPassword: bcrypt.hashSync('password4'),
        profileUrl:'https://opentables.s3.us-west-1.amazonaws.com/default-profile-pic.jpg'
      },
      {
        firstName:'Rachel',
        lastName:'Park',
        email: 'rachel@user.io',
        username: 'rachel0305',
        hashedPassword: bcrypt.hashSync('password5'),
        profileUrl:'https://opentables.s3.us-west-1.amazonaws.com/rachel.jpg'
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
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
