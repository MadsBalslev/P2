// const math = require('mathjs');
const { randNum } = require('../../helper');

const generateVars = () => {
  const A = randNum(10) + 1; // 5x
  const B = randNum(35); // 13
  const minNum = A + B;
  const C = randNum(40) + minNum;

  return { A, B, C };
};

function LigningPlusExercise() {
  const { A, B, C } = generateVars();
  this.txt = 'Find x i følgende ligning.';
  this.type = 'ligninger';
  this.point = 5;
  this.tegn = '+';
  this.exerciseVars = { ligning: `${A}x + ${B} = ${C}` };
  this.facit = LigningFacit(A, B, C, this.tegn);
}

function LigningMinusExercise() {
  const { A, B, C } = generateVars();
  this.txt = 'Find x i følgende ligning.';
  this.type = 'ligninger';
  this.point = 5;
  this.tegn = '-';
  this.exerciseVars = { ligning: `${A}x - ${B} = ${C}` };
  this.facit = LigningFacit(A, B, C, this.tegn);
}

const LigningFacit = (A, B, C, symbol) => {
  if (symbol === '+') {
    const answer = (C - B) / A;
    const ansFixed = answer.toFixed(1);
    return `${ansFixed}`;
  } else if (symbol === '-') {
    const answer = (C + B) / A;
    const ansFixed = answer.toFixed(1);
    return `${ansFixed}`;
  }

  return '';
};

const numOfTasks = 2;

module.exports = {
  LigningPlusExercise,
  LigningMinusExercise,
  LigningFacit,
  numOfTasks,
};
