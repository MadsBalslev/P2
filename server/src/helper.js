// Helper functions should go here.
const mysql = require('mysql');

const connectToDB = () => {
  mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB || 'test',
  });
};

module.exports = {
  connectToDB,
};
