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

const vektorAdditionSubtraction = (operator) => {
  const txt = `Hvad giver følgende to vektorer ${operator === 'add' ? 'lagt sammen' : 'fratrukket hinanden'}?`;
  const vectorA = generateVector();
  const vectorB = generateVector();
  const point = 10;
  const type = 'vektor2d';

  const tegn = operator === 'add' ? '+' : '-';

  const facit = operator === 'add' ? math.matrix([
    [math.subset(vectorA, math.index(0, 0)) + math.subset(vectorB, math.index(0, 0))],
    [math.subset(vectorA, math.index(1, 0)) + math.subset(vectorB, math.index(1, 0))],
  ]) : math.matrix([
    [math.subset(vectorA, math.index(0, 0)) - math.subset(vectorB, math.index(0, 0))],
    [math.subset(vectorA, math.index(1, 0)) - math.subset(vectorB, math.index(1, 0))],
  ]);

  const taskObj = {
    vectorA: formatVector(vectorA),
    vectorB: formatVector(vectorB),
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
  const facit = (math.subset(vectorA, math.index(0, 0)) * math.subset(vectorB, math.index(0, 0))) + (math.subset(vectorA, math.index(1, 0)) * math.subset(vectorB, math.index(1, 0)));

  const taskObj = {
    vectorA: formatVector(vectorA),
    vectorB: formatVector(vectorB),
    facit,
    type,
    point,
    txt,
    tegn,
  };

  return taskObj;
};

module.exports = {
  vektorAdditionSubtraction,
  vektorMultiplication,
};
