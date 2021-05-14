const { round } = require('mathjs');
const { generateExcerciseSet } = require('../API/examQuestions/generator');
const helper = require('../helper');
const { USER_PROFILE_LENGTH } = require('./reviseUserProfile');

/**
 * Handles a /generateUserSetRequest if the request method is post, else respond with bad request.
 *
 * @param {Object} request
 * @param {Object} response
 */
function handleGenerateUserSetRequest(request, response) {
  if (request.method === 'POST') {
    handleGenerateUserSetPostRequest(request, response);
  } else if (request.method !== 'POST') {
    throw 'bad request';
  }
}

/**
 * Will try handling a /generateUserSet request, if an error is throw respond with the error. First
 * get the request body / user profile, then validate the request body / user profile. Then generate
 * an exercise set based on the user profile. Then respond with the exercise set.
 *
 * @param {{}} request
 * @param {{}} response
 */
async function handleGenerateUserSetPostRequest(request, response) {
  try {
    const requestBody = await helper.fetchJsonRequestBody(request);
    const userProfile = validateUserRequestIsUserProfile(requestBody);
    const userExerciseSet = generateUserExerciseSet(userProfile, request.headers.amount);
    helper.respondWithJsonObject(userExerciseSet, response);
  } catch (error) {
    helper.errorResponse(response, '400', `${error}`);
  }
}

/**
 * If requestBody is userProfile return userProfile, else throw error.
 *
 * @param {*} requestBody Request body to validate.
 * @returns {Array} RequestBody if requetBody is a userProfile.
 */
function validateUserRequestIsUserProfile(requestBody) {
  let userProfile;
  if (!isUserProfile(requestBody)) {
    throw 'invalid request body';
  } else if (isUserProfile(requestBody)) {
    userProfile = requestBody;
  }
  return userProfile;
}

/**
 * Checks that requestBody is a userProfile.
 *
 * @param {{}} requestBody Arbitrary object or primitive value.
 * @returns True if requestBody is a userProfile, else false.
 */
function isUserProfile(requestBody) {
  return requestBody.length === USER_PROFILE_LENGTH && helper.isUserProfileValidVector(requestBody);
}

/**
 * Turn as userProfile into a percentUserProfile, turn the percentUserProfile into a
 * exerciseAmountVector, generate the core of the exercise set based on the exerciseAmountVector,
 * fill the exercise set with random exercises if the lenght of the exercise set <
 * amountOfExercises.
 *
 * @param {Number[]}  userProfile
 * @param {Number} requestedAmountOfExercises Amount of exercises requested.
 * @returns The generated exercise set.
 */
function generateUserExerciseSet(userProfile, requestedAmountOfExercises) {
  const percentUserProfile = vectorToPercentVector(userProfile);
  const exerciseAmountVector = percentVectorToExerciseAmountVector(percentUserProfile, requestedAmountOfExercises);
  let exerciseSet = generateCoreExerciseSet(exerciseAmountVector);
  exerciseSet = fillSparseExerciseSetWithRandomExercises(requestedAmountOfExercises, exerciseSet);
  return exerciseSet;
}

/**
 * Turns an Array A = [a_1, a_2, ..., a_n] into [a_1 / sum, a_2 / sum, ..., a_n / sum]. Where sum is
 * the sum of the elements in A. Each element in this new Array corresponds to the percentage value
 * of the orginal value compared to the sum af all elements.
 *
 * @param {Number[]} userProfile
 * @returns {Number[]}
 */
function vectorToPercentVector(userProfile) {
  let sum = 0;
  userProfile.forEach((element) => {
    sum += element;
  });
  return helper.scalarMultiplication(1 / sum, userProfile);
}

/**
 * Multiplies each element in percenVector with amountOfExercises, return this new Array. Each
 * element is this new vector corresponds to the number of exercises within a given type, the index
 * of each element corresponds to an exercise type, see indexToType().
 *
 * @param {Number[]} percentVector
 * @param {Number} amountOfExercises
 * @returns {Number[]}
 */
function percentVectorToExerciseAmountVector(percentVector, amountOfExercises) {
  return round(helper.scalarMultiplication(amountOfExercises, percentVector));
}

/**
 * Generates an exercise set with a number of within each type outlined in the exerciseAmountVector.
 *
 * @param {Number[]} exerciseAmountVector
 * @returns Exercise set.
 */
function generateCoreExerciseSet(exerciseAmountVector) {
  let exerciseSet = [];
  exerciseAmountVector.forEach((amount, i) => {
    const exerciseSubset = generateExcerciseSet([indexToType(i)], amount);
    exerciseSet = exerciseSet.concat(exerciseSubset);
  });
  return exerciseSet;
}

/**
 * Fills an exercise set with exercises of a random type, until exerciseSet.lenght =
 * amountOfExercises
 *
 * @param {*} amountOfExercises
 * @param {*} exerciseSet
 * @returns Exercise set.
 */
function fillSparseExerciseSetWithRandomExercises(amountOfExercises, exerciseSet) {
  let exerciseSetCopy = [...exerciseSet];
  while (exerciseSetCopy.length < amountOfExercises) {
    const randomExercise = generateExcerciseSet([randomType()], 1);
    exerciseSetCopy = exerciseSetCopy.concat(randomExercise);
  }
  return exerciseSetCopy;
}

/**
 * @returns {String} A random exercise type.
 */
function randomType() {
  return indexToType(helper.randNum(USER_PROFILE_LENGTH + 1) - 1);
}

/**
 * @param {Number} index
 * @returns Converts an index to at exercise type.
 */
function indexToType(index) {
  switch (index) {
    case 0: return 'vektor2d';
    case 1: return 'vektor3d';
    case 2: return 'integralregning';
    case 3: return 'ligninger';
    case 4: return 'differentialligning';
    case 5: return 'funktionerAfToVariable';
    case 6: return 'statistik';
    case 7: return 'infinitesimalregning';
    case 8: return 'trigonometri';
    case 9: return 'vektorfunktioner';
    default: return '';
  }
}

module.exports = {
  handleGenerateUserSetRequest,
  handleGenerateUserSetPostRequest,
  validateUserProfile: validateUserRequestIsUserProfile,
  userProfileIsValid: isUserProfile,
  generateUserExerciseSet,
  vectorToPercentVector,
  percentVectorToExerciseAmountVector,
  generateCoreExerciseSet,
};
