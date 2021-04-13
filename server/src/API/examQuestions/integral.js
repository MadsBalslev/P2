const math = require('mathjs');
const { randNum } = require('../../helper');

// Interval [a:b]
// Omskriv til bestemt integral med interval : indsæt a og b til f(x)
// Find længden af bestemt integral: F(b) - F(a) = længden
// F(b)=Ab+Bb^2+k - F(a)=Aa+Ba^2+k

/* const generateFunction = () => {
  // f(x) = Ax + Bx^2+k
  const a = randNum(5);
  const b = randNum(5);
  const c = randNum(7);

  const d = randNum(-5);
  const e = randNum(5);

  const fStr = `${a}x+${b}x^2+${c}`;
  const f = math.parse(fStr);
  const fInt = `${d};${e}`;

  console.log(fStr);

  for (let i = 0; i < 10; i++) {
    console.log('x:', i, 'y:', math.evaluate(fStr, { x: i }));
  }

}; */

const createintegral = () => {
  // (Ax^3 +- Bx^2 +- C)dx

  // (Ax +- B)dx
  let B;
  while (B % 3 !== 0) B = randNum(40);

  const A = randNum(40);
  const C = randNum(70);

  const facitA = (A / 4);
  const facitB = (B / 3);
  const facitC = (C / 2);

  const integral = `${A}x^3+${B}x^2+${C}x`;
  const integralFacit = `${facitA}x^4+${facitB}x^3+${facitC}x^2+k`;

  const answer = { formula: integral, facit: integralFacit };

  console.log(answer);
  return answer;
};

createintegral();

module.exports = {
  createintegral,
};
