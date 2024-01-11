'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StavkaNarudzbine extends Model {
    static associate(models) {
      this.belongsTo(models.Narudzbina, {foreignKey: "narudzbina_id", as: "narudzbina"})
      this.belongsTo(models.Koktel, {foreignKey: "koktel_id", as: "koktel"})
    }
  }
  StavkaNarudzbine.init({
    komada: DataTypes.INTEGER,
    narudzbina_id :{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    koktel_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jedinicnaCena: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    tableName: 'stavkeNarudzbine',
    sequelize,
    modelName: 'StavkaNarudzbine',
  });
  return StavkaNarudzbine;
};