module.exports = {
  postgres: {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgresql 17',
    password: process.env.DB_PASSWORD || 'Sup3rUs3r',
    port: process.env.DB_PORT || 5432,
  }
};
