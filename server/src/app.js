require('dotenv').config();
const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const handleOpgaverRequest = require('./routes/opgaver');
const handleResultatRequest = require('./routes/resultat');
const helper = require('./helper');

global.globalSet = [];

const port = process.env.PORT || 8080;

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
    response.setHeader('Access-Control-Allow-Origin', '*');
    // console.log(`NEW ${request.method} REQUEST:`);
    // console.log(request.headers);
    handleRequest(request, response);
  } catch (error) {
    helper.errorResponse(response, 400, error);
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
    respondWith(filePath, 'text/html', response);
  } else if (request.method !== 'GET') {
    throw 'bad request';
  }
}

/**
 * Will respond with a HTML file provided
 * @param {string} file Path to the HTML file to respond with
 * @param {string} fileType type of file
 * @param {*} response
 */
async function respondWith(file, fileType, response) {
  const fileData = await fs.promises.readFile(file);
  response.writeHead(200, { 'Content-Type': fileType });
  response.end(fileData);
}

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(filePath);
});
