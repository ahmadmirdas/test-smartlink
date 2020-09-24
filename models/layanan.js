'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class layanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      layanan.belongsTo(models.user)
    }
  };
  layanan.init({
    nama: DataTypes.STRING,
    unit: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'layanan',
  });
  return layanan;
};