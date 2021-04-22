const math = require('mathjs');
const { randNum } = require('../../helper');

const generateVector3d = () => {
    const a1 = randNum(15) + 5;
    const a2 = randNum(12);
    const a3 = randNum(12);
  
    const v = math.matrix([
      [a1],
      [a2],
      [a3],
    ]);
  
    return v;
  };

  const formatVector3d = (vector) => `${math.subset(vector, math.index(0, 0))} ${math.subset(vector, math.index(1, 0))} ${math.subset(vector, math.index(2, 0))}`;

  const vektorAddition3d = () => {
    const txt = 'Hvad giver følgende to vektorer lagt sammen?';
    const vectorA = generateVector3d();
    const vectorB = generateVector3d();
    const point = 15;
    const type = 'vektor3d';
  
    const tegn = '+';
  
    const facit = math.matrix([
      [math.subset(vectorA, math.index(0, 0)) + math.subset(vectorB, math.index(0, 0))],
      [math.subset(vectorA, math.index(1, 0)) + math.subset(vectorB, math.index(1, 0))],
      [math.subset(vectorA, math.index(2, 0)) + math.subset(vectorB, math.index(2, 0))],
    ]);
  
    const taskObj = {
      exerciseVars: {
        vectorA: formatVector3d(vectorA),
        vectorB: formatVector3d(vectorB),
      },
      facit: formatVector3d(facit),
      type,
      point,
      txt,
      tegn,
    };
    console.log(taskObj);

    return taskObj;
  };

  vektorAddition3d();


  const numOfTasks = 1;

  module.exports = {
    vektorAddition3d,
    numOfTasks,
  };