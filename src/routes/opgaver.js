const { generateExcerciseSet } = require('../API/examQuestions/generator.js');
const { arrShuffle } = require('../helper.js');

/**
 * Will handle requests to the '/opgaver' route
 * @param {*} request
 * @param {*} response
 */
const handleOpgaverRequest = (request, response) => {
  if (request.method === 'GET') {
    handleOpgaverGetRequest(request, response);
  } else if (request.method !== 'GET') {
    throw 'bad request';
  }
};

/**
 * Will get the requests for '/opgaver' route
 * @param {*} request
 * @param {*} response
 */
const handleOpgaverGetRequest = (request, response) => {
  const subjects = subjectsStringToArray(request.headers.subjects);
  const result = generateExcerciseSet(subjects, request.headers.amount);
  arrShuffle(result);
  response.end(JSON.stringify(result));
};

/**
 * Takes the selected subjects as input, and splits the string with a comma.
 * @param {str} subjectsString A string of subjects seperated by a comma
 * @returns {str[]} An array of subjects
 */
const subjectsStringToArray = (subjectsString) => {
  let subjects = [];
  if (subjectsString) {
    subjects = subjectsString.split(',');
  }
  return subjects;
};

module.exports = handleOpgaverRequest;
