const math = require('mathjs');
const { randNum } = require('../../helper');
const { round2Dec } = require('../../helper');

/**
 * Variable declarations randomly
 */
const t = randNum(1);
const x = randNum(10) + 2;
const y = randNum(10) + 3;
const g = randNum(4) + 4;
const h = randNum(4) + 5;
const pi = Math.PI;

/**
 * Represents a vectorfunction exercise
 */
function VektorFunctionExercise() {
  this.txt = `Bestem koordinaterne til parameter­frem­stil­lingens dobbeltpunkter. t = ${t} i (x,y) = (${x},${y})`;
  this.exerciseVars = {
    vectorfunction1: `\\vec{r(t)}=(x(t),y(t))=(${x}*cos(${t}),${y}-${t}-${g}*sin(${h}*${t}))`,
  };
  this.type = 'vektorfunktioner';
  this.facit = VektorFunctionExerciseFacit();
  this.point = 25;
  this.tegn = '*';
}

/**
 * Calculate facit and returning a string
 * @return facit
 */
const VektorFunctionExerciseFacit = () => {
  const xt1 = round2Dec(x * math.cos(t));
  const yt1 = round2Dec(y - t - g * (math.sin(h * t)));
  const xt2 = round2Dec(xt1 * t - 2 * pi + y * (math.sin(h * t)));
  const yt2 = '0';
  const facit = `\\vec{r(t\\_{1})}=\\vec{r(t\\_{2})}=(x(t_1),y(t_1))=
  (x(t_2),y(t_2))=(${xt1},${yt1},${xt2},${yt2})`;
  return facit;
};

const numOfTasks = 1;

module.exports = {
  VektorFunctionExercise,
  VektorFunctionExerciseFacit,
  numOfTasks,
};
