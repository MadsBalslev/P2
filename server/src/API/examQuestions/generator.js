const math = require('mathjs');
const { connectToDB } = require('../../helper');

const con = connectToDB();

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected!');
});

const randNum = (range) => Math.floor(Math.random() * range) + 1;

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

const vektorAdditionSubtraction = (type) => {
  const txt = `Hvad giver følgende to vektorer ${type === 'add' ? 'lagt sammen' : 'fratrukket hinanden'}?`;
  const vectorA = generateVector();
  const vectorB = generateVector();
  const point = 10;

  const tegn = type === 'add' ? '+' : '-';

  const facit = type === 'add' ? math.matrix([
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

  // eslint-disable-next-line max-len
  const facit = (math.subset(vectorA, math.index(0, 0)) * math.subset(vectorB, math.index(0, 0))) + (math.subset(vectorA, math.index(1, 0)) * math.subset(vectorB, math.index(1, 0)));

  const taskObj = {
    vectorA: formatVector(vectorA),
    vectorB: formatVector(vectorB),
    facit,
    point,
    txt,
    tegn,
  };

  return taskObj;
};

const insertTest = 'INSERT INTO examquestions (tekst, var1, udtryk, var2, facit, point) VALUES (?, ?, ?, ?, ?, ?)';

const sqlInsert = (queryFormat, tekst, var1, udtryk, var2, facit, point) => {
  con.query(queryFormat, [tekst, var1, udtryk, var2, facit, point], (err, query) => {
    if (err) {
      throw err;
    }
    console.log(query);
  });
};

const generateExcercise = (type, amount, subType = null) => {
  for (let i = 0; i < amount; i++) {
    const call = type(subType);
    sqlInsert(insertTest, call.txt, call.vectorA, call.tegn, call.vectorB, call.facit, call.point);
  }
};

generateExcercise(vektorMultiplication, 1);
generateExcercise(vektorAdditionSubtraction, 10, 'sub');

con.end();
