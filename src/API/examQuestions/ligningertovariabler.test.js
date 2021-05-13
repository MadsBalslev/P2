const differination = require('./ligningertovariabler.js');

test('partielDifferentiationFacit', () => {
  const A = 4;
  const B = 2;
  const C = 4;
  const D = 2;
  const expression = 'x';

  const FacitExpect = '2 * x + 4';

  expect(differination.partielDifferentiationFacit(A, B, C, D, expression)).toEqual(FacitExpect);
});

test('rangeFacit', () => {
  const unknowns = 1;
  const c = 9;
  const rangeExpect = 3;

  expect(differination.rangeFacit(unknowns, c)).toEqual(rangeExpect);
});
