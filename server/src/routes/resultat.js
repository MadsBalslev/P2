const helper = require('../helper');

function ExerciseSuite(exercises) {
  this.exercises = exercises;
}

ExerciseSuite.prototype.evaluateAnswersData = function evaluateAnswersData() {
  this.exercises.forEach((exercise) => {
    exercise.evaluateSingleAnswer();
  });
};

function Exercise(answer) {
  this.id = answer.id;
  this.number = answer.questionNumber;
  this.answer = answer.questionAnswers;
  this.correct = undefined;
  this.text = answer.txt;
  this.facit = answer.facit;
  this.point = answer.point;
  this.type = answer.type;
}

Exercise.prototype.evaluateSingleAnswer = function evaluateSingleAnswer() {
  if (this.answer == this.facit) {
    this.correct = true;
  } else if (this.answer != this.facit) {
    this.correct = false;
  }
};

function ResultPage(exerciseSuite) {
  this.page = '';
  this.page += createPageHead();
  this.page += createPageBody(exerciseSuite);
}

ResultPage.prototype.respondTo = function respondTo(response) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.end(this.page);
};

const createPageHead = () => `<!DOCTYPE html>
  <head>
  <title>P2 Projekt Resultat Side</title>
  <link rel='icon' type='image/png' href='./favicon.png' />
  <meta charset="UTF-8">
  </head>
  `;

const createPageBody = (exerciseSuite) => {
  let pageBody = '';
  pageBody += '<body>';

  exerciseSuite.exercises.forEach((exercise) => {
    pageBody += createPageBodyExercise(exercise);
  });

  pageBody += '</body>';
  return pageBody;
};

function createPageBodyExercise(exercise) {
  let pageBody = '';
  pageBody += `<div class="exercise" id="exercise${exercise.number}">\n`;
  pageBody += `<h1>Opgave ${exercise.number}</h1>\n`;
  pageBody += createPageBodyExerciseBody(exercise);
  pageBody += createPageBodyAnswerBody(exercise);
  pageBody += createPageBodyExerciseData(exercise);
  return pageBody;
}

function createPageBodyExerciseData(exercise) {
  let pageBody = '';
  pageBody += '<div class="exerciseData">\n';
  pageBody += '<h2>Opgave indsigt</h2>\n';
  pageBody += `<p><b>Emne:</b> ${exercise.type}</p>\n`;
  pageBody += `<p><b>Points:</b> ${exercise.point}</p>\n`;
  pageBody += '</div>\n';
  pageBody += '</div>\n';
  return pageBody;
}

function createPageBodyAnswerBody(exercise) {
  let pageBody = '';
  pageBody += '<div class="answerBody">\n';
  pageBody += '<h2> Svar og facit</h2>\n';
  if (exercise.correct) {
    pageBody += '<p style="background-color: lightgreen">Dit svar var korrekt</p>\n';
  } else if (!exercise.correct) {
    pageBody += '<p style="background-color: lightcoral">Dit svar var forkert</p>\n';
  }
  pageBody += `<p><b>Korrekte svar:</b> ${exercise.facit}</p>\n`;
  pageBody += `<p><b>Dit svar:</b> ${exercise.answer}</p>\n`;
  pageBody += '</div>\n';
  return pageBody;
}

function createPageBodyExerciseBody(exercise) {
  let pageBody = '';
  pageBody += '<div class="exerciseBody">\n';
  pageBody += `<p>${exercise.text}</p>\n`;
  pageBody += '</div>\n';
  return pageBody;
}

/**
 * Will handle requests to the '/result' route
 * @param {*} request
 * @param {*} response
 */
const handleResultRequest = (request, response) => {
  console.log('handleResultRequest was called');
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
  console.log('handleResultPostRequest was called');
  try {
    const body = await getBodyFromRequest(request);
    handleBody(body, response);
  } catch (error) {
    helper.errorResponse(response, 400, 'handleRequestBody did not get valid body');
  }
};

const getBodyFromRequest = (request) => new Promise((resolve, rejects) => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    try {
      body = JSON.parse(body);
      resolve(body);
    } catch (error) {
      rejects(error);
    }
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
  console.log(body);
  if (requestBodyIsValid(body)) {
    handleRequestBody(body, response);
  } else if (!(requestBodyIsValid(body))) {
    helper.errorResponse(response, 400, 'handleRequestBody did not get valid body');
  }
};

/**
 * We iterate the elements of the body array. The Loop will break, if it gets a false value.
 * @param {*} body
 * @returns ?
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
 * @returns ?
 */
const isActualAnswerValid = (actualAnswer) => actualAnswer.hasOwnProperty('exerciseVars')
  && actualAnswer.hasOwnProperty('facit')
  && actualAnswer.hasOwnProperty('type')
  && actualAnswer.hasOwnProperty('point')
  && actualAnswer.hasOwnProperty('txt')
  && actualAnswer.hasOwnProperty('tegn')
  && actualAnswer.hasOwnProperty('questionAnswers')
  && actualAnswer.hasOwnProperty('questionNumber')

/**
 * Handling structure, so that HandleRequest runs before exercisesFromDatabase
 * First we insert the value of the parameters in order to run our comparisson, in our function-
    compareExercisesFromDatabaseWithActualAnswers.
 * @param {*} requestBody
 * @param {*} response
 */
const handleRequestBody = (actualAnswers, response) => {
  const exercises = convertActualAnswersToExercises(actualAnswers);
  const exerciseSuite = new ExerciseSuite(exercises);
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

module.exports = handleResultRequest;
