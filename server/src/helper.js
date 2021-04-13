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

<<<<<<< HEAD
const dbConnection = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
};

const randNum = (range) => Math.floor(Math.random() * range) + 1;

module.exports = {
  dbConnection,
  randNum,
};
=======
module.exports = { errorResponse };
>>>>>>> f6c8ee4c217ae107a3be3016b106ae8949ce4876
