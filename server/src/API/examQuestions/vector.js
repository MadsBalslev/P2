const math = require('mathjs');
const { randNum } = require('../../helper');

const generateRandom2dVector = () => {
  const a1 = randNum(15) + 5;
  const a2 = randNum(12);

  const v = math.matrix([
    [a1],
    [a2],
  ]);

  return v;
};

const formatVector = (vector) => `${math.subset(vector, math.index(0, 0))} ${math.subset(vector, math.index(1, 0))}`;

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

const getVektorAdditionFacit = (vectorA, vectorB) => math.matrix([
  [math.subset(vectorA, math.index(0, 0)) + math.subset(vectorB, math.index(0, 0))],
  [math.subset(vectorA, math.index(1, 0)) + math.subset(vectorB, math.index(1, 0))],
]);

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

const getVektorSubtractionFacit = (vectorA, vectorB) => math.matrix([
  [math.subset(vectorA, math.index(0, 0)) - math.subset(vectorB, math.index(0, 0))],
  [math.subset(vectorA, math.index(1, 0)) - math.subset(vectorB, math.index(1, 0))],
]);

/* This function generates two vectors needed for a multiplication exercise and calculates the right answer for the exercise */
function VektorMultiplicationExercise() {
  const mathMatrixVectorA = generateRandom2dVector();
  const mathMatrixVectorB = generateRandom2dVector();
  const facitNumber = getVektorMultiplicationFacit(mathMatrixVectorA, mathMatrixVectorA);

  /* Put it in a object */
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
