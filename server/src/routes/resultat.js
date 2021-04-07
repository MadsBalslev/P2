const util = require('util'); 

/**
 * Will handle requests to the '/resultater' route
 * @param {*} request
 * @param {*} response
 */
const handleResultatRequest = (request, response) => {
  if (request.method === 'POST') {
    handleResultatPostRequest(request, response);
    console.log(request.headers['x-forwarded-for'] || request.connection.remoteAddress);
  } else if (request.method !== 'POST') {
    throw 'handleResultatRequest did not get a POST request';
  }
};

const handleResultatPostRequest = (request, response) => {
  let body = '';
  request.setEncoding('utf8');
  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    body = JSON.parse(body);
    console.log('got JSON object:');
    console.log(body);
    console.log('\n');

    if (requestBodyIsValid(body)) {
      console.log('was valid');
      handleRequestBody(body, response);
    } else if (!(requestBodyIsValid(body))) {
      response.writeHead(400, { 'Content-Type': 'text/txt' });
      response.write('handleResultatPostRequest did not get valid body');
      response.end('\n');
    }
  });
};

const requestBodyIsValid = (body) => {
  let bodyIsValid = true;
  for (const opgave of body) {
    if (!(opgave.hasOwnProperty('id') && opgave.hasOwnProperty('actualAnswer'))) {
      bodyIsValid = false;
    }
    if (typeof opgave.id !== 'number' && typeof opgave.actualAnswer !== 'string') {
      bodyIsValid = false;
    }
  }
  return bodyIsValid;
};

const handleRequestBody = (requestBody, response) => {

};

module.exports = handleResultatRequest;
