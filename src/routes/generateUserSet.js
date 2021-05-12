const { round } = require('mathjs');
const { generateExcerciseSet } = require('../API/examQuestions/generator');
const helper = require('../helper');
const { USER_PROFILE_LENGTH } = require('./reviseUserProfile');

function handleGenerateUserSetRequest(request, response) {
  if (request.method === 'POST') {
    handleGenerateUserSetPostRequest(request, response);
  } else if (request.method !== 'POST') {
    throw 'bad request';
  }
}

async function handleGenerateUserSetPostRequest(request, response) {
  try {
    const userProfile = await helper.fetchJsonRequestBody(request);
    validateUserProfile(userProfile);
    const userExerciseSet = generateUserExerciseSet(userProfile, request.headers.amount);
    helper.respondWithJsonObject(userExerciseSet, response);
  } catch (error) {
    helper.errorResponse(response, '400', `${error}`);
  }
}

function validateUserProfile(userProfile) {
  if (!userProfileIsValid(userProfile)) {
    throw 'invalid request body';
  }
}

function userProfileIsValid(userProfile) {
  return userProfile.length === USER_PROFILE_LENGTH && helper.isUserProfileValidVector(userProfile);
}

function generateUserExerciseSet(userProfile, amountOfExercises) {
  const percentUserProfile = vectorToPercentVector(userProfile);
  const exerciseAmountVector = percentVectorToExerciseAmountVector(percentUserProfile, amountOfExercises);
  let exerciseSet = generateCoreExerciseSet(exerciseAmountVector);
  exerciseSet = fillExerciseSetWithRandomExercises(amountOfExercises, exerciseSet);
  return exerciseSet;
}

function vectorToPercentVector(userProfile) {
  let sum = 0;
  userProfile.forEach((element) => {
    sum += element;
  });
  return helper.scalarMultiplication(1 / sum, userProfile);
}

function percentVectorToExerciseAmountVector(percentVector, amountOfExercises) {
  return round(helper.scalarMultiplication(amountOfExercises, percentVector));
}

function generateCoreExerciseSet(exerciseAmountVector) {
  let exerciseSet = [];
  exerciseAmountVector.forEach((amount, i) => {
    const exerciseSubset = generateExcerciseSet([indexToCategory(i)], amount);
    exerciseSet = exerciseSet.concat(exerciseSubset);
  });
  return exerciseSet;
}

function fillExerciseSetWithRandomExercises(amountOfExercises, exerciseSet) {
  let exerciseSetCopy = [...exerciseSet];
  while (exerciseSetCopy.length < amountOfExercises) {
    const randomExercise = generateExcerciseSet([randomCategory()], 1);
    exerciseSetCopy = exerciseSetCopy.concat(randomExercise);
  }
  return exerciseSetCopy;
}

function randomCategory() {
  return indexToCategory(helper.randNum(USER_PROFILE_LENGTH - 1) + 1);
}

function indexToCategory(category) {
  switch (category) {
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
    case 10: return 'differentialligninger';
    default: return '';
  }
}

module.exports = {
  handleGenerateUserSetRequest,
  handleGenerateUserSetPostRequest,
  validateUserProfile,
  userProfileIsValid,
  generateUserExerciseSet,
  vectorToPercentVector,
  percentVectorToExerciseAmountVector,
  generateCoreExerciseSet,
};
