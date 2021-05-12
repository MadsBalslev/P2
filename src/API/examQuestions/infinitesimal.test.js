const infinitesimal = require('./infinitesimal');

test('rotatingBodyQuadraticFacit', () => {
  const A = 4;
  const B = 4;
  const C = 2;

  const expectFacit = '201';

  expect(infinitesimal.rotatingBodyQuadraticFacit(A, B, C)).toEqual(expectFacit);
});

test('rotatingBodyFacit', () => {
  const A = 9;
  const B = 4;
  const C = 10;

  const expectFacit = '63';

  expect(infinitesimal.rotatingBodyFacit(A, B, C)).toEqual(expectFacit);
});
