'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Definir relacionamento com Customer
      Sale.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer'
      });

      Sale.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });

    }
  }
  Sale.init({
    customerId: DataTypes.BIGINT,
    productId: DataTypes.BIGINT,
    total: DataTypes.INTEGER,
    price: {
      type: DataTypes.DECIMAL(10,2)
    },
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};