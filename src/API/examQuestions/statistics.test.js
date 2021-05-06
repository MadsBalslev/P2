const math = require('mathjs');
const statistik = require('./statistics.js');


test('confidenceintervalFacit', () => {
const A = 92;
const B = 11;
const confidenceintervalExpect = '[0.06;0.18]'

expect(statistik.confidenceIntervalFacit(A, B)).toEqual(confidenceintervalExpect)
})