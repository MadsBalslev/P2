const math = require('mathjs');
const { randNum } = require('../../helper');


const generateVars = () => {   
  const A = randNum(100) + 1;
  const B = randNum(75) + 1;

  return { A, B };
}

function confidenceIntervalExercise () {
  const { A, B } = generateVars();
  this.txt = `En klasse af 3.g elever ${A} har stemt om de var klar til matematik eksamen og ${B} har stemt ja. Bestem nu sandsynlighedsparameteren og bagefter brug det til at finde 95%-konfidensintervallet`;
  this.type = 'statistik';
  this.point = 5;
  this.tegn = '';
  this.exerciseVars = { ligning: 'middelværdi - 1.96*sqrt((middelværdi*(1-middelværdi)/n) ; middelværdi + 1.96*sqrt((middelværdi*(1-middelværdi)/n)'};
  this.facit = confidenceIntervalFacit(A, B);
}


const confidenceIntervalFacit = (A, B) => {
  
  let confidenceinterval1;
  let confidenceinterval2;
  let sqrt;
  const middelværdi = (B / A);
  const n = (A + B);

  sqrt = math.sqrt((middelværdi * (1 - middelværdi)/n)).toFixed(5);
  confidenceinterval1 = (middelværdi - 1.96 * sqrt).toFixed(2);
  confidenceinterval2 = (middelværdi + 1.96 * sqrt).toFixed(2);

  return `[${confidenceinterval1};${confidenceinterval2}]`;
}

const numOfTasks = 1;


module.exports = {
  numOfTasks,
  confidenceIntervalFacit,
  confidenceIntervalExercise,
}