const { errorResponse } = require('../helper');

const CORRECT_ANSWER_WEIGHT = 0.2;
const WRONG_ANSWER_WEIGHT = 0.7;
const USER_WEIGHT = 0.5;

/**
 * Handles requests to /reviseUserProfile, if the request is a post request handle the request,
 * else if it’s not a request don’t handle it.
 * @param {*} request
 * @param {*} response
 */
function handleReviseUserProfileRequest(request, response) {
  if (request.method === 'POST') {
    handleReviseUserProfilePostRequest(request, response);
  } else if (request.method !== 'POST') {
    throw 'bad request';
  }
}

/**
 * Handles a post rquest to /reviseUserProfile, will try fetching request body, then based on the
 * userProfile and exerciseSet in this body calculate a new userProfile, then responde with the new
 * userProfile.
 * @param {{}} request
 * @param {{}} response
 */
async function handleReviseUserProfilePostRequest(request, response) {
  try {
    const { userProfile, exerciseSet } = await fetchRequestBody(request);
    const newUserProfile = reviseUserProfile(exerciseSet, userProfile);
    respondWithNewUserProfile(newUserProfile, response);
  } catch (error) {
    errorResponse(response, '400', `${error}`);
  }
}

/**
 * fetch request body (JSON object)
 * @param {*} request
 * @returns {Promise} request body
 */
