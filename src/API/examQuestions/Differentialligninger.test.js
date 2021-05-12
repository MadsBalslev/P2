const diffLigning = require ('./Differentialligninger.js');

test('differentialLigningFacit', () => {
  const A = 12;
  const B = 11;
  const C = 10;
  const D = 16;

  const diffExpect = `f(x)=3x^4+3.67x^3-5x^2+16x+C`

  expect(diffLigning.differentialLigningFacit( A, B, C, D )).toEqual(diffExpect);
});

test('differentialLigning2Facit', () => {
  const A = 12;
  const B = 11;
  const C = 10;
  const D = 16;

  const diffExpect = `f(x)=3x^4-3.67x^3-5x^2-16x+C`

  expect(diffLigning.differentialLigning2Facit( A, B, C, D )).toEqual(diffExpect);
});

test('differentialLigning3Facit', () => {
  const A = 7;
  const B = 5;
  const C = 7;

  const FacitA = 1.4;
  const FacitB = 5;
  const FacitC = 7;

  const diffExpect = `f(x)=${FacitA}xsin(${FacitB}x+${FacitC})+C`;

  expect(diffLigning.differentialLigning3Facit( A, B, C)).toEqual(diffExpect);
});
