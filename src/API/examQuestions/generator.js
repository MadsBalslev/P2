require('dotenv').config();
const {
  randNum,
} = require('../../helper');

const vectors = require('./vector');
const vector3d = require('./vector3d');
const integrals = require('./integral');
const ligninger = require('./ligninger');
const diffligning = require('./Differentialligninger');
const funktionerAfToVariable = require('./ligningertovariabler');
const statistik = require('./statistics');
const trigonometri = require ('./trigonometri');

/**
 * Will generate an exerciseset with the given catagories
 * @param {string[]} categories An array containg the catagories of exercises to be generated
 * @param {integer} amount The amount of exercises to be generated in each catagory
 * @return {any[]} The function returns a generated excercise set as an array, based on the two
 * input parameters.
 */
const generateExcerciseSet = (categories, amount) => {
  const set = [];

  categories.forEach((catagory) => {
    for (let i = 0; i < amount; i++) {
      switch (catagory) {
        case 'vektor2d':
          set.push(generateVectorExercise(amount));
          break;
        case 'vektor3d':
          set.push(generateVector3dExercise(amount));
          break;
        case 'integralregning':
          set.push(generateIntegralExercise(amount));
          break;
        case 'ligninger':
          set.push(generateLigningExercise(amount));
          break;
        case 'differentialligning':
          set.push(generateDiffLigningExercise(amount));
          break;
        case 'funktionerAfToVariable':
          set.push(generateFunktionerAfToVariableExercise(amount));
          break;
        case 'statistik':
          set.push(generateStatistikExercise(amount));
          break;
        case 'trigonometri':
          set.push(generateTrigonometriExercise(amount));
          break;
        default:
          break;
      }
    }
  });

  global.globalSet = set;
  return set;
};

/**
 * This function randomly generates a vector exercise and returns it.
 * @return {object} Returns the generated exercise object.
 */
const generateVectorExercise = () => {
  let exercise;
  const rand = randNum(vectors.numOfTasks);
  switch (rand) {
    case 1:
      exercise = new vectors.VektorAdditionExercise();
      break;
    case 2:
      exercise = new vectors.VektorSubtractionExercise();
      break;
    case 3:
      exercise = new vectors.VektorMultiplicationExercise();
      break;
    default:
      break;
  }

  return exercise;
};

/**
 * This function randomly generates a vector exercise and returns it.
 * @return {object} Returns the generated exercise object.
 */
const generateVector3dExercise = () => {
  let exercise;
  const rand = randNum(vectors.numOfTasks);
  switch (rand) {
    case 1:
      exercise = new vector3d.VektorAdditionExercise();
      break;
    case 2:
      exercise = new vector3d.VektorSubtractionExercise();
      break;
    case 3:
      exercise = new vector3d.VektorMultiplicationExercise();
      break;
    default:
      break;
  }

  return exercise;
};

/**
 * This function randomly generates a undefined integral exercise and returns it.
 * @return {object} Returns the generated exercise object.
 */
const generateIntegralExercise = () => {
  let exercise;
  const rand = randNum(integrals.numOfTasks);
  switch (rand) {
    case 1:
      exercise = new integrals.PowerIntegralExercise();
      break;
    case 2:
      exercise = new integrals.TrigonometricIntegralExercise();
      break;
    default:
      break;
  }
  return exercise;
};

/**
 * This function randomly generates an equation exercise and returns it.
 * @return {object} Returns the generated exercise object.
 */
const generateLigningExercise = () => {
  let exercise;
  const rand = randNum(ligninger.numOfTasks);
  switch (rand) {
    case 1:
      exercise = new ligninger.LigningPlusExercise();
      break;
    case 2:
      exercise = new ligninger.LigningMinusExercise();
      break;
    default:
      break;
  }
  return exercise;
};

/**
 * This function randomly generates a differential equation exercise and returns it.
 * @return {object} Returns the generated exercise object.
 */
const generateDiffLigningExercise = () => {
  let exercise;
  const rand = randNum(diffligning.numOfTasks);
  switch (rand) {
    case 1:
      exercise = new diffligning.DifferentialLigningExercise();
      break;
    case 2:
      exercise = new diffligning.DifferentialLigningExercise2();
      break;
    case 3:
      exercise = new diffligning.DifferentialLigningExercise3();
      break;
    default:
      break;
  }
  return exercise;
};

const generateFunktionerAfToVariableExercise = () => {
  let exercise;
  const rand = randNum(funktionerAfToVariable.numOfTasks);
  switch (rand) {
    case 1:
      exercise = new funktionerAfToVariable.PartielDifferentiationExercise();
      break;
    case 2:
      exercise = new funktionerAfToVariable.RangeExercise();
      break;
    default:
      break;
  }
  return exercise;
};

const generateStatistikExercise = () => {
  let exercise;
  const rand = randNum(statistik.numOfTasks);
  switch (rand) {
    case 1:
      exercise = new statistik.BinormalConfidenceIntervalExercise();
      break;
    case 2:
      exercise = new statistik.NormalConfidenceIntervalExercise();
      break;
    default:
      break;
  }
  return exercise;
};

const generateTrigonometriExercise = () => {
  let exercise;
  const rand = randNum(trigonometri.numOfTasks);
  switch (rand) {
    case 1:
      exercise = new trigonometri.SinusExercise();
      break;
    case 2:
      exercise = new trigonometri.TangensExercise();
      break;
    default:
      break;
  }
  return exercise;
}

module.exports = {
  generateExcerciseSet,
};
