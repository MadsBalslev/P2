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
    errorResponse(response, '400', `${error}`);
  }
}

async function reviseUserProfile(request, response) {
  const { userProfile, exerciseSet } = await fetchRequestBody(request);
  const exerciseProfiles = convertExerciseSetToExerciseProfiles(exerciseSet);
  const newUserProfile = calculateUserProfile(exerciseProfiles, userProfile);
  respondWithUserProfile(newUserProfile, response);
}

function fetchRequestBody(request) {
  return new Promise((resolve, reject) => {
    let requestBody = '';
    request.on('data', (chunk) => {
      requestBody += chunk;
    });

    request.on('end', () => {
      try {
        requestBody = JSON.parse(requestBody);
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

function convertExerciseSetToExerciseProfiles(exerciseSet) {
  const ExerciseProfiles = [];

  exerciseSet.forEach((exercise) => {
    ExerciseProfiles.push(calculateExerciseProfile(exercise));
  });
}

function calculateExerciseProfile(exercise) {
  const wrongAnswerWeight = 0.7;
  const correctAnswerWeight = 0.2;
  const exerciseVector = convertExerciseToVector(exercise);
  let exerciseProfile;

  if (isWrongAnswer(exercise)) {
    exerciseProfile = wrongAnswerWeight * exerciseVector;
  } else if (!isWrongAnswer(exercise)) {
    exerciseProfile = correctAnswerWeight * exerciseVector;
  }

  return exerciseProfile;
}

convertExerciseToVector(exercise) {
  switch (exercise.type) {
    case 'talOgRegnearter_C':
      return [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case 'ligniger_C':
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

function isWrongAnswer(params) {

}

function calculateUserProfile(exerciseProfiles, currentUserProfile) {

}

function respondWithUserProfile(newUserProfile, response) {

}

module.exports = handleReviseUserProfileRequest;

// example body:

let example = {
  userProfile: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  exerciseSet:
    [
      {
        "txt": "Find x i følgende ligning.",
        "type": "ligninger",
        "point": 5,
        "tegn": "-",
        "exerciseVars": {
          "ligning": "11x - 14 = 29"
        },
        "facit": "3.9",
        "questionNumber": 1,
        "questionAnswers": "3"
      },
      {
        "txt": "Find x i følgende ligning.",
        "type": "ligninger",
        "point": 5,
        "tegn": "+",
        "exerciseVars": {
          "ligning": "4x + 22 = 45"
        },
        "facit": "5.8",
        "questionNumber": 2,
        "questionAnswers": "3"
      },
      {
        "txt": "Find x i følgende ligning.",
        "type": "ligninger",
        "point": 5,
        "tegn": "-",
        "exerciseVars": {
          "ligning": "6x - 20 = 59"
        },
        "facit": "13.2",
        "questionNumber": 3,
        "questionAnswers": "3"
      },
      {
        "txt": "Find x i følgende ligning.",
        "type": "ligninger",
        "point": 5,
        "tegn": "+",
        "exerciseVars": {
          "ligning": "2x + 13 = 29"
        },
        "facit": "8.0",
        "questionNumber": 4,
        "questionAnswers": "3",
      }
    ]
};
