const math = require('mathjs');
const { randNum } = require('../../helper');

/**
 * Generates a vector, and puts in a matrix
 * @return {math.Matrix} Returns the generated and formatted vector.
 */
const generateRandom2dVector = () => {
  const a1 = randNum(15) + 5;
  const a2 = randNum(12);

  const v = math.matrix([
    [a1],
    [a2],
  ]);

  return v;
};

/**
 * Formats a vector into a string
 * @param {math.Matrix} vector Takes a vector as input and formats it accordingly.
 * @return {string} Formats the vector as a string, and returns it.
 */
const formatVector = (vector) => `${math.subset(vector, math.index(0, 0))} ${math.subset(vector, math.index(1, 0))}`;

/**
 * Represents a vektor addition exercise  .
 * @constructor
 */
function VektorAdditionExercise() {
  const mathMatrixVectorA = generateRandom2dVector();
  const mathMatrixVectorB = generateRandom2dVector();
  const mathMatirxFacit = getVektorAdditionFacit(mathMatrixVectorA, mathMatrixVectorA);

  this.exerciseVars = {
    vectorA: formatVector(mathMatrixVectorA),
    vectorB: formatVector(mathMatrixVectorB),
  };
  this.facit = formatVector(mathMatirxFacit);
  this.type = 'vektor2d';
  this.point = 10;
  this.txt = 'Hvad giver følgende to vektorer lagt sammen?';
  this.tegn = '+';
}

/**
 * This functions takes two vectors as input, adds them, and returns the resulting vector.
 * @param {math.Matrix} vectorA The first vector used as a parameter.
 * @param {math.Matrix} vectorB The second vector used as a parameter.
 * @return {math.Matrix} The final vector from adding the two input parameters.
 */
const getVektorAdditionFacit = (vectorA, vectorB) => math.matrix([
  [math.subset(vectorA, math.index(0, 0)) + math.subset(vectorB, math.index(0, 0))],
  [math.subset(vectorA, math.index(1, 0)) + math.subset(vectorB, math.index(1, 0))],
]);

/**
 * Represents a vektor subtraction exercise  .
 * @constructor
 */
function VektorSubtractionExercise() {
  const mathMatrixVectorA = generateRandom2dVector();
  const mathMatrixVectorB = generateRandom2dVector();
  const mathMatirxFacit = getVektorSubtractionFacit(mathMatrixVectorA, mathMatrixVectorA);

  this.exerciseVars = {
    vectorA: formatVector(mathMatrixVectorA),
    vectorB: formatVector(mathMatrixVectorB),
  };
  this.facit = formatVector(mathMatirxFacit);
  this.type = 'vektor2d';
  this.point = 10;
  this.txt = 'Hvad giver følgende to vektorer fratrukket hinanden?';
  this.tegn = '-';
}

/**
 * This functions takes two vectors as input, subtracts them, and returns the resulting vector.
 * @param {math.Matrix} vectorA The first vector used as a parameter.
 * @param {math.Matrix} vectorB The second vector used as a parameter.
 * @return {math.Matrix} The final vector from subtracting the two input parameters.
 */
const getVektorSubtractionFacit = (vectorA, vectorB) => math.matrix([
  [math.subset(vectorA, math.index(0, 0)) - math.subset(vectorB, math.index(0, 0))],
  [math.subset(vectorA, math.index(1, 0)) - math.subset(vectorB, math.index(1, 0))],
]);

/**
 * Represents a vektor multiplication exercise  .
 * @constructor
 */
function VektorMultiplicationExercise() {
  const mathMatrixVectorA = generateRandom2dVector();
  const mathMatrixVectorB = generateRandom2dVector();
  const facitNumber = getVektorMultiplicationFacit(mathMatrixVectorA, mathMatrixVectorA);

  this.exerciseVars = {
    vectorA: formatVector(mathMatrixVectorA),
    vectorB: formatVector(mathMatrixVectorB),
  };
  this.facit = facitNumber.toString();
  this.type = 'vektor2d';
  this.point = 10;
  this.txt = 'Find skalarproduktet af følgende to vektorer?';
  this.tegn = '*';
}

/**
 * This functions takes two vectors as input, multiplies them, and returns the resulting vector.
 * @param {math.Matrix} vectorA The first vector used as a parameter.
 * @param {math.Matrix} vectorB The second vector used as a parameter.
 * @return {integer} The final vector from multiplying the two input parameters, giving us the scalar product.
 */
const getVektorMultiplicationFacit = (vectorA, vectorB) => math.dot(vectorA, vectorB);

const numOfTasks = 3;

module.exports = {
  VektorAdditionExercise,
  getVektorAdditionFacit,
  VektorSubtractionExercise,
  getVektorSubtractionFacit,
  VektorMultiplicationExercise,
  getVektorMultiplicationFacit,
  numOfTasks,
};
