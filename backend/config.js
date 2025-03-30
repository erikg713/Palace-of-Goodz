const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
const sequelize = require('./config/database');
const Payment = require('./models/Payments');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await Payment.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)
        console.log('Payment table created successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
})();
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);

module.exports = sequelize;

const Payment = require('./models/Payments');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await Payment.sync();
        console.log('Payment table created successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
})();
