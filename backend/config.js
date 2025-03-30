require('dotenv').config();
const { Sequelize } = require('sequelize');

// Setup Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Disable logging for cleaner output
  }
);

// Export the Sequelize instance for reuse
module.exports = sequelize;

// Define a function to initialize the database connection
const initializeDatabase = async () => {
  const Payment = require('./models/Payments'); // Import models here for a cleaner structure

  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await Payment.sync(); // Sync model with the database
    console.log('Payment table created or exists successfully.');
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await sequelize.close(); // Ensure connection is closed after operations
  }
};

// Initialize the database connection
initializeDatabase();
