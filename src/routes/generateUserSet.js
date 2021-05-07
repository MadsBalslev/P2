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
    console.log(userProfile);
    validateUserProfile(userProfile);
    const userExerciseSet = generateUserExerciseSet(userProfile);
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

function generateUserExerciseSet(userProfile) {

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
  vector.forEach(element => {
    temp += Math.pow(element, 2);
  });
  return Math.sqrt(temp);
}

module.exports = {
  handleGenerateUserSetRequest,
  handleGenerateUserSetPostRequest,
  validateUserProfile,
  userProfileIsValid,
  generateUserExerciseSet,
  cosineSimilarity,
  dotProduct,
  lengthOfVector,
};
