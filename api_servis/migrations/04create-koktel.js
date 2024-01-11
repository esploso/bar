'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('kokteli', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            naziv: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            opis: {
                type: Sequelize.STRING,
                allowNull: true
            },
            cena: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            kategorija_id: {
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
        await queryInterface.dropTable('kokteli');
    }
};