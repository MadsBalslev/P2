const getJSON = require('../API/examQuestions/jsonGen');

/**
 * Will handle requests to the '/opgaver' route
 * @param {*} request
 * @param {*} response
 */
const handleOpgaverRequest = async (request, response) => {
  if (request.method === 'GET') {
    // hent opgave fra db
    const result = await getJSON.getJSON();
    console.log(result);
    response.end(JSON.stringify(result));
  } else if (request.method === 'POST') {
    // compare answer to assignment id
  } else if (request.method !== 'GET' && request.method !== 'POST') {
    throw 'bad request';
  }
};

module.exports = handleOpgaverRequest;
