const { randNum } = require('../../helper');
let Fraction = require('fractional').Fraction

(new Fraction(7,3)).multiply(new Fraction(1,2)).toString();



function differentialLigningExercise() {
  const { A, B, C, D } = diffLigningVars();
  this.txt = 'Find den fuldstændige løsning til differentialligningen.';
  this.type = 'differentialligning';
  this.point = 10;
  this.tegn = '';
  this.exerciseVars = { Differentialligning: `f'(x)=${A}x^3+${B}x^2-${C}x+${D}`};
  this.facit = differentialLigningFacit(A, B, C, D);
  this.print = () => {
    console.log(this.txt, this.type, this.point, this.tegn, this.exerciseVars, this.facit);
  }
}

const diffLigningVars = () => {
  const A = randNum(8) + 4;
  const B = randNum(8) + 3;
  const C = randNum(8) + 2;
  const D = randNum(15) + 1;

  return { A, B, C, D }
}

const differentialLigningFacit = (A, B, C, D) => {
  let Af = A / 4;
  let Bf = B / 3;
  let Cf = C / 2;
  let Df = D;
  
  
  const diffFacit = `f(x)=${Af}x^4+${Bf}x^3-${Cf}x^2+${Df}x+C`
  return diffFacit;
}


let a = new differentialLigningExercise();

a.print();

const numOfTasks = 1;
module.exports = {
    differentialLigningExercise,
    numOfTasks,
};