const { derivative, concat } = require('mathjs');
const math = require('mathjs');
const { randNum } = require('../../helper');


 partielDifferentiationExercise();
 rangeExercise();


 /**
 * Will create excercise about differentating towards x or y in a two variable function
 * @param {math.parse} expression Takes the expression for differentiating
 * @param {math.parse} fx First part of the function, with x
 * @param {math.parse} fy Second part of the function, with y
 * @return {any[]} The function returns a generated excercise set as an array, based on the two
 * input parameters.
 */
function partielDifferentiationExercise () {
  const fy = math.parse('3*y+2y');
  const fx = math.parse('4*x+4x');
  const expression = math.parse('x');

  console.log(`Opgave 2: ${fx} + ${fy} `);
  console.log(math.derivative(fx, expression).evaluate());
}


function rangeExercise() {
    const x = math.parse('0');
    const y = math.parse('9');
    const c = math.parse('90');
    console.log(`opgave: ${c} - ${x} - ${y} `);
    console.log(math.sqrt(c - y - x));
}
