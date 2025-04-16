const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration

class Payment extends Model {}

Payment.init({
    userId: {
        type: DataTypes.UUID, // Assuming userId is stored as UUID
        allowNull: false,
        references: {
            model: 'Users', // Adjust to the correct users table name
            key: 'id',
        }
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0 // Ensure the amount is positive
        }
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['USD', 'EUR', 'GBP', 'ETH', 'BTC']] // Add more as needed
        }
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['credit_card', 'paypal', 'crypto']] // Add more as needed
        }
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['pending', 'completed', 'failed']]
        }
    }
}, {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments', // Adjust to your table name
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = Payment;
pinetworksdk window.pi payments using sandbox
