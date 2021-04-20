const { randNum } = require('../../helper');

const createPowerIntegralExercise = () => {
  const txt = 'Udregn det følgende ubestemte integral.';
  const type = 'integralregning';
  const point = 10;

  let B;
  while (B % 3 !== 0) B = randNum(40);

  const A = randNum(40);
  const C = randNum(70);
  const integral = `${A}x^3+${B}x^2+${C}x`;

  const integralFacit = getPowerIntegralFacit(A, B, C);

  const taskObj = {
    exerciseVars: {
      integral,
    },
    facit: integralFacit,
    type,
    point,
    txt,
    tegn: '',
  };

  return taskObj;
};

const getPowerIntegralFacit = (A, B, C) => {
  const facitA = (A / 4);
  const facitB = (B / 3);
  const facitC = (C / 2);

  const integralFacit = `${facitA}x^4+${facitB}x^3+${facitC}x^2+K`;
  return integralFacit;
};

const createTrigonometricIntegralExercise = () => {
  const txt = 'Udregn det følgende ubestemte integral.';
  const type = 'integralregning';
  const point = 15;

  const A = randNum(12) + 2;
  let B = randNum(7);
  if (B % 2 === 0) {
    B++;
  }
  const integral = `${A}cos(${B}x)`;

  const integralFacit = getTrigonometricIntegralFacit(A, B);

  const taskObj = {
    exerciseVars: {
      integral,
    },
    facit: integralFacit,
    type,
    point,
    txt,
    tegn: '',
  };

  return taskObj;
};

const getTrigonometricIntegralFacit = (A, B) => {
  let integralFacit;
  let into;
  let tempB;
  if (A === B) {
    integralFacit = `sin(${B}x)+K`;
  } else if (A === 1) {
    integralFacit = `sin(${B}x)/(${B}+K`;
  } else if (B === 1) {
    integralFacit = `${A}sin(x)+K`;
  } else if (A % B === 0) {
    into = A / B;

    tempB %= B % A;

    integralFacit = `${into}sin(${tempB}x)+K`;
  } else {
    integralFacit = `${A}sin(${B}x)/${B}+K`;
  }

  return integralFacit;
};

// m.i.s
// const f = math.parse('18x^7+10x^6-3x^5+x^4-19x^3+2x^2-x+10');
// const x = math.parse('x');
// const fm = math.derivative(f, x);

// console.log('f(x) =', f.toString());
// console.log("f'(x) =", fm.toString());

const numOfTasks = 2;

module.exports = {
  createPowerIntegral: createPowerIntegralExercise,
  getPowerIntegralFacit,
  createTrigonometricIntegral: createTrigonometricIntegralExercise,
  getTrigonometricIntegralFacit,
  numOfTasks,
};
