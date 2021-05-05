const { errorResponse } = require('../helper');

function handleReviseUserProfileRequest(request, response) {
  if (request.method === 'POST') {
    handleReviseUserProfilePostRequest(request, response);
  } else if (request.method !== 'POST') {
    throw 'bad request';
  }
}

async function handleReviseUserProfilePostRequest(request, response) {
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
  respondWithNewUserProfile(newUserProfile, response);
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

function requestBodyIsValid(requestBody) {
  return requestBodyUserProfileIsValid(requestBody)
    && requestBodyExerciseSetIsValid(requestBody);
}

function requestBodyUserProfileIsValid(requestBody) {
  let isValidUserProfile;
  if (!(requestBody.hasOwnProperty('userProfile') && requestBody.userProfile.length === 23)) {
    isValidUserProfile = false;
  } else if (requestBody.hasOwnProperty('userProfile') && requestBody.userProfile.length === 23) {
    isValidUserProfile = isUserProfileValidVector(requestBody.userProfile);
  }

  return isValidUserProfile;
}

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

function convertExerciseSetToExerciseProfiles(exerciseSet) {
  const exerciseProfiles = [];

  exerciseSet.forEach((exercise) => {
    exerciseProfiles.push(calculateExerciseProfile(exercise));
  });

  return exerciseProfiles;
}

function calculateExerciseProfile(exercise) {
  const correctAnswerWeight = 0.2;
  const wrongAnswerWeight = 0.7;
  let exerciseVector = convertExerciseToVector(exercise);

  if (isCorrectAnswer(exercise)) {
    exerciseVector = scalarMultiplication(correctAnswerWeight, exerciseVector);
  } else if (!isCorrectAnswer(exercise)) {
    exerciseVector = scalarMultiplication(wrongAnswerWeight, exerciseVector);
  }

  return exerciseVector;
}

/**
 * @param {number} scalar The scalar to use for the weight
 * @param {[]} vector The vector to multiply with the scalar
 * @return {[]} A new vector which is multiplied with the scalar
 */
const scalarMultiplication = (scalar, vector) => vector.map((x) => x * scalar);

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

function calculateUserProfile(exerciseProfiles, currentUserProfile) {
  const userWeight = 0.5;
  const weightedUserProfile = scalarMultiplication(userWeight, currentUserProfile);
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
};

// example body:
// {
//   userProfile: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
//   exerciseSet:
//     [
//       {
//         "txt": "Find x i følgende ligning.",
//         "type": "ligninger",
//         "point": 5,
//         "tegn": "-",
//         "exerciseVars": {
//           "ligning": "11x - 14 = 29"
//         },
//         "facit": "3.9",
//         "questionNumber": 1,
//         "questionAnswers": "3"
//       },
//       {
//         "txt": "Find x i følgende ligning.",
//         "type": "ligninger",
//         "point": 5,
//         "tegn": "+",
//         "exerciseVars": {
//           "ligning": "4x + 22 = 45"
//         },
//         "facit": "5.8",
//         "questionNumber": 2,
//         "questionAnswers": "3"
//       },
//       {
//         "txt": "Find x i følgende ligning.",
//         "type": "ligninger",
//         "point": 5,
//         "tegn": "-",
//         "exerciseVars": {
//           "ligning": "6x - 20 = 59"
//         },
//         "facit": "13.2",
//         "questionNumber": 3,
//         "questionAnswers": "3"
//       },
//       {
//         "txt": "Find x i følgende ligning.",
//         "type": "ligninger",
//         "point": 5,
//         "tegn": "+",
//         "exerciseVars": {
//           "ligning": "2x + 13 = 29"
//         },
//         "facit": "8.0",
//         "questionNumber": 4,
//         "questionAnswers": "3",
//       }
//     ]
// };
