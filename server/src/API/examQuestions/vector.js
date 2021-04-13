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

const vektorAddition = () => {
  const txt = 'Hvad giver følgende to vektorer lagt sammen?';
  const vectorA = generateVector();
  const vectorB = generateVector();
  const point = 10;
  const type = 'vektor2d';

  const tegn = '+';

  const facit = math.matrix([
    [math.subset(vectorA, math.index(0, 0)) + math.subset(vectorB, math.index(0, 0))],
    [math.subset(vectorA, math.index(1, 0)) + math.subset(vectorB, math.index(1, 0))],
  ]);

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

const vektorSubtraction = () => {
  const txt = 'Hvad giver følgende to vektorer fratrukket hinanden?';
  const vectorA = generateVector();
  const vectorB = generateVector();
  const point = 10;
  const type = 'vektor2d';

  const tegn = '-';

  const facit = math.matrix([
    [math.subset(vectorA, math.index(0, 0)) - math.subset(vectorB, math.index(0, 0))],
    [math.subset(vectorA, math.index(1, 0)) - math.subset(vectorB, math.index(1, 0))],
  ]);

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

const vektorMultiplication = () => {
  const txt = 'Find skalarproduktet af følgende to vektorer';
  const vectorA = generateVector();
  const vectorB = generateVector();
  const tegn = '*';
  const point = 15;
  const type = 'vektor2d';

  // eslint-disable-next-line max-len
  const facit = math.dot(vectorA, vectorB);

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

const numOfTasks = 3;

// vektorAddition();
// vektorSubtraction();
// vektorMultiplication();

module.exports = {
  vektorAddition,
  vektorSubtraction,
  vektorMultiplication,
  numOfTasks,
};
