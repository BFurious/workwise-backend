// models/user.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('Buyer', 'Seller'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
  });
  
  module.exports = User;