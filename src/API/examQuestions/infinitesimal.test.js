const infinitesimal = require('./infinitesimal');

test('rotatingBodyQuadraticFacit', () => {
const A = 4;
const B = 4;
const C = 2;

const expectFacit = '101';

expect(infinitesimal.rotatingBodyQuadraticFacit(A, B, C)).toEqual(expectFacit);
});


test('rotatingBodyFacit', () => {

const A = 9;
const B = 4;
const C = 10;

const expectFacit = 20;

expect(infinitesimal.rotatingBodyFacit(A, B, C)).toEqual(expectFacit);
});