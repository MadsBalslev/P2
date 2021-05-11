const { round } = require('mathjs');
const { generateExcerciseSet } = require('../API/examQuestions/generator');
const helper = require('../helper');

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
    helper.respondWithJsonObject(userExerciseSet);
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
  return userProfile.length === 23 && helper.isUserProfileValidVector(userProfile);
}

function generateUserExerciseSet(userProfile, amountOfExercises) {
  const percentUserProfile = vectorToPercentVector(userProfile);
  const exerciseAmountVector = percentVectorToExerciseAmountVector(percentUserProfile, amountOfExercises);
  console.log(exerciseAmountVector);
  let { actualAmount, exerciseSet } = generateCoreExerciseSet(exerciseAmountVector);
  console.log(actualAmount);
  exerciseSet = fillExerciseSetWithRandomExercises(actualAmount, amountOfExercises, exerciseSet);
  return exerciseSet;
}

function fillExerciseSetWithRandomExercises(actualAmount, amountOfExercises, exerciseSet) {
  const exerciseSetCopy = [...exerciseSet];
  while (actualAmount < amountOfExercises) {
    const randomExercise = generateExcerciseSet([randomCategory()], 1);
    exerciseSetCopy.concat(randomExercise);
    actualAmount++;
  }
  return exerciseSetCopy;
}

function generateCoreExerciseSet(exerciseAmountVector) {
  let actualAmount = 0;
  const exerciseSet = [];
  exerciseAmountVector.forEach((amount, i) => {
    const exerciseSubset = generateExcerciseSet([indexToCategory(i)], amount);
    exerciseSet.concat(exerciseSubset);
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
  return indexToCategory(helper.randNum(22) + 1);
}

function indexToCategory(category) {
  switch (category) {
    case 0: return 'talOgRegnearter_C';
    case 1: return 'ligninger_C';
    case 2: return 'funktioner_C';
    case 3: return 'trigonometri_C';
    case 4: return 'geometri_C';
    case 5: return 'sandsynlighed_C';
    case 6: return 'andengradspolynomiumOgLigning_B';
    case 7: return 'trigonometri_B';
    case 8: return 'funktioner_B';
    case 9: return 'geometri_B';
    case 10: return 'differentialregning_B';
    case 11: return 'sandsynlighedOgKombinatori_B';
    case 12: return 'statistik_B';
    case 13: return 'regression_B';
    case 14: return 'vektorerI2d_B';
    case 15: return 'vektorerI3d_A';
    case 16: return 'vektorfunktioner_A';
    case 17: return 'trigonometri_A';
    case 18: return 'infinitesimalregning_A';
    case 19: return 'differentialregning_A';
    case 20: return 'integralregning_A';
    case 21: return 'funktionerAfToVariable_A';
    case 22: return 'statistik_A';
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
