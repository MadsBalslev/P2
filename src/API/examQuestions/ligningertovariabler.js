const math = require('mathjs');
const { randNum } = require('../../helper');
/**
 * returns the facit of a rangeExercise question
 * @param unknowns the amount of x^2 and y^2 variables in the question
 * @param c the whole number in the question
 * @returns facit for a rangeExercise
 */
const rangeFacit = (unknowns, c) => math.sqrt(c / unknowns);

/**
 * Generates variables for exercises
 * @returns {{}} An object containing the variables
 */
const generateVars = () => {
  const A = randNum(10) + 1;
  const B = randNum(4);
  const C = randNum(10) + 2;
  const D = randNum(4);

  return {
    A, B, C, D,
  };
};

/**
 * Generates x or y randomly for the exercises.
 * @returns {variable}
 */
const generateExpression = () => {
  const i = randNum(2);

  if (i === 1) {
    return 'x';
  }

  return 'y';
};

/**
 * Construct for exercise, so it can make a new exercise when called.
 * @constructor
 */
function PartielDifferentiationExercise() {
  const {
    A, B, C, D,
  } = generateVars();
  const expression = generateExpression();
  this.txt = `Differientier i forhold til ${expression} i følgende to variabel funktion.`;
  this.type = 'funktionerAfToVariable';
  this.point = 5;
  this.tegn = '';
  this.exerciseVars = { ligning: `${A}x + x^${B} + ${C}y + y^${D}` };
  this.facit = String(partielDifferentiationFacit(A, B, C, D, expression));
}

/**
 * Controls the correct answer for exercise, so when calls it will be calculated.
 * @param A Random generated variable for exercise
 * @param B Random generated variable for exercise
 * @param C Random generated variable for exercise
 * @param D Random generated variable for exercise
 * @param expression Random generated expression, which is either x or y, for the exercise
 */
const partielDifferentiationFacit = (A, B, C, D, expression) => {
  const f = (`${A}x+(x^${B})+${C}y+(y^${D})`);

  const facit = math.derivative(f, expression).toString();
  return facit;
};

/**
 * constructor function for rangeexercise
 * @constructor
 */
function RangeExercise() {
  let c;
  let unknowns;
  let facit;
  do {
    unknowns = Math.floor(Math.random() * (10 - 2) + 2);
    c = unknowns * Math.floor(Math.random() * (10 - 1) + 1);
    facit = rangeFacit(unknowns, c);
  } while (wholeNumberCheck(facit) === false);
  this.txt = 'bestem maksimumværdien af følgende 2 variabel funktion';
  this.type = 'funktionerAfToVariable';
  this.point = 5;
  this.tegn = '';
  this.exerciseVars = { ligning: `\\sqrt{${c} - ${unknowns}x^2 - ${unknowns}y^2}` };
  this.facit = String(rangeFacit(unknowns, c));
}

/**
 * Checks if given number is a whole or decimal number
 * @param number number to be checked if whole or decimal
 * @returns boolean value thats true if number is whole
 */
function wholeNumberCheck(number) {
  const result = (number - Math.floor(number)) !== 0;
  if (result) return false;
  return true;
}

const numOfTasks = 2;

module.exports = {
  PartielDifferentiationExercise,
  partielDifferentiationFacit,
  RangeExercise,
  rangeFacit,
  numOfTasks,
};
