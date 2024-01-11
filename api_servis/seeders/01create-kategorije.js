'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kategorije',
        [
          {naziv:"Bezalkoholni"},
          {naziv:"Alkoholni"}
        ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('kategorije', null, {});
  }
};
