require('dotenv').config();
const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');

const server = http.createServer();

const filePath = path.join(__dirname, '../public/site.html');

server.on('request', tryHandleRequest);

/**
 * Will try to handle the request in {@link handleRequest} or if necessary catch the error
 * @param {*} request
 * @param {*} response
 */
function tryHandleRequest(request, response) {
  try {
    handleRequest(request, response);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

/**
 * Will check which route is requested and use the correct handler function. If a non-existing route
 * is requsted it will throw an error which will be catched in {@link tryHandleRequest}
 * @param {*} request
 * @param {*} response
 */
function handleRequest(request, response) {
  switch (request.url) {
    case '/':
      handleBaseRequest(request, response);
      break;

    case '/opgaver':
      handleOpgaverRequest(request, response);
      break;

    case '/resultat':
      handleResultatRequest(request, response);
      break;

    default:
      throw 'bad path';
  }
}

/**
 * Will handle requests to the '/' route
 * @param {*} request
 * @param {*} response
 */
function handleBaseRequest(request, response) {
  if (request.method === 'GET') {
    respondWith(filePath, response);
  } else if (request.method !== 'GET') {
    throw 'bad request';
  }
}

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

/**
 * Will handle requests to the '/resultater' route
 * @param {*} request
 * @param {*} response
 */
function handleResultatRequest(request, response) {
  if (request.method === 'GET') {
    respondWith(filePath, response);
    console.log(request.headers['x-forwarded-for'] || request.connection.remoteAddress);
  } else if (request.method !== 'GET') {
    throw 'bad request';
  }
}

/**
 * Will handle potential errors catched in {@link tryHandleRequest}
 * @param {*} response
 * @param {integer} code the http status code
 * @param {string} reason the error message
 */
function errorResponse(response, code, reason) {
  response.writeHead(400, { 'Content-Type': 'text/txt' });
  response.write(reason);
  response.end('\n');
}

/**
 * Will respond with a HTML file provided
 * @param {string} file Path to the HTML file to respond with
 * @param {*} response
 */
function respondWith(file, response) {
  fs.readFile(file, (err, html) => {
    if (err) {
      throw err;
    }
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(html);
    response.end();
  });
}

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
  console.log(filePath);
});
