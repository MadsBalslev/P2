// Helper functions should go here.
const mysql = require('mysql');

const connectToDB = () => {
  mysql.createConnection({
    host: process.env.HOST || '127.0.0.1',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'test',
  });
};

module.exports = {
  connectToDB,
};
