/**
 * Will handle requests to the '/resultater' route
 * @param {*} request
 * @param {*} response
 */
function handleResultatRequest(request, response) {
  if (request.method === 'POST') {
    handleResultatPostRequest(request, response); 
    console.log(request.headers['x-forwarded-for'] || request.connection.remoteAddress);
  } else if (request.method !== 'POST') {
    throw 'bad request';
  }
}

