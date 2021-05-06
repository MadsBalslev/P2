const statistik = require('./statistics.js');


test('binormalConfidenceIntervalFacit', () => {
const A = 92;
const B = 11;
const confidenceintervalExpect = '[0.06;0.18]'

expect(statistik.binormalConfidenceIntervalFacit(A, B)).toEqual(confidenceintervalExpect)
});

test('normalConfidenceIntervalFacit', () => {
const numbers = [2, 8, 7, 8, 5, 5, 11, 9, 6, 3, 6, 1];
const i = 12;
const afgivelse = 2;
const confidenceintervalExpect = '[4.79;7.05]';

expect(statistik.normalConfidenceIntervalFacit(numbers, i, afgivelse)).toEqual(confidenceintervalExpect);
});