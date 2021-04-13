const getJSON = require('../API/examQuestions/jsonGen');

/**
 * Will handle requests to the '/opgaver' route
 * @param {*} request
 * @param {*} response
 */
const handleOpgaverRequest = async (request, response) => {
  if (request.method === 'GET') {
    response.setHeader('Access-Control-Allow-Origin', '*');
    // hent opgave fra db
    const result = await getJSON.getJSON();
    response.end(JSON.stringify(result));
  } else if (request.method === 'POST') {
    response.setHeader('Access-Control-Allow-Origin', '*');
    // compare answer to assignment id
  } else if (request.method !== 'GET' && request.method !== 'POST') {
    response.setHeader('Access-Control-Allow-Origin', '*');
    throw 'bad request';
  }
};

module.exports = handleOpgaverRequest;
