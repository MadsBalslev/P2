const integral = require('./integral.js');

test('getPowerIntegralFacit', () => {
  const A = 35;
  const B = 7;
  const C = 45;

  const FacitA = A / 4;
  const FacitB = B / 3;
  const FacitC = C / 2;

  const integralExpect = `f(x) = ${FacitA}x^4+${FacitB}x^3+${FacitC}x^2+K`;

  expect(integral.getPowerIntegralFacit(A, B, C)).toEqual(integralExpect);
});

test('getTrigonometricIntegralFacit', () => {
  const A = 8 + 2;
  const B = 5;

  const into = A / B;

  const integralExpect = `f(x) = ${into}sin(${B}x)+K`;

  expect(integral.getTrigonometricIntegralFacit(A, B)).toEqual(integralExpect);
});
