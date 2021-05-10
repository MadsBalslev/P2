/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const subjects = [
  {
    name: 'Vektor 2D',
    id: 'vektor2d',
  },
  {
    name: 'Vektor 3D',
    id: 'vektor3d',
  },
  {
    name: 'Integralregning',
    id: 'integralregning',
  },
  {
    name: 'Ligninger',
    id: 'ligninger',
  },
  {
    name: 'Differentialligninger',
    id: 'differentialligning',
  },
  {
    name: 'Statistik',
    id: 'statistik',
  },
  {
    name: 'Ligning af to variable',
    id: 'funktionerAfToVariable',
  },
];

const generateStartPage = () => {
  clearDom();

  const root = document.querySelector('#root');
  const form = document.createElement('form');
  const div = document.createElement('div');
  const br = document.createElement('br');
  const amountLabel = document.createElement('label');
  const amountInput = document.createElement('input');
  const submit = document.createElement('input');

  amountLabel.setAttribute('for', 'amount');
  amountLabel.innerHTML = 'Hvor mange opgaver vil du lave?';

  amountInput.setAttribute('type', 'number');
  amountInput.setAttribute('id', 'amount');

  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'Indsend');

  form.setAttribute('id', 'form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const exerciseSet = await getExerciseSetFromServer(event);
    buildExercisePage(exerciseSet);
  });
  div.setAttribute('id', 'emneVælger');

  subjects.forEach((subject) => {
    const label = generateSubjectLabel(subject);
    const input = generateSubjectInput(subject);

    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(br.cloneNode(true));
  });

  submit.addEventListener('click', () => {
    reset();
    start();
  });

  form.appendChild(div);
  form.appendChild(br.cloneNode(true));
  form.appendChild(amountLabel);
  form.appendChild(amountInput);
  form.appendChild(br.cloneNode(true));
  form.appendChild(submit);

  root.appendChild(form);
};

const generateSubjectLabel = (subject) => {
  const label = document.createElement('label');
  const { id } = subject;

  label.setAttribute('for', id.toLowerCase());
  label.innerHTML = subject.name;

  return label;
};

const generateSubjectInput = (subject) => {
  const input = document.createElement('input');
  const { id } = subject;

  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', id.toLowerCase());
  input.setAttribute('id', id.toLowerCase());

  return input;
};

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

  document.querySelector('#root').appendChild(exerciseForm);

  giveFormAction(exerciseSet);
};

/**
 * Clears the document
 */
const clearDom = () => {
  document.querySelector('#root').innerHTML = '';
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

/**
 * Function that takes the exerciseSet as a parameter and checks for correct answers.
 * @param {*} exerciseSet
 */
const generateResultPage = (exerciseSet) => {
  clearDom();
  checkAnswer(exerciseSet);
};

/**
 * Function that takes an exerciseSet as parameter,
   and calculates the maximum points available and the points achieved by the user.
 * @param {*} exerciseSet
 */
const calcUserStats = (exersiceSet) => {
  const maxPoints = {};
  const userStatsData = {};

  subjects.forEach((subject) => {
    maxPoints[subject.id] = 0;
    userStatsData[subject.id] = 0;
  });

  exersiceSet.forEach((exersice) => {
    maxPoints[exersice.type] += exersice.point;
    if (exersice.questionAnswers === exersice.facit) userStatsData[exersice.type] += exersice.point;
  });

  const AllData = {
    maxPoints,
    userStatsData,
  };

  console.log(AllData);

  return AllData;
};
/**
 * Function that creates html responsible for showing score in each subject.
 * @param {*} AllData
 * @param {*} container
 */
const createStatsDivs = (AllData, container) => {
  subjects.forEach((subject) => {
    if (AllData.maxPoints[subject.id] > 0) {
      const div = document.createElement('div');
      const txt = document.createElement('p');
      // eslint-disable-next-line max-len
      txt.innerHTML = `Indenfor ${subject.name} fik du: ${AllData.userStatsData[subject.id]} ud af ${AllData.maxPoints[subject.id]} point`;
      div.appendChild(txt);
      div.setAttribute('class', 'answer');
      container.appendChild(div);
    }
  });
};
/**
 * Function that creates html responsible for grade and score.
 * @param {*} container
 * @param {*} userPoints
 * @param {*} totalPoints
 */
const createGradeText = (container, userPoints, totalPoints) => {
  const pointCounter = document.createElement('div');
  const pointText = document.createElement('p');
  const grade = document.createElement('p');

  pointText.innerHTML = `Du fik: ${userPoints} Point <br /> Max mulige point: ${totalPoints}`;
  grade.innerHTML = `Dette svarer til ${calcGrade(userPoints, totalPoints)} på 7-trinsskalen`;
  pointText.style.backgroundColor = 'grey';

  pointCounter.appendChild(pointText);
  container.appendChild(pointCounter);
  container.appendChild(grade);
};

/**
   * Function that creates html responsible showing if question got answered correct or wrong.
   * @param {*} questionAnswer
   * @param {*} facit
   * @param {*} div
   */
const showQuestionResult = (questionAnswer, facit, div) => {
  const yourAnswer = document.createElement('p');
  yourAnswer.innerHTML = `Dit svar: ${questionAnswer}`;
  if (checkUserAnswerValue(questionAnswer, facit)) {
    yourAnswer.style.backgroundColor = 'green';
    yourAnswer.innerHTML = `a ${questionAnswer} <br /> Rigtigt!`;
    div.appendChild(yourAnswer);
  } else {
    yourAnswer.style.backgroundColor = 'red';
    yourAnswer.innerHTML = `Dit svar: ${questionAnswer} <br /> Forkert! <br /> Facit: ${facit}`;
    div.appendChild(yourAnswer);
  }
};
/**
 * Function calculating which grade user should get based on percentage of points
 * @param {*} points
 * @param {*} maxPoints
 */
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

/**
 * Function adding points.
 * @param {*} exercise
 * @param {*} userPoints
 */
const addPoints = (exercise, userPoints) => {
  if (exercise.questionAnswers === exercise.facit) {
    userPoints += exercise.point;
  }
  return userPoints;
};
/**
 * Function to check if user answer is equal to the facit.
 * @param {*} answer
 * @param {*} facit
 */
const checkUserAnswerValue = (answer, facit) => {
  if (answer === facit) {
    return true;
  }
  if (answer !== facit) {
    return false;
  }
  console.log('fejl i checkUserAnswerValue');

  return null;
};

/**
 * Function checks the entire exercise set answer and calls addPoints function for adding points.
 * @param {*} exerciseSet
 */
const checkAnswer = (exerciseSet) => {
  let userPoints = 0;
  let totalPoints = 0;

  const container = document.createElement('div');

  container.setAttribute('class', 'container');

  exerciseSet.forEach((exercise) => {
    totalPoints += exercise.point;

    userPoints = addPoints(exercise, userPoints);

    const div = document.createElement('div');
    const questionText = document.createElement('p');
    const questionType = document.createElement('p');

    div.setAttribute('class', 'answer');

    questionText.innerHTML = exercise.txt;
    questionType.innerHTML = `Spørgsmålstype: ${exercise.type}`;

    div.appendChild(questionText);
    addExerciseVars(exercise, div);
    div.appendChild(questionType);
    container.appendChild(div);

    showQuestionResult(exercise.questionAnswers, exercise.facit, div);
  });

  document.querySelector('#root').appendChild(container);
  AllData = calcUserStats(exerciseSet);

  createGradeText(container, userPoints, totalPoints);
  createStatsDivs(AllData, container);
};

generateStartPage();
