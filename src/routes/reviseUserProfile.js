const { errorResponse } = require('../helper');

function handleReviseUserProfileRequest(request, response) {
  if (request.method === 'POST') {
    handleRevisedUserProfilePostRequest(request, response);
  } else if (request.method !== 'POST') {
    throw 'bad request';
  }
}

async function handleRevisedUserProfilePostRequest(request, response) {
  try {
    await reviseUserProfile(request, response);
  } catch (error) {
    errorResponse(response, '400', error);
  }
}

async function reviseUserProfile(request, response) {
  const { currentUserProfile, exerciseSet } = await fetchRequestBody(request);
  const exerciseProfiles = convertExerciseSetToExerciseProfiles(exerciseSet);
  const newUserProfile = calculateUserProfile(exerciseProfiles, currentUserProfile);
  respondWithUserProfile(newUserProfile, response);
}

function fetchRequestBody(request) {
  return new Promise((resolve, reject) => {

  });
}

function convertExerciseSetToExerciseProfiles(exerciseSet) {

}

function calculateUserProfile(exerciseProfiles, currentUserProfile) {

}

function respondWithUserProfile(newUserProfile, response) {
}

module.exports = handleReviseUserProfileRequest;
