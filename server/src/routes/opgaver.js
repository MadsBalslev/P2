const { generateExcerciseSet } = require('../API/examQuestions/generator.js');

/**
 * Will handle requests to the '/opgaver' route
 * @param {*} request
 * @param {*} response
 */
function handleOpgaverRequest(request, response) {
  if (request.method === 'GET') {
    handleOpgaverGetRequest(request, response);
  } else if (request.method !== 'GET') {
    throw 'bad request';
  }
}

function handleOpgaverGetRequest(request, response) {
  const subjects = subjectsStringToArray(request.headers.subjects);
  const result = generateExcerciseSet(subjects, request.headers.amount);
  response.end(JSON.stringify(result));
}

/**
 * Takes the selected subjects as input, and splits the string with a comma.
 * @param {*} subjectsString 
 * @returns 
 */
function subjectsStringToArray(subjectsString) {
  let subjects = [];
  if (subjectsString) {
    subjects = subjectsString.split(',');
  }
  return subjects;
}

module.exports = handleOpgaverRequest;
