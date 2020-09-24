'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transaction.belongsTo(models.user)
    }
  };
  transaction.init({
    pelanggan: DataTypes.STRING,
    total: DataTypes.INTEGER,
    diskon_persen: DataTypes.INTEGER,
    diskon_rupiah: DataTypes.INTEGER,
    tagihan: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    detail: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};