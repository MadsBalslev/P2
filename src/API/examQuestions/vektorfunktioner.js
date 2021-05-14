const math = require('mathjs');
const { randNum } = require('../../helper');
const { round2Dec } = require('../../helper');

/**
 * Variable declarations randomly
 */
const VektorVars = () => {
  const radian = randNum(1);
  const xVar = randNum(10) + 2;
  const yVar = randNum(10) + 3;
  const constantVar = randNum(4) + 4;
  const CVar = randNum(4) + 5;
  const pi = Math.PI;

  return { radian, xVar, yVar, constantVar, CVar, pi };
};


/**
 * Represents a vectorfunction exercise
 */
function VektorFunctionExercise() {
  const { radian, xVar, yvar, constantVar, CVar } = VektorVars();
  this.txt = `Bestem koordinaterne til parameter­frem­stil­lingens 
  dobbeltpunkter. t = ${radian} i (x,y) = (${xVar},${yvar})`;
  this.exerciseVars = {
    vectorfunction1: `\\vec{r(t)}=(x(t),y(t))=(${xVar}*
    cos(${radian}),${yvar}-${radian}-${constantVar}*sin(${CVar}*${radian}))`,
  };
  this.type = 'vektorfunktioner';
  this.facit = `r(t_1)=r(t_2})=(x(t_1),y(t_1))=
  (x(t_2),y(t_2))=${VektorFunctionExerciseFacit( radian, xVar, yvar, constantVar, CVar )}`;
  this.point = 25;
  this.tegn = '*';
}

/**
 * Calculate facit and returning a string
 * @return facit
 */
const VektorFunctionExerciseFacit = (radian, xVar, yvar, constantVar, CVar) => {
  const xt1 = round2Dec(xVar * math.cos(radian));
  const yt1 = round2Dec(yvar - radian - constantVar * (math.sin(CVar * radian)));
  const xt2 = round2Dec(xt1 * radian - 2 * pi + yvar * (math.sin(CVar * radian)));
  const yt2 = '0';
  const facit = `(${xt1},${yt1},${xt2},${yt2})`;
  return facit;
};

/**
  * Represents a vectorfunction exercise
  */
function VektorFunctionExercise2() {
  const { radian, xVar, yvar, constantVar, CVar, pi } = VektorVars();
  this.txt = `Bestem koordinaterne til parameter­frem­stil­lingens 
   dobbeltpunkter. t = ${radian} i (x,y) = (${xVar},${yvar})`;
  this.exerciseVars = {
    vectorfunction1: `\\vec{r(t)}=(x(t),y(t))=(${xVar}*sin(${radian}),
    ${yvar}-${radian}-${constantVar}*cos(${CVar}*${radian}))`,
  };
  this.type = 'vektorfunktioner';
  this.facit = `r(t_1)=r(t_2})=(x(t_1),y(t_1))=
   (x(t_2),y(t_2))=${VektorFunctionExerciseFacit2(radian, xVar, yvar, constantVar, CVar, pi)}`;
  this.point = 25;
  this.tegn = '*';
}

/**
  * Calculate facit and returning a string
  * @return facit
  */
const VektorFunctionExerciseFacit2 = (radian, xVar, yvar, constantVar, CVar, pi) => {
  const xt1 = round2Dec(xVar * math.sin(radian));
  const yt1 = round2Dec(yvar - radian - constantVar * (math.cos(CVar * radian)));
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
