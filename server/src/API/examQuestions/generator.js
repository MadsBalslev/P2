require('dotenv').config();
const mysql = require('mysql');

const { dbConnection } = require('../../helper');
const vectors = require('./vector');

const con = mysql.createConnection(dbConnection);

con.connect((err) => {
  if (err) {
    console.log(dbConnection.password, dbConnection.user, dbConnection.database, dbConnection.host);
    throw err;
  }
  console.log('Connected!');
});

const insertTest = 'INSERT INTO examquestions (tekst, var1, udtryk, var2, facit, type, point) VALUES (?, ?, ?, ?, ?, ?, ?)';

const sqlInsert = (queryFormat, tekst, var1, udtryk, var2, facit, type, point) => {
  con.query(queryFormat, [tekst, var1, udtryk, var2, facit, type, point], (err, query) => {
    if (err) {
      throw err;
    }
    console.log(query);
  });
};

const generateExcercise = (type, amount, subType = null) => {
  for (let i = 0; i < amount; i++) {
    const call = type(subType);
    // eslint-disable-next-line max-len
    sqlInsert(insertTest, call.txt, call.vectorA, call.tegn, call.vectorB, call.facit, call.type, call.point);
  }
};

generateExcercise(vectors.vektorMultiplication, 10);
generateExcercise(vectors.vektorAdditionSubtraction, 5, 'sub');
generateExcercise(vectors.vektorAdditionSubtraction, 5, 'add');

con.end();
