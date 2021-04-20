require('dotenv').config();
const {
  randNum,
} = require('../../helper');

const vectors = require('./vector');
const integrals = require('./integral');

const generateVectorExercise = () => {
  let result;
  const rand = randNum(vectors.numOfTasks);
  switch (rand) {
    case 1:
      result = new vectors.VektorAdditionExercise();
      break;
    case 2:
      result = new vectors.VektorSubtractionExercise();
      break;
    case 3:
      result = new vectors.VektorMultiplicationExercise();
      break;
    default:
      break;
  }

  return result;
};

const generateIntegralExercise = () => {
  let result;
  const rand = randNum(integrals.numOfTasks);
  switch (rand) {
    case 1:
      result = integrals.createPowerIntegral();
      break;
    case 2:
      result = integrals.createTrigonometricIntegral();
      break;
    default:
      break;
  }
  return result;
};

/**
 * Will generate an exerciseset with the given catagories
 * @param {string[]} categories An array containg the catagories of exercises to be generated
 * @param {integer} amount The amount of exercises to be generated in each catagory
 * @return {any[]} The function returns a generated excercise set as an array, based on the two input parameters.
 */
const generateExcerciseSet = (categories, amount) => {
  const set = [];

  categories.forEach((catagory) => {
    for (let i = 0; i < amount; i++) {
      switch (catagory) {
        case 'vektor2d':
          set.push(generateVectorExercise(amount));
          break;
        case 'integralregning':
          set.push(generateIntegralExercise(amount));
          break;
        default:
          break;
      }
    }
  });

  global.globalSet = set;
  return set;
};

module.exports = {
  generateExcerciseSet,
};
