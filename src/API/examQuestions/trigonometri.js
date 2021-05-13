const math = require('mathjs');
const { randNum } = require('../../helper');
/**
 * Generates random variables for a SinusExercise
 * @param a first variable in the exercise
 */
function sinusGenerateVars() {
  let a = randNum(5) + 1;
  let b = randNum(5) + 1;
  return {a, b};
}

/**
 * Generates a random variable from range 0-271
 * @return {integer} Returns the random-generated integer.
 */
function tangensGeneratevars() {
 let a = randNum(270) + 1;
 return a
}

/**
 * Generates a sinus exercise
 * @constructor
 */
function SinusExercise(){
  const {a, b} = sinusGenerateVars();
  this.txt = "udregn sinus til 1 decimal hvis relevant. Udregnes i radianer";
  this.type = "trigonometri"
  this.point = 5;
  this.tegn ='';
  this.exerciseVars = {trigonometri: `\\sin(\\dfrac{ ${a} \\pi }{ ${b} })`};
  this.facit = sinusFacit(a,b);
}

/**
 * Calculates facit of given SinusExercise
 * @param a the first variable in the exercise
 * @param b the second variable in the exercise
 * @returns {String} The correct answer to the given variables.
 */
function sinusFacit(a, b) {
  let facit;
  facit = Math.sin((a*3.14)/b);
  if (facit === 0 || (facit < 0.005 && facit > -0.005)) {
    facit = 0;
    return String(facit);
  }

  else {
    facit = math.round(facit,3);
    return String(facit);
  }
}

/**
 * Generates a tan exercise
 * @constructor
 */
function TangensExercise() {
  const a = tangensGeneratevars();
  this.txt = "Udregn tangens i radianer";
  this.type = "trigonometri";
  this.point = 5;
  this.tegn = '';
  this.exerciseVars = {trigonometri: `tan ${a}`}
  this.facit = tangensFacit(a);
}

/**
 * Calculates facit of a Tan
 * @param a Variable from the generated exercise used to calculate the correct answer.
 * @return {String} The correct answer to the given variables.
 */
function tangensFacit(a) {
  let facit = math.round(math.tan(a),2);
  return String(facit);

}
const numOfTasks = 2;

module.exports = {
    SinusExercise,
    TangensExercise,
    tangensFacit,
    sinusFacit,
    numOfTasks,
  };
