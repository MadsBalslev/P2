//Partikulær løsning og fuldstændig løsning til differentialligning
const constants = [...Array(100).keys()].slice(1);
const randomNum = Math.floor(Math.random() *
    constants.length);


function name(value) {
    let a = randomNum;
    console.log(a);
}
name();


function DifferentialExercisePlus() {
    const { A, B, C } = randomNum();
    this.txt = "Sut min diller i følgende opgave :)";
    this.type = 'Differentialligninger';
    this.point = 5;
    this.tegn = '+';
    this.exerciseVars = { diffligning: `${A}x + ${B} = ${C}` };
    this.facit = DiffligningFacit(A, B, C, this.tegn);
}

const DiffligningFacit = (A, B, C, symbol) => {
    let ans;

    if (symbol === '+');
    const answer =
}