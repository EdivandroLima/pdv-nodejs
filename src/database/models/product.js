'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Product.hasMany(models.Sale, {
        foreignKey: 'productId',
        as: 'sales'
      });

    }
  }
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    name: {
      type: DataTypes.STRING
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_stock: {
      type: DataTypes.BIGINT
    },
    price: {
      type: DataTypes.DECIMAL(10,2)
    },
  }, {
    sequelize,
    modelName: 'Product',
    paranoid: true, // Ativa Soft Delete
  });
  return Product;
};