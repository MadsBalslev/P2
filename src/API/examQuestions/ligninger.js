const math = require('mathjs');
const { randNum } = require('../../helper');

const generateVars = () => {
    const A = randNum(10) + 1; // 5x
    const B = randNum(35); // 13
    const minNum = A + B;
    const C = randNum(40) + minNum;

    return { A, B, C };
};

function LigningPlusExercise () {
    const { A, B, C} = generateVars();
    this.txt = 'Find x i følgende ligning.';
    this.type = 'ligninger';
    this.point = '5';
    this.tegn = '+';
    this.exerciseVars = { ligning: `${A}x + ${B} = ${C}` };
    this.facit = LigningFacit(A, B, C, this.tegn);
}

function LigningMinusExercise () {
    const { A, B, C } = generateVars();
    this.txt = 'Find x i følgende ligning.';
    this.type = 'ligninger';
    this.point = '5';
    this.tegn = '-';
    this.exerciseVars = { ligning: `${A}x - ${B} = ${C}` };
    this.facit = LigningFacit(A, B, C, this.tegn);
}

// const LigningPlusFacit = (A, B, C) => `x = ${(C - B) / A}`;
// const LigningMinusFacit = (A, B, C) => `x = ${(C + B) / A}`;

const LigningFacit = (A, B, C, symbol) => {
    if (symbol === '+') {
            let answer = (C - B) / A;
            let ansFixed = answer.toFixed(1);
            return `x = ${ansFixed}`}
    else if (symbol === '-') {
        let answer = (C + B) / A;
        let ansFixed = answer.toFixed(1);
        return `x = ${ansFixed}`}
}

const numOfTasks = 2;

module.exports = {
    LigningPlusExercise,
    LigningMinusExercise,
    LigningFacit,
    numOfTasks,
}