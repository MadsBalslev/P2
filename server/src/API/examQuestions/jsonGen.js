const mysql = require('mysql');
const { dbConnection } = require('../../helper');

const con = mysql.createConnection(dbConnection);

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected!');
});

const createTable = `CREATE TABLE IF NOT EXISTS examquestions (
  id int NOT NULL AUTO_INCREMENT,
  tekst varchar(255) NOT NULL COLLATE utf8_danish_ci,
  var1 varchar(255) NOT NULL COLLATE utf8_danish_ci,
  udtryk varchar(3) NOT NULL COLLATE utf8_danish_ci,
  var2 varchar(255) NOT NULL COLLATE utf8_danish_ci,
  facit varchar(255) NOT NULL COLLATE utf8_danish_ci,
  type varchar(255) NOT NULL COLLATE utf8_danish_ci,
  point int NOT NULL,
  PRIMARY KEY (id)
);`;

const getExamQuestions = () => new Promise((resolve, reject) => {
  // Check if table exits and create if not
  con.query(createTable, (err) => {
    if (err) console.log(err);
  });

  con.query('SELECT * FROM examquestions', (err, result) => {
    if (!err) resolve(JSON.parse(JSON.stringify(result))); // Hacky solution
    else reject(err);
  });
});

const getJSON = async () => {
  const json = await getExamQuestions();

  return json;
};

getJSON();

module.exports = {
  getJSON,
};
