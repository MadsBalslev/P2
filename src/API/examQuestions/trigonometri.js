const math = require('mathjs');
const { randNum } = require('../../helper');

function sinusGenerateVars(){
  let a = randNum(5);
  let b = randNum(5);
  return {a, b};
}


function SinusExercise(){
  const {a, b} = sinusGenerateVars();
  this.txt = "udregn sinus til 1 decimal hvis relevant";
  this.type = "trigonometri"
  this.point = 5;
  this.tegn ='';
  this.exerciseVars = { trigonometri: `sin${a}pi/${b}`}
  this.facit = sinusFacit(a,b);
}

function sinusFacit(a, b) {
    const facit = Math.sin((a*Math.PI)/b);
    if (facit === -0) facit = 0;
    return String(facit);
}

const numOfTasks = 1;

module.exports = {
    SinusExercise,
    sinusFacit,
    numOfTasks,
  };
