const mysql = require('mysql');

const con = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
});

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected!');
});

const getExamQuestions = () => new Promise((resolve, reject) => {
  con.query('SELECT * FROM examquestions', (err, result) => {
    if (!err) resolve(JSON.parse(JSON.stringify(result))); // Hacky solution
    else reject(err);
  });
});

const getJSON = async () => {
  const json = await getExamQuestions();

  console.log(json);

  return json;
};

getJSON();

module.exports = {
  getJSON,
};
