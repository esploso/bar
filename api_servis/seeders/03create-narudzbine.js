'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('narudzbine',
        [
          {status:"zakazano",vremeNarucivanja: "15:23",adresa:"Djoke Djokica",brojTelefona:"24112552",ime_Prezime:"Filip Visnjic",stavkaNarudzbine_id:1},
          {status:"zakazano",vremeNarucivanja: "16:23",adresa:"Mika Mikica",brojTelefona:"21552153",ime_Prezime:"Djole Srkic",stavkaNarudzbine_id:2}
        ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('narudzbine', null, {});
  }
};
