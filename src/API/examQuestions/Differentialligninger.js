const { randNum } = require('../../helper');

/**
 * Represents a power integral exercise.
 * @constructor
 */
function PowerIntegralExercise() {
  const { A, B, C } = generateVariablesForPowerIntegralExercise();
  this.txt = 'Find den fulstændige løsning til differentialligningen.';
  this.type = 'differentialligning';
  this.point = 10;
  this.tegn = '';
  this.exerciseVars = { Differentialligning: `y' = ${B}y*(${A}-y)` };
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
  const facitA = A / 4;
  const facitB = B / 3;
  const facitC = C / 2;
  const integralFacit = `y = f(x) = ${facitA}/${facitB} + c*e^${facitC}*(${facitA})*x
    = ${facitA}/${facitB} + ce^-(${facitB}*${facitA})x`;
  return integralFacit;
};

const numOfTasks = 2;
module.exports = {
  PowerIntegralExercise,
  getPowerIntegralFacit,
  numOfTasks,
};
