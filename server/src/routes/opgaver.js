<<<<<<< HEAD
const { generateExcerciseSet } = require('../API/examQuestions/generator.js');

=======
>>>>>>> f6c8ee4c217ae107a3be3016b106ae8949ce4876
/**
 * Will handle requests to the '/opgaver' route
 * @param {*} request
 * @param {*} response
 */
function handleOpgaverRequest(request, response) {
  if (request.method === 'GET') {
<<<<<<< HEAD
    // response.setHeader('Access-Control-Allow-Origin', '*');
    const subjects = request.headers.subjects.split(',');
    const result = await generateExcerciseSet(['vektor2d'], 10);
    response.end(JSON.stringify(result));
  } else if (request.method === 'POST') {
    // response.setHeader('Access-Control-Allow-Origin', '*');
    // compare answer to assignment id
  } else if (request.method !== 'GET' && request.method !== 'POST') {
    // response.setHeader('Access-Control-Allow-Origin', '*');
=======
    // hent opgave fra db
  } else if (request.method === 'POST') {
    // compare answer to assignment id
  } else if (request.method !== 'GET' && request.method !== 'POST') {
>>>>>>> f6c8ee4c217ae107a3be3016b106ae8949ce4876
    throw 'bad request';
  }
}

module.exports = handleOpgaverRequest;
