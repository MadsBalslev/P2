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

function getVektorAdditionFacit(vectorA, vectorB) {
  return math.matrix([
    [math.subset(vectorA, math.index(0, 0)) + math.subset(vectorB, math.index(0, 0))],
    [math.subset(vectorA, math.index(1, 0)) + math.subset(vectorB, math.index(1, 0))],
  ]);
}

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

function getVektorSubtractionFacit(vectorA, vectorB) {
  return math.matrix([
    [math.subset(vectorA, math.index(0, 0)) - math.subset(vectorB, math.index(0, 0))],
    [math.subset(vectorA, math.index(1, 0)) - math.subset(vectorB, math.index(1, 0))],
  ]);
}

function VektorMultiplicationExercise() {
  const mathMatrixVectorA = generateRandom2dVector();
  const mathMatrixVectorB = generateRandom2dVector();
  const mathMatirxFacit = getVektorMultiplicationFacit(mathMatrixVectorA, mathMatrixVectorA);

  this.exerciseVars = {
    vectorA: formatVector(mathMatrixVectorA),
    vectorB: formatVector(mathMatrixVectorB),
  };
  this.facit = formatVector(mathMatirxFacit);
  this.type = 'vektor2d';
  this.point = 10;
  this.txt = 'Find skalarproduktet af følgende to vektorer?';
  this.tegn = '*';
}

function getVektorMultiplicationFacit(vectorA, vectorB) {
  return math.dot(vectorA, vectorB);
}

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
