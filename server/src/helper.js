/**
 * Will handle potential errors catched in {@link tryHandleRequest}
 * @param {*} response
 * @param {integer} code the http status code
 * @param {string} reason the error message
 */
function errorResponse(response, code, reason) {
  response.writeHead(code, { 'Content-Type': 'text/txt' });
  response.write(reason);
  response.end('\n');
}

module.exports = { errorResponse };
