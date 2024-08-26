const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');
const User = require('./user');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: DataTypes.UUID,
        references: {
            model: 'Products',
            key: 'id',
        },
        allowNull: false,
    },
    buyerId: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id',
        },
        allowNull: false,
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

});
Cart.belongsTo(Product, { as: 'products', foreignKey: 'productId' }); 
Cart.belongsTo(User, { as: 'seller', foreignKey: 'buyerId' }); 
module.exports = Cart;
