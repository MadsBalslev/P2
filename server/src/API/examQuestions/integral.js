const math = require('mathjs');
const { randNum } = require('../../helper');

// Interval [a:b]
// Omskriv til bestemt integral med interval : indsæt a og b til f(x)
// Find længden af bestemt integral: F(b) - F(a) = længden
// F(b)=Ab+Bb^2+k - F(a)=Aa+Ba^2+k

const generateFunction = () => {
  // f(x) = Ax + Bx^2+k
  const a = randNum(5);
  const b = randNum(5);
  const c = randNum(7);

  const fstr = `${a}x+${b}x^2+${c}`;
  const f = math.parse(fstr);

  console.log(`f(x) = ${fstr}`);
};

generateFunction();

module.exports = {
  generateFunction,
};
