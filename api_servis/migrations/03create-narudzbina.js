'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('narudzbine', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false
            },
            vremeNarucivanja: {
                type: Sequelize.DATE,
                allowNull: false
            },
            zakazanoVreme: {
                type: Sequelize.DATE,
                allowNull: true
            },
            adresa: {
                type: Sequelize.STRING,
                allowNull: false
            },
            brojTelefona: {
                type: Sequelize.STRING,
                allowNull: false
            },
            ime_Prezime: {
                type: Sequelize.STRING,
                allowNull: false
            },
            stavkaNarudzbine_id: {
                type:Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('narudzbine');
    }
};