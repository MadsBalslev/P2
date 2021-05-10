const { floor, ceil, round } = require('mathjs');
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
    const userExerciseSet = generateUserExerciseSet2(userProfile, request.headers.amount);
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

function generateUserExerciseSet1(userProfile, amountOfExercises) {
  const identityMatrix23 = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  ];

  identityMatrix23.sort((vectorA, vectorB) => {
    return cosineSimilarity(vectorB, userProfile) - cosineSimilarity(vectorA, userProfile);
  });

  let amountOfRemainingExercises = amountOfExercises;
  let i = 0;
  let amountOfExercisesInPart;
  const exerciseSet = [];
  let exercisePart;

  while (amountOfRemainingExercises > 0) {
    amountOfExercisesInPart = ceil(amountOfRemainingExercises / 2);
    amountOfRemainingExercises -= amountOfExercisesInPart;
    exercisePart = generateExcerciseSet([vectorToExerciseCategory(identityMatrix23[i])], amountOfExercisesInPart);
    exerciseSet.concat(exercisePart);
    i++;
  }

  return exerciseSet;
}

function generateUserExerciseSet2(userProfile, amountOfExercises) {
}

function generateUserExerciseSet3(userProfile, amountOfExercises) {
  
}

function cosineSimilarity(vectorA, vectorB) {
  return dotProduct(vectorA, vectorB) / (lengthOfVector(vectorA) * lengthOfVector(vectorB));
}

function dotProduct(vectorA, vectorB) {
  let dotProductProcedual = 0;
  vectorA.forEach((element, i) => {
    dotProductProcedual += vectorA[i] * vectorB[i];
  });
  return dotProductProcedual;
}

function lengthOfVector(vector) {
  let temp = 0;
  vector.forEach((element) => {
    temp += element ** 2;
  });
  return Math.sqrt(temp);
}

function vectorToExerciseCategory(vector) {
  switch (vector.toString()) {
    case '1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0': return 'talOgRegnearter_C';
    case '0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0': return 'ligninger_C';
    case '0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0': return 'funktioner_C';
    case '0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0': return 'trigonometri_C';
    case '0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0': return 'geometri_C';
    case '0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0': return 'sandsynlighed_C';
    case '0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0': return 'andengradspolynomiumOgLigning_B';
    case '0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0': return 'trigonometri_B';
    case '0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0': return 'funktioner_B';
    case '0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0': return 'geometri_B';
    case '0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0': return 'differentialregning_B';
    case '0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0': return 'sandsynlighedOgKombinatori_B';
    case '0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0': return 'statistik_B';
    case '0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0': return 'regression_B';
    case '0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0': return 'vektorerI2d_B';
    case '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0': return 'vektorerI3d_A';
    case '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0': return 'vektorfunktioner_A';
    case '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0': return 'trigonometri_A';
    case '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0': return 'infinitesimalregning_A';
    case '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0': return 'differentialregning_A';
    case '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0': return 'integralregning_A';
    case '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0': return 'funktionerAfToVariable_A';
    case '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1': return 'statistik_A';
    default: return '';
  }
}

function randomCategory() {
  switch (helper.randNum(22)) {
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
  generateUserExerciseSet: generateUserExerciseSet1,
  cosineSimilarity,
  dotProduct,
  lengthOfVector,
};
