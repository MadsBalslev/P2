const mysql = require('mysql');
const { dbConnection } = require('../../helper');

const con = mysql.createConnection(dbConnection);

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected!');
});

const searchForType = (type) => {
  const q = `SELECT * FROM examquestions WHERE type = '${type}';`;

  return new Promise((resolve) => {
    con.query(q, (err, result) => {
      if (err) throw err;
      resolve(JSON.parse(JSON.stringify(result)));
    });
  });
};

const randomQuestion = async () => {
  const json = await searchForType('vektor2d');
  const randNum = Math.floor(Math.random() * json.length);

  console.log(json[randNum]);
};

randomQuestion();

con.end();
