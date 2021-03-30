require('dotenv').config();
const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');

const server = http.createServer();

const filePath = path.join(__dirname, '../public/site.html');

server.on('request', tryHandleRequest);

function tryHandleRequest(request, response) {
  try {
    handleRequest(request, response);
  } catch (error) {
    errorResponse(response, 400, error);
  }
}

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
      throw new Error('bad path');
  }
}

function handleBaseRequest(request, response) {
  if (request.method === 'GET') {
    respondWith(filePath, response);
  } else if (request.method !== 'GET') {
    throw new Error('bad request');
  }
}

function handleOpgaverRequest(request, response) {
  if (request.method === 'GET') {
    // hent opgave fra db
  } else if (request.method === 'POST') {
    // compare answer to assignment id
  } else if (request.method !== 'GET' && request.method !== 'POST') {
    throw 'bad request';
  }
}

function handleResultatRequest(request, response) {
  if (request.method === 'GET') {
    respondWith(filePath, response);
    console.log(request.headers['x-forwarded-for'] || request.connection.remoteAddress);
  } else if (request.method !== 'GET') {
    throw 'bad request';
  }
}

function errorResponse(response, code, reason) {
  response.writeHead(400, { 'Content-Type': 'text/txt' });
  response.write(reason);
  response.end('\n');
}

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
