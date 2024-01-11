'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Narudzbina extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.StavkaNarudzbine, {foreignKey: "narudzbina_id"})
    }
  }
  Narudzbina.init({
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vremeNarucivanja: {
      type: DataTypes.DATE,
      allowNull: false
    },
    zakazanoVreme: {
      type: DataTypes.DATE,
      allowNull: true
    },
    adresa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brojTelefona: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ime_Prezime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stavkaNarudzbine_id: {
      type:DataTypes.INTEGER,
    }

  }, {
    tableName: 'narudzbine',
    sequelize,
    modelName: 'Narudzbina',
  });
  return Narudzbina;
};