'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Koktel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Kategorija, {foreignKey: 'kategorija_id'});
      this.belongsToMany(models.StavkaNarudzbine, {foreignKey: "koktel_id", as: "stavke", through:"stavkaKoktela"});
      this.belongsToMany(models.Sastojak, {foreignKey: "koktel_id", as: "sastojci", through:"KoktelSastojak"});
    }
  }
  Koktel.init({
    naziv: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false
    },
    opis: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cena: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kategorija_id: {
      type:DataTypes.INTEGER,

    }

  }, {
    tableName: 'kokteli',
    sequelize,
    modelName: 'Koktel',
  });

  return Koktel;
};