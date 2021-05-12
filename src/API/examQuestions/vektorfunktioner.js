const { randNum } = require('../../helper');

const a1 = randNum(25);
const a2 = randNum(25);
const a3 = randNum(25);
const a4 = randNum(25);
const t1 = randNum(4);

function VektorFunctionExercise() {
  this.exerciseVars = {
    vectorA: `${t1}${t1}${a1}${t1}${a1}${t1}${a2}${a3}${t1}`,
  };
  this.facit = getVektorFunctionFacit();
  this.type = 'vektorfunktioner';
  this.point = 25;
  this.txt = 'Bestem koordinaterne til parameter­frem­stil­lingens dobbeltpunkter.';
  this.txt = `\\overrightarrow{r(t)} = (x(${t1}),y(${t1})) = (${a1}*cos(${t1}),${a1}-${t1}-${a2}*sin(${a3}*${t1}))`;
}

const getVektorFunctionFacit = () => {
  const v = (a2 * a3) * t1;
  const A1 = a1 - (T1) - a2 * Math.sin(v);
  const A2 = a2;
  const A3 = a3;
  const T1 = 2 * Math.PI - t1;
  const facit = `\\overrightarrow{r(${t1})} = \\overrightarrow{r(${T1})} = (${A1},${A1},${A2},${A3})`;
  return facit;
};

function VektorIntersectionExercise() {
  this.exerciseVars = {
    vectorA: `x${a1}=${a2}*t^2+${a3}*t-${a4} og y(t)=t, hvor -\\{infty}<t<+\\{infty}`,
  };
  this.facit = getVektorIntersectionFacit();
  this.type = 'vektorfunktioner';
  this.point = 25;
  this.txt = 'Bestem koordinaterne til parameter­frem­stil­lingens dobbeltpunkter.';
  this.tegn = '*';
}

const getVektorIntersectionFacit = () => {
  const xt = a1 * (t1 ** 2) + a2 * t1 - a4;
  const yt = a1 * (t1 ** 2) + a2 * t1 + a4;

  const facit = `(0,${xt}) og (0,${yt})`;
  return facit;
};

const numOfTasks = 2;

module.exports = {
  VektorFunctionExercise,
  getVektorFunctionFacit,
  VektorIntersectionExercise,
  getVektorIntersectionFacit,
  numOfTasks,
};
