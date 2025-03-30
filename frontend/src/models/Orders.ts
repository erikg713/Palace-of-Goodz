import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

// Define interface for Order attributes
interface OrderAttributes {
  id: number;
  paymentId?: string;
  transactionId?: string;
  product: number;
  buyer: number;
  status: 'pending' | 'completed' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public paymentId?: string;
  public transactionId?: string;
  public product!: number; // Foreign key to product
  public buyer!: number; // Foreign key to user
  public status!: 'pending' | 'completed' | 'canceled';
  public createdAt!: Date;
  public updatedAt!: Date;
}

Order.init(
  {
    paymentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products', // Name of the table for products
        key: 'id',
      },
      validate: {
        notNull: { msg: 'Product ID is required' },
        isInt: { msg: 'Product ID should be an integer' },
      },
    },
    buyer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name of the table for users
        key: 'id',
      },
      validate: {
        notNull: { msg: 'Buyer ID is required' },
        isInt: { msg: 'Buyer ID should be an integer' },
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'canceled'),
      defaultValue: 'pending',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    timestamps: true,
  }
);

export default Order;
