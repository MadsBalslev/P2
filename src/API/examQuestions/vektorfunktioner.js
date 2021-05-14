const math = require('mathjs');
const { randNum } = require('../../helper');
const { round2Dec } = require('../../helper');

/**
 * Variable declarations randomly
 */
const radian = randNum(1);
const x = randNum(10) + 2;
const y = randNum(10) + 3;
const constanVar = randNum(4) + 4;
const C = randNum(4) + 5;
const pi = Math.PI;

/**
 * Represents a vectorfunction exercise
 */
function VektorFunctionExercise() {
  this.txt = `Bestem koordinaterne til parameter­frem­stil­lingens 
  dobbeltpunkter. t = ${radian} i (x,y) = (${x},${y})`;
  this.exerciseVars = {
    vectorfunction1: `\\vec{r(t)}=(x(t),y(t))=(${x}*
    cos(${radian}),${y}-${radian}-${constanVar}*sin(${C}*${radian}))`,
  };
  this.type = 'vektorfunktioner';
  this.facit = `r(t_1)=r(t_2})=(x(t_1),y(t_1))=
  (x(t_2),y(t_2))=${VektorFunctionExerciseFacit()}`;
  this.point = 25;
  this.tegn = '*';
}

/**
 * Calculate facit and returning a string
 * @return facit
 */
const VektorFunctionExerciseFacit = () => {
  const xt1 = round2Dec(x * math.cos(radian));
  const yt1 = round2Dec(y - radian - constanVar * (math.sin(C * radian)));
  const xt2 = round2Dec(xt1 * radian - 2 * pi + y * (math.sin(C * radian)));
  const yt2 = '0';
  const facit = `(${xt1},${yt1},${xt2},${yt2})`;
  return facit;
};

/**
  * Represents a vectorfunction exercise
  */
function VektorFunctionExercise2() {
  this.txt = `Bestem koordinaterne til parameter­frem­stil­lingens 
   dobbeltpunkter. t = ${radian} i (x,y) = (${x},${y})`;
  this.exerciseVars = {
    vectorfunction1: `\\vec{r(t)}=(x(t),y(t))=(${x}*cos(${radian}),
    ${y}-${radian}-${constanVar}*cos(${C}*${radian}))`,
  };
  this.type = 'vektorfunktioner';
  this.facit = `r(t_1)=r(t_2})=(x(t_1),y(t_1))=
   (x(t_2),y(t_2))=${VektorFunctionExerciseFacit()}`;
  this.point = 25;
  this.tegn = '*';
}

/**
  * Calculate facit and returning a string
  * @return facit
  */
const VektorFunctionExerciseFacit2 = () => {
  const xt1 = round2Dec(x * math.cos(radian));
  const yt1 = round2Dec(y - radian - constanVar * (math.cos(C * radian)));
  const xt2 = round2Dec(xt1 * radian - 2 * pi + y * (math.cos(C * radian)));
  const yt2 = '0';
  const facit = `(${xt1},${yt1},${xt2},${yt2})`;
  return facit;
};

const numOfTasks = 2;

module.exports = {
  VektorFunctionExercise,
  VektorFunctionExerciseFacit,
  VektorFunctionExercise2,
  VektorFunctionExerciseFacit2,
  numOfTasks,
};
