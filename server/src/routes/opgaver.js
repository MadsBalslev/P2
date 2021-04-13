const { generateExcerciseSet } = require('../API/examQuestions/generator.js');

/**
 * Will handle requests to the '/opgaver' route
 * @param {*} request
 * @param {*} response
 */
function handleOpgaverRequest(request, response) {
  if (request.method === 'GET') {
    // response.setHeader('Access-Control-Allow-Origin', '*');
    const subjects = request.headers.subjects.split(',');
    const result = generateExcerciseSet(subjects, request.headers.amount);
    response.end(JSON.stringify(result));
  } else if (request.method === 'POST') {
    // response.setHeader('Access-Control-Allow-Origin', '*');
    // compare answer to assignment id
  } else if (request.method !== 'GET' && request.method !== 'POST') {
    throw 'bad request';
  }
}

module.exports = handleOpgaverRequest;
