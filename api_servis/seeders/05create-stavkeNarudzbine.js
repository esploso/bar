'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stavkeNarudzbine',
        [
          {komada:3,narudzbina_id: 1,koktel_id:1,jedinicnaCena:600},
          {komada:2,narudzbina_id: 2,koktel_id:2,jedinicnaCena:300}
        ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
