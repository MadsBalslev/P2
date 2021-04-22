const math = require('mathjs');
const vector = require('./vector.js');

test('getVektorAdditionFacit', () => {
  const vectorA = math.matrix([[7], [-4]]);
  const vectorB = math.matrix([[2], [3]]);
  const vectorExpect = math.matrix([[9], [-1]]);

  expect(vector.getVektorAdditionFacit(vectorA, vectorB)).toEqual(vectorExpect);
});

test('getVektorSubtractionFacit', () => {
  const vectorA = math.matrix([[7], [-4]]);
  const vectorB = math.matrix([[2], [3]]);
  const vectorExpect = math.matrix([[5], [-7]]);

  expect(vector.getVektorSubtractionFacit(vectorA, vectorB)).toEqual(vectorExpect);
});

test('getVektorMultiplicationFacit', () => {
  const vectorA = math.matrix([[7], [-4]]);
  const vectorB = math.matrix([[2], [3]]);

  expect(vector.getVektorMultiplicationFacit(vectorA, vectorB)).toEqual(2);
});
