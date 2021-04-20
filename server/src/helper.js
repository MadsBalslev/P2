/**
 * Will handle potential errors catched in {@link tryHandleRequest}
 * @param {*} response
 * @param {integer} code the http status code
 * @param {string} reason the error message
 */
const errorResponse = (response, code, reason) => {
  response.writeHead(code, { 'Content-Type': 'text/txt' });
  response.write(reason);
  response.end('\n');
};

const randNum = (range) => Math.floor(Math.random() * range) + 1;

module.exports = {
  randNum,
  errorResponse,
};
