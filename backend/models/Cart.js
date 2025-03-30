const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt columns automatically
});

const CartProduct = sequelize.define('CartProduct', {
  cartId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cart,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

// Create indexes
CartProduct.addIndex('idx_cartProducts_cartId', ['cartId']);
CartProduct.addIndex('idx_cartProducts_productId', ['productId']);

(async () => {
  await sequelize.sync({ force: true });
  console.log("The tables for the Cart and CartProduct models were just (re)created!");
})();
CREATE TABLE Carts (
    id SERIAL PRIMARY KEY,
    userId INTEGEimestamp of cart creation
);

-- Table to store products within carts
CREATE userId);
CREATE INDEX idx_cartProducts_cartId ON CartProducts (cartId);
CREATE INDEX idx_cartProducts_productId ON CartProducts (productId);
cart    
CARTPRODUCTS
