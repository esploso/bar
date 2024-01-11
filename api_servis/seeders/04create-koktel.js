'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kokteli',
        [
          {naziv:"Nopaloma", opis:"lagani", cena: 1200, kategorija_id:1},
          {naziv:"Mohito", opis:"osvezavajuci", cena: 700, kategorija_id:2}
        ]);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('kokteli', null, {});
  }
};
