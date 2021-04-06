/**
 * Will handle requests to the '/opgaver' route
 * @param {*} request
 * @param {*} response
 */
function handleOpgaverRequest(request, response) {
  if (request.method === 'GET') {
    // hent opgave fra db
  } else if (request.method === 'POST') {
    // compare answer to assignment id
  } else if (request.method !== 'GET' && request.method !== 'POST') {
    throw 'bad request';
  }
}
