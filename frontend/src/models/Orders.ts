import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Order extends Model {
  public id!: number;
  public piPaymentId?: string;
  public piTransactionId?: string;
  public product!: number; // Assuming a foreign key to product
  public buyer!: number; // Assuming a foreign key to user
  public status!: 'pending' | 'completed' | 'canceled';
  public createdAt!: Date;
  public updatedAt!: Date;
}

Order.init(
  {
    piPaymentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    piTransactionId: {
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
    },
    buyer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name of the table for users
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'canceled'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Order',
    timestamps: true,
  }
);

export default Order;
