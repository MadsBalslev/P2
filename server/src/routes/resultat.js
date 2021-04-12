const helper = require('../helper');

/**
 * Will handle requests to the '/result' route
 * @param {*} request
 * @param {*} response
 */
const handleResultRequest = (request, response) => {
  if (request.method === 'POST') {
    handleResultPostRequest(request, response);
  } else if (request.method !== 'POST') {
    throw 'handleResultRequest did not get a POST request';
  }
};

/**
 * Adding requested data from chunk to body
 * Parsing JSON format from server to body, using the Promise (), function to handle error.
 * @param {*} request
 * @param {*} response
 */
const handleResultPostRequest = async (request, response) => {
  const body = await getBodyFromRequest(request);
  handleBody(body, response);
};

const getBodyFromRequest = (request) => new Promise((resolve, rejects) => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    body = JSON.parse(body);
    resolve(body);
  });

  request.on('error', (error) => { rejects(error); });
});

/**
 * @param {*} body
 * @param {*} response
 * Error message defined. We select our handlebody,-
   so that none valid requests gets an errormessage.
 */
const handleBody = (body, response) => {
  if (requestBodyIsValid(body)) {
    handleRequestBody(body, response);
  } else if (!(requestBodyIsValid(body))) {
    helper.errorResponse(response, 400, 'handleRequestBody did not get valid body');
  }
};

/**
 * We iterate the elements of the body array. The Loop will break, if it gets a false value.
 * @param {*} body
 * @returns
 */
const requestBodyIsValid = (body) => {
  let bodyIsValid = true;

  for (const actualAnswers of body) {
    if (!isActualAnswerValid(actualAnswers)) {
      bodyIsValid = false;
      break;
    }
  }

  return bodyIsValid;
};

/**
 * @var isActualSnawerValid
 * The variable is assigned the properties of the array actualAnswers
 * @param {*} actualAnswers
 * @returns
 */
const isActualAnswerValid = (actualAnswers) => actualAnswers.hasOwnProperty('id')
  && actualAnswers.hasOwnProperty('actualAnswer')
  && typeof actualAnswers.id === 'number'
  && typeof actualAnswers.actualAnswer === 'string';

/**
 * Handling structure, so that HandleRequest runs before exercisesFromDatabase
 * First we insert the value of the parameters in order to run our comparisson, in our function-
    compareExercisesFromDatabaseWithActualAnswers.
 * @param {*} requestBody
 * @param {*} response
 */
const handleRequestBody = async (actualAnswers, response) => {
  const exercises = convertActualAnswersToExercises(actualAnswers);
  const exerciseSuite = new ExerciseSuite(exercises);
  await exerciseSuite.getExercisesDataFromDatabase();
  exerciseSuite.evaluateAnswersData();
  const resultPage = new ResultPage(exerciseSuite);
  resultPage.respondTo(response);
};

function convertActualAnswersToExercises(actualAnswers) {
  let i = 0;
  const exercises = [];
  actualAnswers.forEach((answer) => {
    exercises[i] = new Exercise(answer);
    i += 1;
  });

  return exercises;
}

function ExerciseSuite(exercises) {
  this.exercises = exercises;

  this.getExercisesDataFromDatabase = async function getExercisesDataFromDatabase() {
  };

  this.evaluateAnswersData = function evaluateAnswersData() {
    this.exercises.forEach((exercise) => {
      exercise.evaluateSingleAnswer();
    });
  };
}

function Exercise(answer) {
  this.data = {
    id: answer.id,
    actualAnswer: answer.actualAnswer,
    answerWasCorrect: undefined,
    tekst: undefined,
    facit: undefined,
    point: undefined,
    type: undefined,
  };

  this.getSingleExerciseDataFromDatabase = function getSingleExerciseDataFromDatabase() {
  };

  this.evaluateSingleAnswer = function evaluateSingleAnswer() {
    if (this.data.actualAnswer === this.data.facit) {
      this.data.answerWasCorrect = true;
    } else if (this.data.actualAnswer !== this.data.facit) {
      this.data.answerWasCorrect = false;
    }
  };
}

function ResultPage(exerciseSuite) {
  this.page = '<!DOCTYPE html>
  <head>
  <title>P2 Projekt Resultat Side</title>
  <link rel='icon' type='image/png' href='./favicon.png' />
  <meta charset="UTF-8">
  </head>
  <body>`;

  let exerciseNumber = 1;
  exerciseSuite.exercises.forEach((exercise) => {
    this.page += `<div class="exercise" id="exercise${exerciseNumber}">\n`;
    this.page += `<h1>Opgave ${exerciseNumber}</h1>\n`;
    this.page += '<div class="exerciseBody">\n';
    this.page += `<p>${exercise.data.tekst}</p>\n`;
    this.page += '</div>\n';

    this.page += '<div class="answerBody">\n';
    this.page += '<h2> Svar og facit</h2>\n';
    if (exercise.data.answerWasCorrect) {
      this.page += '<p style="background-color: lightgreen">Dit svar var korrekt</p>\n';
    } else if (!exercise.data.answerWasCorrect) {
      this.page += '<p style="background-color: lightcoral">Dit svar var forkert</p>\n';
    }
    this.page += `<p><b>Korrekte svar:</b> ${exercise.data.facit}</p>\n`;
    this.page += `<p><b>Dit svar:</b> ${exercise.data.actualAnswer}</p>\n`;
    this.page += '</div>\n';

    this.page += '<div class="exerciseData">\n';
    this.page += '<h2>Opgave indsigt</h2>\n';
    this.page += `<p><b>Emne:</b> ${exercise.data.type}</p>\n`;
    this.page += `<p><b>Points:</b> ${exercise.data.point}</p>\n`;
    this.page += '</div>\n';
    this.page += '</div>\n';

    exerciseNumber += 1;
  });
  this.page += '</body>';

  this.respondTo = function respondTo(response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(this.page);
  };
}

module.exports = handleResultRequest;
