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

const dbConnection = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
};

module.exports = { 
  errorResponse,
  dbConnection,
};
