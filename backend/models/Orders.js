const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

// Define the Orders model
const Order = sequelize.define('Order', {
  // Define columns and their properties
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Canceled'),
    defaultValue: 'Pending',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
  tableName: 'Orders', // Optional: explicitly specify the table name
});

module.exports = Order;
