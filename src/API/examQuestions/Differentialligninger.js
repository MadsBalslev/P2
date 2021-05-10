const { randNum } = require('../../helper');

/**
 * Represents a differential equation exercise.
 * @constructor 
 */
function DifferentialLigningExercise() {
  const { A, B, C, D } = diffLigningVars();
  this.txt = 'Find den fuldstændige løsning til differentialligningen.';
  this.type = 'differentialligning';
  this.point = 10;
  this.tegn = '';
  this.exerciseVars = { Differentialligning: `f'(x)=${A}x^3+${B}x^2-${C}x+${D}` };
  this.facit = differentialLigningFacit(A, B, C, D);
  this.print = () => {
    console.log(this.txt, this.type, this.point, this.tegn, this.exerciseVars, this.facit);
  };
}

/**
 * Represents a differential equation exercise.
 * @constructor 
 */
function DifferentialLigningExercise2() {
  const { A, B, C, D } = diffLigningVars();
  this.txt = 'Find den fuldstændige løsning til differentialligningen.';
  this.type = 'differentialligning';
  this.point = 10;
  this.tegn = '';
  this.exerciseVars = { Differentialligning: `f'(x)=${A}x^3-${B}x^2-${C}x-${D}` };
  this.facit = differentialLigning2Facit(A, B, C, D);
  this.print = () => {
    console.log(this.txt, this.type, this.point, this.tegn, this.exerciseVars, this.facit);
  };
}
/**
 * Represents a differential equation exercise.
 * @constructor 
 */
function DifferentialLigningExercise3() {
  const { A, B, C } = diffLigningVars();
  this.txt = 'Find den fuldstændige løsning til differentialligningen.';
  this.type = 'differentialligning';
  this.point = 10;
  this.tegn = '';
  this.exerciseVars = { Differentialligning: `f'(x)=${A}cos(${B}x+${C})` };
  this.facit = differentialLigning3Facit(A, B, C);
  this.print = () => {
    console.log(this.txt, this.type, this.point, this.tegn, this.exerciseVars, this.facit);
  };
}

/**
 * 
 * @returns four random numbers, A, B, C, D where 4 ≤ A, 3 ≤ B, 2 ≤ C and 1 ≤ D.
 */
const diffLigningVars = () => {
  const A = randNum(8) + 4;
  const B = randNum(8) + 3;
  const C = randNum(8) + 2;
  const D = randNum(15) + 1;

  return { A, B, C, D };
};

/**
 * Calculates the facit for the first diffLigningExercise.
 * @param {number} A 
 * @param {number} B 
 * @param {number} C 
 * @param {number} D 
 * @returns facit for the first diffLigningExercise.
 */
const differentialLigningFacit = (A, B, C, D) => {
  const Af = A / 4;
  const Bf = B / 3;
  const Cf = C / 2;
  const Df = D;

  const diffFacit = `f(x)=${Af}x^4+${Bf}x^3-${Cf}x^2+${Df}x+C`;
  return diffFacit;
};

/**
 * Calculates the facit for the second diffLigningExercise.
 * @param {number} A 
 * @param {number} B 
 * @param {number} C 
 * @param {number} D 
 * @returns facit for the sceond diffLigningExercise.
 */
const differentialLigning2Facit = (A, B, C, D) => {
  const Af = A / 4;
  const Bf = B / 3;
  const Cf = C / 2;
  const Df = D;

  const diffFacit = `f(x)=${Af}x^4-${Bf}x^3-${Cf}x^2-${Df}x+C`;
  return diffFacit;
};

/**
 * Calculates the facit for the third diffLigningExercise.
 * @param {number} A 
 * @param {number} B 
 * @param {number} C 
 * @param {number} D 
 * @returns facit for the third diffLigningExercise.
 */
const differentialLigning3Facit = (A, B, C) => {
  const Af = A / B;
  const Bf = B;
  const Cf = C;

  const diffFacit = `f(x)=${Af}xsin(${Bf}x+${Cf})+C`;
  return diffFacit;
};

const numOfTasks = 3;
module.exports = {
  DifferentialLigningExercise,
  differentialLigningFacit,
  DifferentialLigningExercise2,
  differentialLigning2Facit,
  DifferentialLigningExercise3,
  differentialLigning3Facit,
  numOfTasks,
};
