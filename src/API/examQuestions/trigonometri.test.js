const trigonometri = require('./trigonometri.js');

test('sinusFacit', () => {
  const A = 4;
  const B = 3;

  expect(trigonometri.sinusFacit( A, B )).toEqual('-0.865')
});

test ('TangensExercise', () => {
  const A = 180

  const tangensExpect = '1.34';
  expect(trigonometri.tangensFacit(A)).toEqual(tangensExpect);
});
