const { randNum } = require('../../helper');

/**
 * Represents a power integral exercise.
 * @constructor
 */
function PowerIntegralExercise() {
  const { A, B, C } = generateVariablesForPowerIntegralExercise();
  this.txt = 'Udregn det følgende ubestemte integral.';
  this.type = 'integralregning';
  this.point = 10;
  this.tegn = '';
  this.exerciseVars = { integral: `${A}x^3+${B}x^2+${C}x` };
  this.facit = getPowerIntegralFacit(A, B, C);
}

/**
 * @returns three random numbers A, B, C where 0 ≤ A ≤ 40, 0 ≤ B ≤ 40 and 3 !divides B,
 * 0 ≤ C ≤ 70.
 */
function generateVariablesForPowerIntegralExercise() {
  let B;
  while (B % 3 !== 0) B = randNum(40);
  const A = randNum(40);
  const C = randNum(70);
  return { A, B, C };
}

/**
 * Calculates the facit for a powerIntegralExercise.
 * @param {number} A
 * @param {number} B
 * @param {number} C
 * @returns facit for a powerIntegralExercise.
 */
const getPowerIntegralFacit = (A, B, C) => {
  const facitA = (A / 4);
  const facitB = (B / 3);
  const facitC = (C / 2);

  const integralFacit = `f(x) = ${facitA}x^4+${facitB}x^3+${facitC}x^2+K`;
  return integralFacit;
};

/**
 * Represents a trigonometric integral exercise.
 * @constructor
 */
function TrigonometricIntegralExercise() {
  const { A, B } = generateVariablesForTrigonometricIntergralExercise();
  this.txt = 'Udregn det følgende ubestemte integral.';
  this.type = 'integralregning';
  this.point = 15;
  this.tegn = '';
  this.exerciseVars = { integral: `${A}cos(${B}x)` };
  this.facit = getTrigonometricIntegralFacit(A, B);
}

/**
 * @returns two random numbers A, B.
 */
function generateVariablesForTrigonometricIntergralExercise() {
  const A = randNum(12) + 2;
  let B = randNum(7);
  if (B % 2 === 0) {
    B++;
  }
  return { A, B };
}

/**
 * Calculates the facit for a TrigonometricIntegralExercise.
 * @param {number} A
 * @param {number} B
 * @returns facit for a TrigonometricIntegralExercise.
 */
const getTrigonometricIntegralFacit = (A, B) => {
  let integralFacit;
  let into;
  let tempB;

  if (A === B) {
    integralFacit = `f(x) = sin(${B}x)+K`;
  } else if (A === 1) {
    integralFacit = `f(x) = sin(${B}x)/(${B}+K`;
  } else if (B === 1) {
    integralFacit = `f(x) = ${A}sin(x)+K`;
  } else if (A % B === 0) {
    into = A / B;
    tempB = B % A;
    integralFacit = `f(x) = ${into}sin(${tempB}x)+K`;
  } else {
    integralFacit = `f(x) = ${A}sin(${B}x)/${B}+K`;
  }

  return integralFacit;
};

// m.i.s
// const f = math.parse('18x^7+10x^6-3x^5+x^4-19x^3+2x^2-x+10');
// const x = math.parse('x');
// const fm = math.derivative(f, x);

// console.log('f(x) =', f.toString());
// console.log("f'(x) =", fm.toString());

/**
 * Number of integral exercises.
 */
const numOfTasks = 2;

module.exports = {
  PowerIntegralExercise,
  getPowerIntegralFacit,
  TrigonometricIntegralExercise,
  getTrigonometricIntegralFacit,
  numOfTasks,
};
