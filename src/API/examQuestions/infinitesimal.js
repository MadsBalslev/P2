const math = require('mathjs');
const { randNum } = require('../../helper');

const generateVars = () => {
    const A = randNum(10) +1;
    const B = randNum(5) + 1;
    const C = randNum(10) + 1;
    return { A, B, C }
}

function RotatingBodyExercise () {
  const { A, B, C } = generateVars();
  this.txt = `Vi har en kegle med en højde på ${A} og en radius på ${B}. Vi er interesseret i området [0;${C}]. Find volumen af keglen ved hjælp af formlen`;
  this.type = 'infinitesimalregning';
  this.point = 5;
  this.tegn = '';
  this.exerciseVars = '\\pi\\int_{a]^{b}(f(x))^2 \\dx';
  this.facit = String(rotatingBodyFacit(A, B, C));
}


const rotatingBodyFacit = (A, B, C) => {
  let x = 'x'
  const f = (B/A)^2;
  const diffExpression = math.derivative(f, x);
  const lengthExpression = Math.PI * (diffExpression)^2*C;
  
  return `pi*${lengthExpression}/4`;
};

const numOfTasks = 1;

module.exports = {
  numOfTasks,
  RotatingBodyExercise,
  rotatingBodyFacit,
};
