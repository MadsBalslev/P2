const helper = require('../helper');

const CORRECT_ANSWER_WEIGHT = 0.2;
const WRONG_ANSWER_WEIGHT = 0.7;
const USER_WEIGHT = 0.5;

/**
 * Handles requests to /reviseUserProfile, if the request is a post request handle the request,
 * else if it’s not a request don’t handle it.
 *
 * @param {{}} request
 * @param {{}} response
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
 *
 * @param {{}} request
 * @param {{}} response
 */
async function handleReviseUserProfilePostRequest(request, response) {
  try {
    const requestBody = await helper.fetchJsonRequestBody(request);
    validateRequestBody(requestBody);
    const newUserProfile = reviseUserProfile(requestBody.exerciseSet, requestBody.userProfile);
    helper.respondWithJsonObject(newUserProfile, response);
  } catch (error) {
    helper.errorResponse(response, '400', `${error}`);
  }
}

function validateRequestBody(requestBody) {
  if (!requestBodyIsValid(requestBody)) {
    throw 'invalid request body';
  }
}

/**
 * Checks if requestBody has the correct properties and that the properties are of the correct type.
 *
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
 *
 * @param {Object} requestBody Object to control.
 * @returns {Boolean} True if the userProfile is valid, else false.
 */
function requestBodyUserProfileIsValid(requestBody) {
  let isValidUserProfile;
  if (!(requestBody.hasOwnProperty('userProfile') && requestBody.userProfile.length === 23)) {
    isValidUserProfile = false;
  } else if (requestBody.hasOwnProperty('userProfile') && requestBody.userProfile.length === 23) {
    isValidUserProfile = helper.isUserProfileValidVector(requestBody.userProfile);
  }

  return isValidUserProfile;
}

/**
 * Checks if requestBody contains the property exerciseSet, if it does checks if each exercise in
 * exerciseSet is valid.
 *
 * @param {Object} requestBody
 * @returns True if the requestBody.ExerciseSet is valid, else false.
 */
function requestBodyExerciseSetIsValid(requestBody) {
  let isValidExerciseSet;
  if (!requestBody.hasOwnProperty('exerciseSet')) {
    isValidExerciseSet = false;
  } if (requestBody.hasOwnProperty('exerciseSet')) {
    isValidExerciseSet = validateEachExerciseInExerciseSet(requestBody.exerciseSet);
  }

  return isValidExerciseSet;
}

/**
 * Checks if each exercise in requestBody.ExerciseSet contains the correct properties and that these
 * properties are of the correct type.
 *
 * @param {Object[]} exerciseSet
 * @returns True if the requestBody.ExerciseSet is valid, else false.
 */
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

/**
 * Converts a exerciseSet to an Array of exercises exerciseSet to an array of vectors/arrays called
 * exerciseProfiles.
 *
 * @param {Object[]} exerciseSet
 * @returns {Number[] exerciseProfile vectors.
 */
function convertExerciseSetToExerciseProfiles(exerciseSet) {
  const exerciseProfiles = [];

  exerciseSet.forEach((exercise) => {
    exerciseProfiles.push(calculateExerciseProfile(exercise));
  });

  return exerciseProfiles;
}

/**
 * Calculates a single exerciseProfile vector given an exercise. If the answer is wrong the
 * exerciseProfile is multiplied by 0.2, if the answer is wrong the exerciseProfile is multiplied by
 * 0.7.
 *
 * @param {{}} exercise
 * @returns ExerciseProfile.
 */
function calculateExerciseProfile(exercise) {
  let exerciseProfile = convertExerciseToVector(exercise);

  if (isCorrectAnswer(exercise)) {
    exerciseProfile = scalarMultiplication(CORRECT_ANSWER_WEIGHT, exerciseProfile);
  } else if (!isCorrectAnswer(exercise)) {
    exerciseProfile = scalarMultiplication(WRONG_ANSWER_WEIGHT, exerciseProfile);
  }

  return exerciseProfile;
}
/**
 * Converts and exercise to vector representation.
 *
 * @param {{}} exercise
 * @returns {number[]} Exercise vector.
 */
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

/**
 * Compares the answer to an exercise with the facit.
 *
 * @param {Object} exercise
 * @returns {Boolean} True if facit and answer are the same, else false.
 */
const isCorrectAnswer = (exercise) => exercise.facit === exercise.questionAnswers;

/**
 * Will calculate a new user profile based on the exerciseProfiles
 *
 * @param {number[][]} exerciseProfiles A nested array of exercise profiles
 * @param {number[]} currentUserProfile The current user profile to be re-calculated
 * @returns {number[]} The re-calculated user profile
 */
function calculateUserProfile(exerciseProfiles, currentUserProfile) {
  const weightedUserProfile = scalarMultiplication(USER_WEIGHT, currentUserProfile);
  let newUserProfile = sumVectorArray(exerciseProfiles);

  newUserProfile = scalarMultiplication(1 / exerciseProfiles.length, newUserProfile);
  newUserProfile = sumVectorArray([newUserProfile, weightedUserProfile]);

  return newUserProfile;
}

/**
 * Will scale a vector with the given scalar and return the new scaled vector
 *
 * @param {number} scalar The scalar to use for the weight
 * @param {number[]} vector The vector to multiply with the scalar
 * @return {number[]} A new vector which is multiplied with the scalar
 */
const scalarMultiplication = (scalar, vector) => vector.map((x) => x * scalar);

/**
 * Will sum an array of vectors (arrays) together.
 * @param {number[][]} vectors
 * @return {number[]} Sum of vectors in the vectors array.
 */
const sumVectorArray = (vectors) => vectors.reduce((a, b) => a.map((c, i) => c + b[i]));

module.exports = {
  handleReviseUserProfileRequest,
  handleReviseUserProfilePostRequest,
  reviseUserProfile,
  requestBodyIsValid,
  requestBodyUserProfileIsValid,
  requestBodyExerciseSetIsValid,
  validateEachExerciseInExerciseSet,
  convertExerciseSetToExerciseProfiles,
  calculateExerciseProfile,
  scalarMultiplication,
  convertExerciseToVector,
  isCorrectAnswer,
  sumVectorArray,
  calculateUserProfile,
  CORRECT_ANSWER_WEIGHT,
  WRONG_ANSWER_WEIGHT,
  USER_WEIGHT,
};
