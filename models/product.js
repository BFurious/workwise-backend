const { DataTypes } = require('sequelize');
const User = require('./user');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Product = sequelize.define('Product', {
  id:{
    type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sellerId: { 
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: 'id',
    },
    allowNull: false,
  }
});
Product.belongsTo(User, { as: 'seller', foreignKey: 'sellerId' }); 
module.exports = Product;
