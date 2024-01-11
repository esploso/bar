'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('stavkeNarudzbine', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            komada:{
                type: Sequelize.INTEGER
            },
            narudzbina_id :{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            koktel_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            jedinicnaCena: {
                type: Sequelize.INTEGER,
                allowNull: false
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
        await queryInterface.dropTable('stavkeNarudzbine');
    }
};