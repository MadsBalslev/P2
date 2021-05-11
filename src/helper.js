/**
 * Will handle potential errors catched in {@link tryHandleRequest}
 * @param {*} response
 * @param {integer} code the http status code
 * @param {string} reason the error message
 */
const errorResponse = (response, code, reason) => {
  response.writeHead(code, {
    'Content-Type': 'text/txt',
  });
  response.write(reason);
  response.end('\n');
};

/**
 * Takes an integer as an input and returns a number within that range from 0.
 * @param {integer} range
 * @returns {integer}
 */
const randNum = (range) => Math.floor(Math.random() * range) + 1;

const arrShuffle = (arr) => {
  let i = arr.length - 1;

  for (i; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

/**
 * fetch request body (JSON object).
 *
 * @param {*} request
 * @returns {Promise} Request body.
 */
function fetchJsonRequestBody(request) {
  return new Promise((resolve, reject) => {
    let requestBody = '';
    request.on('data', (chunk) => {
      requestBody += chunk;
    });

    request.on('end', () => {
      try {
        requestBody = JSON.parse(requestBody);
        resolve(requestBody);
      } catch (error) {
        reject(error);
      }
    });

    request.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Respondes to request with the newUserProfile.
 *
 * @param {number[]} jsonObject
 * @param {{}} response
 */
function respondWithJsonObject(jsonObject, response) {
  const newUserProfileJsonString = JSON.stringify(jsonObject);
  response.writeHead(200, {
    'Content-Type': 'application/json',
  });
  response.end(newUserProfileJsonString);
}

/**
 * Checks that all items in an array are numbers, ie if it's vector.
 *
 * @param {Array} susVector Array to check.
 * @returns {Boolean} True if alle items are numbers, else false.
 */
const isUserProfileValidVector = (susVector) => susVector.every((entry) => typeof entry === 'number');

/**
 * Will scale a vector with the given scalar and return the new scaled vector
 *
 * @param {number} scalar The scalar to use for the weight
 * @param {number[]} vector The vector to multiply with the scalar
 * @return {number[]} A new vector which is multiplied with the scalar
 */
const scalarMultiplication = (scalar, vector) => vector.map((x) => x * scalar);

module.exports = {
  arrShuffle,
  randNum,
  errorResponse,
  fetchJsonRequestBody,
  respondWithJsonObject,
  isUserProfileValidVector,
  scalarMultiplication,
};
