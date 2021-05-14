// const math = require('mathjs');
const { randNum } = require('../../helper');
const { round2Dec } = require('../../helper');

/**
 * Generates random numbers
 * @return {{A: number, B: number, C: number}} Returns the randomly generated numbers.
 */
const generateVars = () => {
  const A = randNum(10) + 1; // 5x
  const B = randNum(35); // 13
  const minNum = A + B;
  const C = randNum(40) + minNum;

  return { A, B, C };
};

/**
 * Represents a algebra equation exercise.
 * @constructor
 */
function LigningPlusExercise() {
  const { A, B, C } = generateVars();
  this.txt = 'Find x i følgende ligning.';
  this.type = 'ligninger';
  this.point = 5;
  this.tegn = '+';
  this.exerciseVars = { ligning: `${A}x + ${B} = ${C}` };
  this.facit = LigningFacit(A, B, C, this.tegn);
}

/**
 * Represents a subtraction equation exercise.
 * @constructor
 */
function LigningMinusExercise() {
  const { A, B, C } = generateVars();
  this.txt = 'Find x i følgende ligning.';
  this.type = 'ligninger';
  this.point = 5;
  this.tegn = '-';
  this.exerciseVars = { ligning: `${A}x - ${B} = ${C}` };
  this.facit = LigningFacit(A, B, C, this.tegn);
}

/**
 * Calculates the variables and returns the correct answer
 *
 * @param {number} A Randomly generated variable
 * @param {number} B Randomly generated variable
 * @param {number} C Randomly generated variable
 * @param {string} symbol The symbol chosen by exercise
 * @return {string} Returns the correct answer
 */
const LigningFacit = (A, B, C, symbol) => {
  let ansFixed;

  if (symbol === '+') {
    const answer = (C - B) / A;
    ansFixed = round2Dec(answer);
  } else if (symbol === '-') {
    const answer = (C + B) / A;
    ansFixed = round2Dec(answer);
  }

  return `${ansFixed}`;
};

const numOfTasks = 2;

module.exports = {
  LigningPlusExercise,
  LigningMinusExercise,
  LigningFacit,
  numOfTasks,
};
