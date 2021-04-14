const { cos } = require('mathjs');
const math = require('mathjs');
const { randNum } = require('../../helper');

// Power Rule Integration
const createPowerIntegral = () => {
  // (Ax^3 +- Bx^2 +- C)dx

  const txt = 'Udregn det følgende ubestemte integral.';
  const type = 'integralregning';
  const point = 10;

  let B;
  while (B % 3 !== 0) B = randNum(40);

  const A = randNum(40);
  const C = randNum(70);

  const facitA = (A / 4);
  const facitB = (B / 3);
  const facitC = (C / 2);

  const integral = `${A}x^3+${B}x^2+${C}x`;
  const integralFacit = `${facitA}x^4+${facitB}x^3+${facitC}x^2+K`;

  const answer = { txt: txt, formula: integral, facit: integralFacit, type: type, point: point };

  console.log(answer);
  return answer;
};

// Trigonomisk Integral
const createTrigonometricIntegral = () => {
  const txt = 'Udregn det følgende ubestemte integral.';
  const type = 'integralregning';
  const point = 15;

  const A = randNum(12) + 2;
  let B = randNum(7);
  if (B % 2 === 0) {B++;}
  let into;

  const integral = `${A}cos(${B}x)`;
  let integralFacit;

  if (A === B) { integralFacit = `sin(${B}x)+K`; }
  else if (A === 1) { integralFacit = `sin(${B}x)/(${B}+K`; }
  else if (B === 1) { integralFacit = `${A}sin(x)+K`; }
  else if (A % B === 0) {
    into = A / B;
    B = B % A;

    integralFacit = `${into}sin(${B}x)+K`; 
  }
  else { integralFacit = `${A}sin(${B}x)/${B}+K`; }
  
  const pIntegral = math.parse(integral);
  const pFacit = math.parse(integralFacit);

  const answer = { txt: txt, formula: pIntegral.toString(), facit: pFacit.toString(), type: type, point: point };

  console.log(answer);
  return answer;
}



const f = math.parse('18x^7+10x^6-3x^5+x^4-19x^3+2x^2-x+10');
const x = math.parse('x');
const fm = math.derivative(f, x);

// console.log('f(x) =', f.toString());
// console.log("f'(x) =", fm.toString());

// createintegral();

const numOfTasks = 2;

// createPowerIntegral();
// createTrigonometricIntegral();

module.exports = {
  createPowerIntegral,
  createTrigonometricIntegral,
  numOfTasks,
};
