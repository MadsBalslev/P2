// DEPRECATED CODE
const mysql = require('mysql');
const { dbConnection } = require('../helper');

const con = mysql.createConnection(dbConnection);

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected!');
});

module.exports = con;
