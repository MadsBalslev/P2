const math = require('mathjs');
const { randNum } = require('../../helper');

const generateVars = () => {
    const A = randNum(10) +1;
    const B = randNum(5) + 1;
    const C = randNum(10) + 1;
    return { A, B, C }
}



function rotatingBodyExercise () {
  const { A, B, C } = generateVars();
  this.txt = `Differientier i forhold til ${expression} i følgende to variabel funktion.`;
  this.type = 'infinitesimalregning';
  this.point = 5;
  this.tegn = '';
  this.exerciseVars = { ligning: `${A}x + x^${B} + ${C}y + y^${D}` };
  this.facit = String(partielDifferentiationFacit(A, B, C, D, expression));
}


const rotatingBodyFacit = (A, B, C) => {
  diffExpression = math.derivative()
};