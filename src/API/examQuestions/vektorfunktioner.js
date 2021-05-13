const math = require('mathjs');
const { randNum } = require('../../helper');

/**
 * Variable declarations
 */
const t = randNum(1);
const x = randNum(10) + 2;
const y = randNum(10) + 3;
const g = randNum(4) + 4;
const h = randNum(4) + 5;

/**
 * Represents 
 */
function VektorFunctionExercise() {
  this.txt = `Bestem koordinaterne til parameter­frem­stil­lingens dobbeltpunkter. t = ${t} i (x,y) = (${x},${y})`;
  this.exerciseVars = {
    vectorfunction1: `overrightarrow${r(t)}=(x(t),y(t))=(${x}*cos(${t}),${y}-${t}-${g}*sin(${h}*${t}))`,
  };
  this.type = 'vektorfunktioner';
  this.facit = VektorFunctionExerciseFacit();
  this.point = 25;
  this.tegn = '*';
}

const VektorFunctionExerciseFacit = () => {
  const xt1 = x * math.cos(t);
  const yt1 = y - t - g * (math.sin(h * t));
  const xt2 = xt1 * t - (2 * Math.pi) + y * (math.sin(h * t));
  const yt2 = '0';
  const facit = `$overrightarrow{r(t_1)}=$overrightarrow{r(t_2)}=(x(t_1),y(t_1))=
  (x(t_2),y(t_2))=(${xt1},${yt1},${xt2},${yt2})`;
  return facit;
};

const numOfTasks = 2;

module.exports = {
  VektorFunctionExercise,
  VektorFunctionExerciseFacit,
  numOfTasks,
};
