const math = require('mathjs');
const { randNum } = require('../../helper');

const generateVector = () => {
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
  const mathMatrixVectorA = generateVector();
  const mathMatrixVectorB = generateVector();
  const mathMatirxFacit = getVektorAdditionFacit(mathMatrixVectorA, mathMatrixVectorA);

  this.exerciseVars = {
    vectorA: formatVector(mathMatrixVectorA),
    vectorB: formatVector(mathMatrixVectorB),
  };
  this.facit = mathMatirxFacit;
  this.type = 'vektor2d';
  this.point = 10;
  this.txt = 'Hvad giver følgende to vektorer lagt sammen?';
  this.tegn = '+';
};

function getVektorAdditionFacit(vectorA, vectorB) {
  return math.matrix([
    [math.subset(vectorA, math.index(0, 0)) + math.subset(vectorB, math.index(0, 0))],
    [math.subset(vectorA, math.index(1, 0)) + math.subset(vectorB, math.index(1, 0))],
  ]);
}

const CreateVektorSubtractionExercise = () => {
  const txt = 'Hvad giver følgende to vektorer fratrukket hinanden?';
  const vectorA = generateVector();
  const vectorB = generateVector();
  const point = 10;
  const type = 'vektor2d';

  const tegn = '-';

  const facit = getVektorSubtractionFacit(vectorA, vectorB);

  const taskObj = {
    exerciseVars: {
      vectorA: formatVector(vectorA),
      vectorB: formatVector(vectorB),
    },
    facit: formatVector(facit),
    type,
    point,
    txt,
    tegn,
  };

  return taskObj;
};

function getVektorSubtractionFacit(vectorA, vectorB) {
  return math.matrix([
    [math.subset(vectorA, math.index(0, 0)) - math.subset(vectorB, math.index(0, 0))],
    [math.subset(vectorA, math.index(1, 0)) - math.subset(vectorB, math.index(1, 0))],
  ]);
}

const createVektorMultiplicationExercise = () => {
  const txt = 'Find skalarproduktet af følgende to vektorer';
  const vectorA = generateVector();
  const vectorB = generateVector();
  const tegn = '*';
  const point = 15;
  const type = 'vektor2d';

  // eslint-disable-next-line max-len
  const facit = getVektorMultiplicationFacit(vectorA, vectorB);

  const taskObj = {
    exerciseVars: {
      vectorA: formatVector(vectorA),
      vectorB: formatVector(vectorB),
    },
    facit,
    type,
    point,
    txt,
    tegn,
  };

  return taskObj;
};

function getVektorMultiplicationFacit(vectorA, vectorB) {
  return math.dot(vectorA, vectorB);
}

const numOfTasks = 3;

// vektorAddition();
// vektorSubtraction();
createVektorMultiplicationExercise();

module.exports = {
  VektorAdditionExercise,
  getVektorAdditionFacit,
  vektorSubtraction: CreateVektorSubtractionExercise,
  getVektorSubtractionFacit,
  vektorMultiplication: createVektorMultiplicationExercise,
  getVektorMultiplicationFacit,
  numOfTasks,
};
