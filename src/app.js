require('dotenv').config();
const http = require('http');
const path = require('path');
const fs = require('fs');
const { lookup } = require('mime-types');
const handleOpgaverRequest = require('./routes/opgaver');
const handleReviseUserProfileRequest = require('./routes/reviseUserProfile.js');
const { errorResponse } = require('./helper');

global.globalSet = [];

const port = process.env.PORT || 8080;

const server = http.createServer();

const filePath = path.join(__dirname, '../public/site.html');

/**
 * Will try to handle the request in {@link handleRequest} or if necessary catch the error
 * @param {*} request
 * @param {*} response
 */
const tryHandleRequest = (request, response) => {
  try {
    // logRequest(request);
    handleRequest(request, response);
  } catch (error) {
    errorResponse(response, 400, 'error at tryHandleRequest');
  }
};

// const logRequest = (request) => {
//   console.log(`NEW ${request.method} REQUEST`);
//   console.log(`Request url: ${request.url}`);
//   console.log('Request headers:');
//   console.log(request.headers);
//   console.log('');
// };

/**
 * Will check which route is requested and use the correct handler function. If a non-existing route
 * is requsted it will throw an error which will be catched in {@link tryHandleRequest}
 * @param {*} request
 * @param {*} response
 */
const handleRequest = (request, response) => {
  switch (request.url) {
    case '/opgaver':
      handleOpgaverRequest(request, response);
      break;
    case '/reviseUserProfile':
      handleReviseUserProfileRequest(request, response);
      break;
    case '':
      handleBaseRequest(request, response);
      break;
    default:
      handleStaticFiles(request, response);
  }
};

const handleStaticFiles = (request, response) => {
  let staticPath = request.url.replace(/^\/+|\/+$/g, '');

  if (staticPath === '') {
    staticPath = 'index.html';
  }

  const file = path.join(__dirname, '../public/', staticPath);
  const fileType = lookup(file);

  respondWith(file, fileType, response);
};

/**
 * Will handle requests to the '/' route
 * @param {*} request
 * @param {*} response
 */
const handleBaseRequest = (request, response) => {
  if (request.method === 'GET') {
    handleStaticFiles(request, response);
  } else if (request.method !== 'GET') {
    throw 'bad request';
  }
};

/**
 * Will respond with a HTML file provided
 * @param {string} file Path to the HTML file to respond with
 * @param {string} fileType type of file
 * @param {*} response
 */
const respondWith = (file, fileType, response) => {
  fs.readFile(file, (err, content) => {
    if (err) {
      console.log(`File not found: ${file}`);
      response.writeHead(404);
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': fileType });
      response.end(content);
    }
  });
};

server.on('request', tryHandleRequest);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(filePath);
});
