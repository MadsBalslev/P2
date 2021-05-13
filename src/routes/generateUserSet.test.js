const gus = require('./generateUserSet');

describe('vectorToPercentVector', () => {
  test('vectorToPercentVector', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const expected = [(1 / 66), (1 / 33), (1 / 22), (2 / 33), (5 / 66), (1 / 11), (7 / 66),
      (4 / 33), (3 / 22), (5 / 33), (1 / 6)];
    const actual = gus.vectorToPercentVector(input);

    actual.forEach((actualElement, i) => {
      expect(actualElement).toBeCloseTo(expected[i]);
    });
  });
});

describe('percentVectorToExerciseAmountVector', () => {
  test('percentVectorToExerciseAmountVector', () => {
    const percentVector = [(1 / 66), (1 / 33), (1 / 22), (2 / 33), (5 / 66), (1 / 11), (7 / 66),
      (4 / 33), (3 / 22), (5 / 33), (1 / 6)];
    const amountOfExercises = 20;
    const actual = gus.percentVectorToExerciseAmountVector(percentVector, amountOfExercises);
    const expected = [0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3];

    expect(actual).toEqual(expected);
  });
});

describe('generateCoreExerciseSet', () => {
  test('generateCoreExerciseSet', () => {
    const exerciseAmountVector = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3];
    const exerciseSet = gus.generateCoreExerciseSet(exerciseAmountVector);

    expect(exerciseSet.length).toBe(21);
    expect(exerciseSet[0].type).toBe('vektor2d');
    expect(exerciseSet[1].type).toBe('vektor3d');
    expect(exerciseSet[2].type).toBe('integralregning');
    expect(exerciseSet[3].type).toBe('ligninger');
    expect(exerciseSet[4].type).toBe('differentialligning');
    expect(exerciseSet[5].type).toBe('differentialligning');
    expect(exerciseSet[6].type).toBe('funktionerAfToVariable');
    expect(exerciseSet[7].type).toBe('funktionerAfToVariable');
    expect(exerciseSet[8].type).toBe('statistik');
    expect(exerciseSet[9].type).toBe('statistik');
    expect(exerciseSet[10].type).toBe('infinitesimalregning');
    expect(exerciseSet[11].type).toBe('infinitesimalregning');
    expect(exerciseSet[12].type).toBe('trigonometri');
    expect(exerciseSet[13].type).toBe('trigonometri');
    expect(exerciseSet[14].type).toBe('trigonometri');
    expect(exerciseSet[15].type).toBe('vektorfunktioner');
    expect(exerciseSet[16].type).toBe('vektorfunktioner');
    expect(exerciseSet[17].type).toBe('vektorfunktioner');
    expect(exerciseSet[18].type).toBe('differentialligninger');
    expect(exerciseSet[19].type).toBe('differentialligninger');
    expect(exerciseSet[20].type).toBe('differentialligninger');
  });
});

describe('geneRateUserExerciseSet', () => {
  test('geneRateUserExerciseSet', () => {
    const userProfile = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const amountOfExercises = 20;
    const exerciseSet = gus.generateUserExerciseSet(userProfile, amountOfExercises);

    expect(exerciseSet.length).toBe(20);
    expect(exerciseSet[0].type).toBe('vektor3d');
    expect(exerciseSet[1].type).toBe('integralregning');
    expect(exerciseSet[2].type).toBe('ligninger');
    expect(exerciseSet[3].type).toBe('differentialligning');
    expect(exerciseSet[4].type).toBe('differentialligning');
    expect(exerciseSet[5].type).toBe('funktionerAfToVariable');
    expect(exerciseSet[6].type).toBe('funktionerAfToVariable');
    expect(exerciseSet[7].type).toBe('statistik');
    expect(exerciseSet[8].type).toBe('statistik');
    expect(exerciseSet[9].type).toBe('infinitesimalregning');
    expect(exerciseSet[10].type).toBe('infinitesimalregning');
    expect(exerciseSet[11].type).toBe('trigonometri');
    expect(exerciseSet[12].type).toBe('trigonometri');
    expect(exerciseSet[13].type).toBe('trigonometri');
    expect(exerciseSet[14].type).toBe('vektorfunktioner');
    expect(exerciseSet[15].type).toBe('vektorfunktioner');
    expect(exerciseSet[16].type).toBe('vektorfunktioner');
    expect(exerciseSet[17].type).toBe('differentialligninger');
    expect(exerciseSet[18].type).toBe('differentialligninger');
    expect(exerciseSet[19].type).toBe('differentialligninger');
  });
});
