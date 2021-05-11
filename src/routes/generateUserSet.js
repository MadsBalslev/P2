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
    console.log(userExerciseSet);
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
  let { actualAmount, exerciseSet } = generateCoreExerciseSet(exerciseAmountVector);
  exerciseSet = fillExerciseSetWithRandomExercises(actualAmount, amountOfExercises, exerciseSet);
  return exerciseSet;
}

function fillExerciseSetWithRandomExercises(actualAmount, amountOfExercises, exerciseSet) {
  let exerciseSetCopy = [...exerciseSet];
  while (actualAmount < amountOfExercises) {
    const randomExercise = generateExcerciseSet([randomCategory()], 1);
    exerciseSetCopy = exerciseSetCopy.concat(randomExercise);
    actualAmount++;
  }
  return exerciseSetCopy;
}

function generateCoreExerciseSet(exerciseAmountVector) {
  let actualAmount = 0;
  let exerciseSet = [];
  exerciseAmountVector.forEach((amount, i) => {
    const exerciseSubset = generateExcerciseSet([indexToCategory(i)], amount);
    exerciseSet = exerciseSet.concat(exerciseSubset);
    actualAmount += amount;
  });
  return { actualAmount, exerciseSet };
}

function vectorToPercentVector(userProfile) {
  let sum = 0;
  userProfile.forEach((element) => {
    sum += element;
  });
  return helper.scalarMultiplication(1 / sum, userProfile);
}

function percentVectorToExerciseAmountVector(percentVector, amountOfExercises) {
  console.log(helper.scalarMultiplication(amountOfExercises, percentVector));
  return round(helper.scalarMultiplication(amountOfExercises, percentVector));
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
    default: return '';
  }
}

module.exports = {
  handleGenerateUserSetRequest,
  handleGenerateUserSetPostRequest,
  validateUserProfile,
  userProfileIsValid,
  generateUserExerciseSet,
};
