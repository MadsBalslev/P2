const math = require('mathjs');
const { randNum } = require('../../helper');
const { round2Dec } = require('../../helper');

/**
 * Variable declarations randomly
 */
const radian = randNum(1);
const xVar = randNum(10) + 2;
const yvar = randNum(10) + 3;
const constanVar = randNum(4) + 4;
const CVar = randNum(4) + 5;
const pi = Math.PI;

/**
 * Represents a vectorfunction exercise
 */
function VektorFunctionExercise() {
  this.txt = `Bestem koordinaterne til parameter­frem­stil­lingens 
  dobbeltpunkter. t = ${radian} i (x,y) = (${xVar},${yvar})`;
  this.exerciseVars = {
    vectorfunction1: `\\vec{r(t)}=(x(t),y(t))=(${xVar}*
    cos(${radian}),${yvar}-${radian}-${constanVar}*sin(${CVar}*${radian}))`,
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
  const xt1 = round2Dec(xVar * math.cos(radian));
  const yt1 = round2Dec(yvar - radian - constanVar * (math.sin(CVar * radian)));
  const xt2 = round2Dec(xt1 * radian - 2 * pi + yvar * (math.sin(CVar * radian)));
  const yt2 = '0';
  const facit = `(${xt1},${yt1},${xt2},${yt2})`;
  return facit;
};

/**
  * Represents a vectorfunction exercise
  */
function VektorFunctionExercise2() {
  this.txt = `Bestem koordinaterne til parameter­frem­stil­lingens 
   dobbeltpunkter. t = ${radian} i (x,y) = (${xVar},${yvar})`;
  this.exerciseVars = {
    vectorfunction1: `\\vec{r(t)}=(x(t),y(t))=(${xVar}*cos(${radian}),
    ${yvar}-${radian}-${constanVar}*cos(${CVar}*${radian}))`,
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
  const xt1 = round2Dec(xVar * math.cos(radian));
  const yt1 = round2Dec(yvar - radian - constanVar * (math.cos(CVar * radian)));
  const xt2 = round2Dec(xt1 * radian - 2 * pi + yvar * (math.cos(CVar * radian)));
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
