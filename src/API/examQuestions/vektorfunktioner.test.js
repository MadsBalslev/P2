const math = require('mathjs')
const vektorfunktioner = require('./vektorfunktioner.js');

test('VektorFunctionExerciseFacit', () => {

const xVar = 5;
const yvar = 4;
const constantVar = 6;
const radian = 1;
const CVar = 3;
const pi = Math.PI;

const vektorExpect = ('2.7,2.15,-3.01,0');
expect(vektorfunktioner.VektorFunctionExerciseFacit()).toEqual(vektorExpect);


});

test('VektorFunctionExerciseFacit2', () => {
  const xVar = 6;
  const yVar = 3;
  const radian = 1;
  const constantVar = 5;
  const CVar = 9;
  const pi = Math.PI;

  const xt1 = 3.24;
  const yt1 = 6.56;
  const xt2 = -5.78
  const yt2 = 0;

  const vektorExpect = `(${xt1},${yt1},${xt2},${yt2})`;
  
  expect(vektorfunktioner.VektorFunctionExerciseFacit2(radian, xVar, yVar, constantVar, CVar, pi)).toEqual(vektorExpect);  
});