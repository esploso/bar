'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sastojci',
        [
          {naziv:"Rum"},
          {naziv:"Vodka"},
          {naziv:"Borovnica"},
          {naziv:"Dzin"}
        ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sastojci', null, {});
  }
};
