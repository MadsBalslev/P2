const math = require('mathjs');
const { randNum } = require('../../helper');

function sinusGenerateVars() {
  let a = randNum(5) + 1;
  let b = randNum(5) + 1;
  return {a, b};
}
function tangensGeneratevars() {
 let a = randNum(270) + 1;
 return a
}
tangensExercise();

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
    const facit = Math.sin((a*3.14)/b);
    if (facit === -0) facit = 0;
    return String(facit);
}
function tangensExercise() {
  const a = tangensGeneratevars();
  this.txt = "find tangens til følgende vinkel til 2 decimaler";
  this.type = "trigonometri";
  this.point = 5;
  this.tegn = '';
  this.exerciseVars = {trigonometri: `tan ${a}`}
  this.facit = tangensFacit(a);
}

function tangensFacit(a) {
  facit = math.round(math.tan(math.unit(a,'deg')),2);
  return String(facit);

}
const numOfTasks = 2;

module.exports = {
    SinusExercise,
    tangensExercise,
    tangensFacit,
    sinusFacit,
    numOfTasks,
  };
