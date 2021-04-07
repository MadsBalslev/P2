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

  body.forEach(opgaveSvar => {
    if (isOpgaveSvarValid(opgaveSvar) && bodyIsValid) {
      bodyIsValid = false;
    }
  });
};

const isOpgaveSvarValid = (opgaveSvar) => {
  return opgaveSvar.hasOwnProperty('id') &&
    opgaveSvar.hasOwnProperty('actualAnswer') &&
    opgaveSvar.hasOwnProperty('id') &&
    opgaveSvar.hasOwnProperty('actualAnswer');
};

const handleRequestBody = (requestBody, response) => {

};

module.exports = handleResultatRequest;
