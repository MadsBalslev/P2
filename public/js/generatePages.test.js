const grade = require('./generatePages.js');

test('calcGrade', () => {
    const points = 200;
    const maxpoints = 250;

    const expectedgrade = '10';

    expect(grade.calcGrade(points, maxpoints)).toEqual(expectedgrade);
});