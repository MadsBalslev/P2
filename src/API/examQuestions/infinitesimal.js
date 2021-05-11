const math = require('mathjs');
const { randNum } = require('../../helper');

const generateVars = () => {
    const A = randNum(10) +1;
    const B = randNum(5) + 1;
    const C = randNum(10) + 1;
    return { A, B, C }
}

const generateVarsLow = () => {
  const A = randNum(5) + 1;
  const B = randNum(5) + 1;
  const C = randNum(3) + 1;
  return { A, B, C }
}

function RotatingBodyQuadraticExercise () {
  const { A, B, C } = generateVarsLow();
  this.txt = `Vi har en andengradspolynomie og vi ønsker at udregne integralet indenfor intervallet [0:${C}]`;
  this.type = 'infinitesimalregning';
  this.point = 5;
  this.tegn = '';
  this.exerciseVars = {ligning: `f(x) = ((${A}x) * (x - ${B}))^2`};
  this.facit = String(rotatingBodyQuadraticFacit(A, B, C));
}

function RotatingBodyExercise () {
  const { A, B, C } = generateVars();
  this.txt = `Vi har en kegle med en højde på ${A} og en radius på ${B}. Vi er interesseret i området [0;${C}]. Find volumen af keglen ved hjælp af formlen`;
  this.type = 'infinitesimalregning';
  this.point = 5;
  this.tegn = '';
  this.exerciseVars = {ligning: `\[ \\int_{a}^{b} (f(x)^2) \\,dx \]`};
  this.facit = String(rotatingBodyFacit(A, B, C));
}


const rotatingBodyQuadraticFacit = (A, B, C) => {
  const x = 'x';
  const diffExpression = math.derivative(`((${A}x)*(x-${B}))^2`, x).toString();
  const diffExpressionFloat = parseFloat(diffExpression);
  const lengthExpression = (Math.PI * (diffExpressionFloat)).toFixed(0);

  return lengthExpression;
}

const rotatingBodyFacit = (A, B, C) => {
  let x = 'x'
  const f = (B/A)^2;
  const diffExpression = math.derivative(f, x);
  const lengthExpression = Math.PI * (diffExpression)^2*C;


  return lengthExpression;
};


RotatingBodyQuadraticExercise();

const numOfTasks = 2;

module.exports = {
  numOfTasks,
  RotatingBodyExercise,
  RotatingBodyQuadraticExercise,
  rotatingBodyQuadraticFacit,
  rotatingBodyFacit,
};
