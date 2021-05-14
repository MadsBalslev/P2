const gus = require('./generateUserSet');

describe('vectorToPercentVector', () => {
  test('vectorToPercentVector', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = [1 / 55, 2 / 55, 3 / 55, 4 / 55, 5 / 55, 6 / 55, 7 / 55, 8 / 55, 9 / 55, 10 / 55];
    const actual = gus.vectorToPercentVector(input);

    actual.forEach((actualElement, i) => {
      expect(actualElement).toBeCloseTo(expected[i]);
    });
  });
});

describe('percentVectorToExerciseAmountVector', () => {
  test('percentVectorToExerciseAmountVector', () => {
    const percentVector = [1 / 55, 2 / 55, 3 / 55, 4 / 55, 5 / 55, 6 / 55, 7 / 55, 8 / 55, 9 / 55, 10 / 55];
    const amountOfExercises = 30;
    const actual = gus.percentVectorToExerciseAmountVector(percentVector, amountOfExercises);
    const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

    expect(actual).toEqual(expected);
  });
});

describe('generateCoreExerciseSet', () => {
  test('generateCoreExerciseSet', () => {
    const exerciseAmountVector = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    const exerciseSet = gus.generateCoreExerciseSet(exerciseAmountVector);

    expect(exerciseSet.length).toBe(30);
    expect(exerciseSet[0].type).toBe('vektor2d');
    expect(exerciseSet[1].type).toBe('vektor3d');
    expect(exerciseSet[2].type).toBe('integralregning');
    expect(exerciseSet[3].type).toBe('integralregning');
    expect(exerciseSet[4].type).toBe('ligninger');
    expect(exerciseSet[5].type).toBe('ligninger');
    expect(exerciseSet[6].type).toBe('differentialligning');
    expect(exerciseSet[7].type).toBe('differentialligning');
    expect(exerciseSet[8].type).toBe('differentialligning');
    expect(exerciseSet[9].type).toBe('funktionerAfToVariable');
    expect(exerciseSet[10].type).toBe('funktionerAfToVariable');
    expect(exerciseSet[11].type).toBe('funktionerAfToVariable');
    expect(exerciseSet[12].type).toBe('statistik');
    expect(exerciseSet[13].type).toBe('statistik');
    expect(exerciseSet[14].type).toBe('statistik');
    expect(exerciseSet[15].type).toBe('statistik');
    expect(exerciseSet[16].type).toBe('infinitesimalregning');
    expect(exerciseSet[17].type).toBe('infinitesimalregning');
    expect(exerciseSet[18].type).toBe('infinitesimalregning');
    expect(exerciseSet[19].type).toBe('infinitesimalregning');
    expect(exerciseSet[20].type).toBe('trigonometri');
    expect(exerciseSet[21].type).toBe('trigonometri');
    expect(exerciseSet[22].type).toBe('trigonometri');
    expect(exerciseSet[23].type).toBe('trigonometri');
    expect(exerciseSet[24].type).toBe('trigonometri');
    expect(exerciseSet[25].type).toBe('vektorfunktioner');
    expect(exerciseSet[26].type).toBe('vektorfunktioner');
    expect(exerciseSet[27].type).toBe('vektorfunktioner');
    expect(exerciseSet[28].type).toBe('vektorfunktioner');
    expect(exerciseSet[29].type).toBe('vektorfunktioner');
  });
});

describe('geneRateUserExerciseSet', () => {
  test('geneRateUserExerciseSet userProfile = 0', () => {
    const userProfile = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const amountOfExercises = 30;
    const exerciseSet = gus.generateUserExerciseSet(userProfile, amountOfExercises);
    expect(exerciseSet.length).toBe(amountOfExercises);
  });

  test('geneRateUserExerciseSet sparse core set', () => {
    const userProfile = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const amountOfExercises = 20;
    const exerciseSet = gus.generateUserExerciseSet(userProfile, amountOfExercises);
    expect(exerciseSet.length).toBe(amountOfExercises);

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
    expect(exerciseSet[9].type).toBe('statistik');
    expect(exerciseSet[10].type).toBe('infinitesimalregning');
    expect(exerciseSet[11].type).toBe('infinitesimalregning');
    expect(exerciseSet[12].type).toBe('infinitesimalregning');
    expect(exerciseSet[13].type).toBe('trigonometri');
    expect(exerciseSet[14].type).toBe('trigonometri');
    expect(exerciseSet[15].type).toBe('trigonometri');
    expect(exerciseSet[16].type).toBe('vektorfunktioner');
    expect(exerciseSet[17].type).toBe('vektorfunktioner');
    expect(exerciseSet[18].type).toBe('vektorfunktioner');
    expect(exerciseSet[19].type).toBe('vektorfunktioner');
  });
});
