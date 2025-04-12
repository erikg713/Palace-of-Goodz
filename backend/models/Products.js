// Project: Palace of Goodz // Directory: backend/models/Product.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({ name: { type: String, required: true }, description: { type: String, required: true }, price: { type: Number, required: true }, image: { type: String, required: true }, createdAt: { type: Date, default: Date.now } });

export default mongoose.model('Product', productSchema);




const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a database config file

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0.01,
    },
  },
  sellerId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Sellers',
      key: 'id',
    },
  },
}, {
  tableName: 'Products',
  timestamps: true, // Enable timestamps
  hooks: {
    beforeCreate: (product) => {
      // Add any necessary hooks here
    },
  },
});

// Sync the table
const syncTable = async () => {
  try {
    await sequelize.sync();
    console.log('Products table has been created.');
  } catch (error) {
    console.error('Unable to create table:', error);
  }
};

syncTable();

module.exports = Product;
