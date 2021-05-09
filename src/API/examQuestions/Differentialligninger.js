const { randNum } = require('../../helper');
const { Fraction } = require('fractional');

function differentialLigningExercise() {
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

function differentialLigningExercise2() {
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

function differentialLigningExercise3() {
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

const diffLigningVars = () => {
  const A = randNum(8) + 4;
  const B = randNum(8) + 3;
  const C = randNum(8) + 2;
  const D = randNum(15) + 1;

  return { A, B, C, D };
};

const differentialLigningFacit = (A, B, C, D) => {
  const Af = A / 4;
  const Bf = B / 3;
  const Cf = C / 2;
  const Df = D;

  const diffFacit = `f(x)=${Af}x^4+${Bf}x^3-${Cf}x^2+${Df}x+C`;
  return diffFacit;
};

const differentialLigning2Facit = (A, B, C, D) => {
  const Af = A / 4;
  const Bf = B / 3;
  const Cf = C / 2;
  const Df = D;

  const diffFacit = `f(x)=${Af}x^4-${Bf}x^3-${Cf}x^2-${Df}x+C`;
  return diffFacit;
};

const differentialLigning3Facit = (A, B, C) => {
  const Af = A / B;
  const Bf = B;
  const Cf = C;

  const diffFacit = `f(x)=${Af}xsin(${Bf}x+${Cf})+C`;
  return diffFacit;
};

let a = new differentialLigningExercise();

a.print();

const numOfTasks = 3;
module.exports = {
  differentialLigningExercise,
  differentialLigningFacit,
  differentialLigningExercise2,
  differentialLigning2Facit,
  differentialLigningExercise3,
  differentialLigning3Facit,
  numOfTasks,
};
