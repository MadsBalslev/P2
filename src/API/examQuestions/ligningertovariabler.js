const { derivative, concat } = require('mathjs');
const math = require('mathjs');
const { randNum } = require('../../helper');

const generateVars = () => {
  const A = randNum(10) + 1;
  const B = randNum(4);
  const C = randNum(10) + 2;
  const D = randNum(4);

  return { A, B, C, D };
}

const generateExpression = () => {
  let i = randNum(2);

  if (i = 1) {
    return x;
  }
  else return y;
}

function partielDifferentiationExercise () {
  const { A, B, C, D } = generateVars();
  const expression = generateExpression();
  this.txt = (`Differientier i forhold til ${expression} i følgende to variabel funktion.`);
  this.type = 'funktionerAfToVariable';
  this.point = 5;
  this.tegn = '';
  this.exerciseVars = { ligning: `${A}x + x^${B} + ${C}y + y^${D}` };
  this.facit = partielDifferentiationFacit(A, B, C, D, expression);
}


const partielDifferentiationFacit = (A, B, C, D, expression) => {
  const parser = math.parser();

  A = parser.set('A',A);
  B = parser.set('B',B);
  C = parser.set('C',C);
  D = parser.set('D',D);
  f = math.parse('A*x+(x^B)+C*y+(y^D)');

  math.derivative(f, expression).toString();
}

rangeExercise();

function rangeExercise() {
    const unknowns = 9;
    console.log(unknowns);
    const x = math.parse('x');
    const y = math.parse('y');
    const c = 81 ;
    console.log(`opgave: ${c} - ${unknowns}y^2 - ${unknowns}x^2 `);
    console.log(math.sqrt(c/unknowns));
}

const numOfTasks = 1;

module.exports = {
  partielDifferentiationExercise,
  partielDifferentiationFacit,
  rangeExercise,
  numOfTasks,
};
