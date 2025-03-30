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
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
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
});

// Sync the table
sequelize.sync()
  .then(() => {
    console.log('Products table has been created.');
  })
  .catch(error => {
    console.error('Unable to create table:', error);
  });

module.exports = Product;