function fetchRequestBody(request) {
  return new Promise((resolve, reject) => {
    let requestBody = '';
    request.on('data', (chunk) => {
      requestBody += chunk;
    });

    request.on('end', () => {
      try {
        requestBody = JSON.parse(requestBody);

        if (!requestBodyIsValid(requestBody)) {
          throw 'invalid request body';
        }

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
 * Checks if requestBody has the correct properties and that the properties are of the correct type.
 * @param {Object} requestBody
 * @returns {boolean} True if the requestBody is valid, else false.
 */
function requestBodyIsValid(requestBody) {
  return requestBodyUserProfileIsValid(requestBody)
    && requestBodyExerciseSetIsValid(requestBody);
}

/**
 * Checks that requestBody has property userProfile and that the lenght of userProfile is 23. If
 * this is the case check if it's a true vector.
 * @param {Object} requestBody Object to control.
 * @returns {Boolean} True if the userProfile is valid, else false.
 */
function requestBodyUserProfileIsValid(requestBody) {
  let isValidUserProfile;
  if (!(requestBody.hasOwnProperty('userProfile') && requestBody.userProfile.length === 23)) {
    isValidUserProfile = false;
  } else if (requestBody.hasOwnProperty('userProfile') && requestBody.userProfile.length === 23) {
    isValidUserProfile = isUserProfileValidVector(requestBody.userProfile);
  }

  return isValidUserProfile;
}

/**
 * Checks that all items in an array are numbers, ie if it's vector.
 * @param {Array} susVector Array to check.
 * @returns {Boolean} True if alle items are numbers, else false.
 */
const isUserProfileValidVector = (susVector) => susVector.every((entry) => typeof entry === 'number');

function requestBodyExerciseSetIsValid(requestBody) {
  let isValidExerciseSet;
  if (!requestBody.hasOwnProperty('exerciseSet')) {
    isValidExerciseSet = false;
  } if (requestBody.hasOwnProperty('exerciseSet')) {
    isValidExerciseSet = validateEachExerciseInExerciseSet(requestBody.exerciseSet);
  }

  return isValidExerciseSet;
}

function validateEachExerciseInExerciseSet(exerciseSet) {
  return exerciseSet.every((exercise) => exercise.hasOwnProperty('type')
    && exercise.hasOwnProperty('questionAnswers')
    && exercise.hasOwnProperty('facit')
    && typeof exercise.type === 'string'
    && typeof exercise.questionAnswers === 'string'
    && typeof exercise.facit === 'string');
}

/**
 * Function to revise the user profile based upon the old profile and an exerciseset
 *
 * @param {object[]} exerciseSet The exercise set to calculate user profile based on
 * @param {number[]} userProfile The vector representing the user profile
 * @return {number[]} A new vector representing the revised user profile
 */
function reviseUserProfile(exerciseSet, userProfile) {
  const exerciseProfiles = convertExerciseSetToExerciseProfiles(exerciseSet);
  const newUserProfile = calculateUserProfile(exerciseProfiles, userProfile);
  return newUserProfile;
}

function convertExerciseSetToExerciseProfiles(exerciseSet) {
  const exerciseProfiles = [];

  exerciseSet.forEach((exercise) => {
    exerciseProfiles.push(calculateExerciseProfile(exercise));
  });

  return exerciseProfiles;
}

function calculateExerciseProfile(exercise) {
  let exerciseVector = convertExerciseToVector(exercise);

  if (isCorrectAnswer(exercise)) {
    exerciseVector = scalarMultiplication(CORRECT_ANSWER_WEIGHT, exerciseVector);
  } else if (!isCorrectAnswer(exercise)) {
    exerciseVector = scalarMultiplication(WRONG_ANSWER_WEIGHT, exerciseVector);
  }

  return exerciseVector;
}

function convertExerciseToVector(exercise) {
  switch (exercise.type) {
    case 'talOgRegnearter_C':
      return [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'ligninger_C':
      return [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'funktioner_C':
      return [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'trigonometri_C':
      return [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'geometri_C':
      return [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'sandsynlighed_C':
      return [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'andengradspolynomiumOgLigning_B':
      return [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'trigonometri_B':
      return [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'funktioner_B':
      return [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'geometri_B':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'differentialregning_B':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'sandsynlighedOgKombinatori_B':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'statistik_B':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'regression_B':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'vektorerI2d_B':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'vektorerI3d_A':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
    case 'vektorfunktioner_A':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
    case 'trigonometri_A':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
    case 'infinitesimalregning_A':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
    case 'differentialregning_A':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
    case 'integralregning_A':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
    case 'funktionerAfToVariable_A':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
    case 'statistik_A':
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    default:
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
}

const isCorrectAnswer = (exercise) => exercise.facit === exercise.questionAnswers;

/**
 * @param {number} scalar The scalar to use for the weight
 * @param {[]} vector The vector to multiply with the scalar
 * @return {[]} A new vector which is multiplied with the scalar
 */
const scalarMultiplication = (scalar, vector) => vector.map((x) => x * scalar);

function calculateUserProfile(exerciseProfiles, currentUserProfile) {
  const weightedUserProfile = scalarMultiplication(USER_WEIGHT, currentUserProfile);
  let newUserProfile = sumVectorArray(exerciseProfiles);

  newUserProfile = scalarMultiplication(1 / exerciseProfiles.length, newUserProfile);
  newUserProfile = sumVectorArray([newUserProfile, weightedUserProfile]);

  return newUserProfile;
}

const sumVectorArray = (exerciseProfiles) => exerciseProfiles.reduce((a, b) => a.map((c, i) => c + b[i]));

function respondWithNewUserProfile(newUserProfile, response) {
  const newUserProfileJsonString = JSON.stringify(newUserProfile);
  response.writeHead(200, {
    'Content-Type': 'application/json',
  });
  response.end(newUserProfileJsonString);
}

module.exports = {
  handleReviseUserProfileRequest,
  handleReviseUserProfilePostRequest,
  reviseUserProfile,
  fetchRequestBody,
  requestBodyIsValid,
  requestBodyUserProfileIsValid,
  isUserProfileValidVector,
  requestBodyExerciseSetIsValid,
  validateEachExerciseInExerciseSet,
  convertExerciseSetToExerciseProfiles,
  calculateExerciseProfile,
  scalarMultiplication,
  convertExerciseToVector,
  isCorrectAnswer,
  sumVectorArray,
  respondWithNewUserProfile,
  calculateUserProfile,
  CORRECT_ANSWER_WEIGHT,
  WRONG_ANSWER_WEIGHT,
  USER_WEIGHT,
};
