const math = require('mathjs');
const { randNum } = require('../../helper');

/**
 * Generates a array with randomly generated numbers and the size of the array.
 * @return {array} Returns array with numbers.
 * @return {variable} Returns the size of the aary
 */
const generateArray = () => {
  const i = randNum(40) + 1;
  const numbers = Array.from({ length: i }, () => Math.floor(Math.random(99) * i + 1));

  return { numbers, i };
};
/**
 * Generates the standard deviation
 * @return {number} Returns the standard deviation.
 */
const generateAfgivelse = () => {
  const afgivelse = randNum(10) + 1;

  return afgivelse;
};

/**
 * Generates randomly generated numbers, that can´t be 0
 * @return {variables} Returns the randomly generated numbers.
 */
const generateVars = () => {
  const A = randNum(75) + 1.01;
  const B = randNum(50) + 1.01;

  return { A, B };
};

/**
 * Used for making it possible to sum up entire array, but adding up all numbers
 * @return {math.Matrix} Returns the accumulator which is +.
 */
function add(accumulator, a) {
  return accumulator + a;
}

/**
 * Represents a exercise of bionormal confidence-interval
 * @constructor
 */
function BinormalConfidenceIntervalExercise() {
  const { A, B } = generateVars();
  this.txt = `En klasse har ${A} elever har svaret på et spørgeskema og ${B} har stemt ja på spørgeskemaet. Bestem nu sandsynlighedsparameteren og bagefter brug det til at finde 95%-konfidensintervallet`;
  this.type = 'statistik';
  this.point = 5;
  this.tegn = '';
  this.exerciseVars = { ligning: '\\hat{p} - 1.96 * \\sqrt{\\hat{p}*(1-\\hat{p})/n} ; \\hat{p} + 1.96* \\sqrt{\\hat{p}*(1-\\hat{p})/n}' };
  this.facit = binormalConfidenceIntervalFacit(A, B);
}

/**
 * Represents a exercise of normal confidence-interval
 * @constructor
 */
function NormalConfidenceIntervalExercise() {
  const { numbers, i } = generateArray();
  const afgivelse = generateAfgivelse();
  this.txt = `En klasse har svaret på et spørgeskema omkring hvor mange timer de på deres mobil, hvor ${i} elever har svaret på testen. Standard afgivelsen er ${afgivelse}. Udregn middelværdien og bagefter bestem 95%-konfidensintervallet`;
  this.type = 'statistik';
  this.point = 5;
  this.tegn = '';
  this.exerciseVars = { Testresultat: `${numbers}` };
  this.facit = normalConfidenceIntervalFacit(numbers, i, afgivelse);
}

/**
 * Generates a vector, and puts in a matrix
 * @param {array} numbers The array of randomly generated numbers
 * @param {variable} i The size of the array
 * @param {variable} afgivelse The standard deviation
 * @return {facit} Returns the interval and correct answer for the exercise
 */
const normalConfidenceIntervalFacit = (numbers, i, afgivelse) => {
  const sum = numbers.reduce(add, 0);

  const middelværdi = (sum / i);
  const sqrt = math.sqrt(i).toFixed(3);
  const confidenceinterval1 = (middelværdi - 1.96 * (afgivelse / sqrt)).toFixed(2);
  const confidenceinterval2 = (middelværdi + 1.96 * (afgivelse / sqrt)).toFixed(2);

  return `[${confidenceinterval1};${confidenceinterval2}]`;
};

/**
 * Generates a vector, and puts in a matrix
 * @param {variable} A The first randomly generated number
 * @param {variable} B The second randomly generated number
 * @return {facit} Returns the interval and correct answer for the exercise
 */
const binormalConfidenceIntervalFacit = (A, B) => {
  const middelværdi = (B / A);
  const n = (A + B);

  const sqrt = math.sqrt((middelværdi * ((1 - middelværdi) / n)));

  const confidenceinterval1 = parseFloat((middelværdi - 1.96 * sqrt).toFixed(2));
  const confidenceinterval2 = parseFloat((middelværdi + 1.96 * sqrt).toFixed(2));

  return `[${confidenceinterval1};${confidenceinterval2}]`;
};

const numOfTasks = 2;

module.exports = {
  numOfTasks,
  add,
  binormalConfidenceIntervalFacit,
  normalConfidenceIntervalFacit,
  BinormalConfidenceIntervalExercise,
  NormalConfidenceIntervalExercise,
};
