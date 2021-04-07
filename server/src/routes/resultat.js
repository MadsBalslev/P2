const util = require('util');
const helper = require('../helper');

/**
 * Will handle requests to the '/resultater' route
 * @param {*} request
 * @param {*} response
 */
const handleResultatRequest = (request, response) => {
  if (request.method === 'POST') {
    handleResultatPostRequest(request, response);
  } else if (request.method !== 'POST') {
    throw 'handleResultatRequest did not get a POST request';
  }
};

/**
 * Enabling utf8 upon request from server.
 * Adding requested data from chunk to body
 * Parsing JSON format from server to body, and responging request with console.log
 * @param {*} request
 * @param {*} response
 */
const handleResultatPostRequest = (request, response) => {
  let body = '';
  request.setEncoding('utf8');

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    body = JSON.parse(body);
    handleBody(body, response);
  });
};

const handleBody = (body, response) => {
  if (requestBodyIsValid(body)) {
    handleRequestBody(body, response);
  } else if (!(requestBodyIsValid(body))) {
    helper.errorResponse(response, 400, 'handleRequestBody did not get valid body');
  }
};

/**
 *
 * @param {*} body
 * @returns
 */
const requestBodyIsValid = (body) => {
  let bodyIsValid = true;

  for (const opgaveSvar of body) {
    if (!isOpgaveSvarValid(opgaveSvar)) {
      bodyIsValid = false;
      break;
    }
  };

  return bodyIsValid;
};

/**
 *
 * @param {*} opgaveSvar
 * @returns
 */
const isOpgaveSvarValid = (opgaveSvar) => {
  return opgaveSvar.hasOwnProperty('id') &&
    opgaveSvar.hasOwnProperty('actualAnswer') &&
    typeof opgaveSvar.id === 'number' &&
    typeof opgaveSvar.actualAnswer === 'string';
};

/**
 *
 * @param {*} requestBody
 * @param {*} response
 */
const handleRequestBody = (body, response) => {
  helper.errorResponse(response, 204, '');
};

module.exports = handleResultatRequest;
