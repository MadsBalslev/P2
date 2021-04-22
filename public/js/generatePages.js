/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const baseUrl = window.location.href;

document.querySelector('#form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const exerciseSet = await getExerciseSetFromServer(event);
  buildExercisePage(exerciseSet);
});

/**
 * Gets the generated exercise set from the server.
 * @param event
 * @returns New promise for a resolve or reject.
 */
const getExerciseSetFromServer = () => new Promise((resolve, reject) => {
  const exerciseAmount = document.querySelector('#amount').value;
  const exerciseSubjects = getExerciseSubjects();

  fetch(`${baseUrl}opgaver`, {
    method: 'GET',
    headers: {
      subjects: exerciseSubjects,
      amount: exerciseAmount,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      // console.log(data);
    })
    .catch((error) => reject(error));
});

/**
 * Gets the exercises from the checkboxes.
 * @returns {str} The exercise subjects
 */
const getExerciseSubjects = () => {
  const elements = document.querySelector('#emneVælger').children;
  let exerciseSubjects = '';
  [...elements].forEach((element) => {
    exerciseSubjects += getCheckedExerciseSubject(element);
  });

  return exerciseSubjects;
};

/**
 * Gets the checked off subjects from check boxes.
 * @param element
 * @returns {str} The chosen exercise subject element ids
 */
const getCheckedExerciseSubject = (element) => {
  if (element.checked) {
    return `${element.id},`;
  }
  return '';
};

/**
 * Builds a page for the generated exercise set.
 * @param {obj[]} exerciseSet
 */
const buildExercisePage = (exerciseSet) => {
  clearDom();
  const exerciseForm = createExerciseForm();

  addExercisesToExerciseForm(exerciseForm, exerciseSet);
  addButtonToExerciseForm(exerciseForm, exerciseSet);

  document.body.appendChild(exerciseForm);

  giveFormAction(exerciseSet);
};

/**
 * Clears the document
 */
const clearDom = () => {
  document.body.innerHTML = '';
};

/**
 * Function for making an exercise form.
 * @returns {*} An exercise form
 */
const createExerciseForm = () => {
  const exerciseForm = document.createElement('form');
  exerciseForm.setAttribute('id', 'exerciseForm');
  return exerciseForm;
};

/**
 * Function for adding an exercise to the exercise form.
 * @param {*} exerciseForm
 * @param {obj[]} exerciseSet
 */
const addExercisesToExerciseForm = (exerciseForm, exerciseSet) => {
  let i = 1;
  exerciseSet.forEach((exercise) => {
    addSingleExerciseToExerciseForm(i, exercise, exerciseForm);
    i++;
  });
};

/**
 * Function for adding a single exercise to a exercise form.
 * @param {number} i
 * @param {{}} exercise
 * @param {*} exerciseForm
 */
const addSingleExerciseToExerciseForm = (i, exercise, exerciseForm) => {
  const exerciseDiv = document.createElement('div');
  exerciseDiv.setAttribute('class', 'exercise');

  addExerciseHeader(i, exercise, exerciseDiv);
  addExerciseText(exercise, exerciseDiv);
  addExerciseVars(exercise, exerciseDiv);
  addExerciseInputField(i, exerciseDiv);

  exerciseForm.appendChild(exerciseDiv);
};

/**
 * Function for adding header of the exercise.
 * @param {number} i
 * @param {{}} exercise
 * @param {*} exerciseDiv
 */
const addExerciseHeader = (i, exercise, exerciseDiv) => {
  const exerciseHeader = document.createElement('h1');
  exerciseHeader.innerHTML = `Spørgsmål ${i}`;
  // eslint-disable-next-line no-param-reassign
  exercise.questionNumber = i;
  exerciseDiv.appendChild(exerciseHeader);
};

/**
 * Function from adding text from the exercise.
 * @param {{}} exercise
 * @param {*} exerciseDiv
 */
const addExerciseText = (exercise, exerciseDiv) => {
  const questionText = document.createElement('p');
  questionText.innerHTML = exercise.txt;
  exerciseDiv.appendChild(questionText);
};

/**
 * Function from adding variables from the exercise.
 * @param {{}} exercise
 * @param {*} exerciseDiv
 */
const addExerciseVars = (exercise, exerciseDiv) => {
  const exerciseVars = Object.values(exercise.exerciseVars);

  exerciseVars.forEach((eVar) => {
    const questionText = document.createElement('p');
    questionText.setAttribute('class', 'mathTex');
    convert(eVar, questionText);
    exerciseDiv.appendChild(questionText);
  });
};

/**
 * Function for adding a input field for the exercise.
 * @param {number} i
 * @param {*} exerciseDiv
 */
const addExerciseInputField = (i, exerciseDiv) => {
  const textField = document.createElement('input');
  textField.setAttribute('required', '1');
  textField.setAttribute('id', `exercise${i}`);
  exerciseDiv.appendChild(textField);
};

/**
 * Function for adding a submit button for the exercise form.
 * @param {*} exerciseForm
 */
const addButtonToExerciseForm = (exerciseForm) => {
  const submitButton = document.createElement('input');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('value', 'kontroller dine svar');
  exerciseForm.appendChild(submitButton);
};

/**
 * Function that makes the submit button to get answers for the exercises.
 * @param {*} exerciseSet
 */
const giveFormAction = (exerciseSet) => {
  document.querySelector('#exerciseForm').addEventListener('submit', (event) => {
    event.preventDefault();
    exerciseSet.forEach((exercise) => {
      exercise.questionAnswers = document.querySelector(`#exercise${exercise.questionNumber}`).value;
    });
    generateResultPage(exerciseSet);
  });
};

const generateResultPage = (exerciseSet) => {
  clearDom();
  checkAnswer(exerciseSet);
};

const calcGrade = (points, maxPoints) => {
  const scalar = 250 / maxPoints;
  const normPoints = parseInt(scalar * points, 10);
  let grade = '';

  switch (true) {
    case normPoints < 20:
      grade = '-3';
      break;
    case normPoints < 66:
      grade = '00';
      break;
    case normPoints < 84:
      grade = '02';
      break;
    case normPoints < 124:
      grade = '4';
      break;
    case normPoints < 174:
      grade = '7';
      break;
    case normPoints < 210:
      grade = '10';
      break;
    case normPoints > 210:
      grade = '12';
      break;
    default:
      grade = '--';
      break;
  }

  return grade;
};

const checkAnswer = (exerciseSet) => {
  let userPoints = 0;
  let totalPoints = 0;

  const container = document.createElement('div');
  const pointCounter = document.createElement('div');
  const pointText = document.createElement('p');
  const grade = document.createElement('p');

  container.setAttribute('class', 'container');

  exerciseSet.forEach((exercise) => {
    let userAnswerValue = null;
    totalPoints += exercise.point;
    /* Det her burde være sin egen funktion senere */
    if (exercise.questionAnswers === exercise.facit) {
      userAnswerValue = true;
      userPoints += exercise.point;
    } else userAnswerValue = false;

    const div = document.createElement('div');
    const questionText = document.createElement('p');
    const questionType = document.createElement('p');
    const yourAnswer = document.createElement('p');

    div.setAttribute('class', 'answer');

    questionText.innerHTML = exercise.txt;
    questionType.innerHTML = `Spørgsmålstype: ${exercise.type}`;
    yourAnswer.innerHTML = `Dit svar: ${exercise.questionAnswers}`;

    if (userAnswerValue === true) {
      yourAnswer.style.backgroundColor = 'green';
      yourAnswer.innerHTML = `${exercise.questionAnswers} <br /> Rigtigt!`;
    } else {
      yourAnswer.style.backgroundColor = 'red';
      yourAnswer.innerHTML = `Dit svar: ${exercise.questionAnswers} <br /> Forkert! <br /> Facit: ${exercise.facit}`;
    }

    div.appendChild(questionText);
    addExerciseVars(exercise, div);
    div.appendChild(questionType);
    div.append(yourAnswer);
    container.appendChild(div);

    console.log(userPoints);
    console.log(totalPoints);
  });

  pointText.innerHTML = `Du fik: ${userPoints} Point <br /> Max mulige point: ${totalPoints}`;
  grade.innerHTML = `Dette svarer til ${calcGrade(userPoints, totalPoints)} på 7-trinsskalen`;
  pointText.style.backgroundColor = 'grey';
  document.body.appendChild(container);
  pointCounter.appendChild(pointText);
  container.appendChild(pointCounter);
  container.appendChild(grade);
};
