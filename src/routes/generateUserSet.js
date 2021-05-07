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

module.exports = {
  handleGenerateUserSetRequest,
};
