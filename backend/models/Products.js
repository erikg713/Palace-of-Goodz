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
  timestamps: false,
});

module.exports = Product;
ADD CONSTRAINT fk_seller
FOREIGN KEY (seller) REFERENCES Sellers(id);
