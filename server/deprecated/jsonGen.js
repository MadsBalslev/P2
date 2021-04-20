// DEPRECATED
const con = require('../db');
const { checkTable } = require('./createTable');

const getExamQuestions = () => new Promise((resolve, reject) => {
  // Check if table exits and create if not
  checkTable('examquestions');

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
