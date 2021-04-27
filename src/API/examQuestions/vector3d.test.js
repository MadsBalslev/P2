const math = require('mathjs');
const vector = require('./vector3d.js');

test('getVektorAdditionFacit', () => {
  const vectorA = math.matrix([[4], [1], [1]]);
  const vectorB = math.matrix([[2], [3], [3]]);

  const vectorExpect = math.matrix([[6], [4], [4]]);
  expect(vector.getVektorAdditionFacit(vectorA, vectorB)).toEqual(vectorExpect);
});

test('getVektorSubstractionFacit', () => {
  const vectorA = math.matrix([[5], [3], [2]]);
  const vectorB = math.matrix([[3], [2], [1]]);

  const vectorExpect = math.matrix([[2], [1], [1]]);
  expect(vector.getVektorSubtractionFacit(vectorA, vectorB)).toEqual(vectorExpect);
});

test('getVektorMultiplicationFacit', () => {
  const vectorA = math.matrix([[10], [1], [7]]);
  const vectorB = math.matrix([[3], [6], [2]]);

  expect(vector.getVektorMultiplicationFacit(vectorA, vectorB)).toEqual(50);
});
