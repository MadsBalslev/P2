const rup = require('./reviseUserProfile');

const sampleExercise1 = {
  txt: 'Find x i følgende ligning.',
  type: 'ligninger_C',
  facit: '3.9',
  questionAnswers: '3.9',
};

const sampleExercise2 = {
  txt: 'sample text',
  type: 'statistik_A',
  facit: 'correct answer',
  questionAnswers: 'correct answer',
};

const sampleExercise3 = {
  txt: 'sample text',
  type: 'regression_B',
  facit: 'wrong answer',
  questionAnswers: 'correct answer',
};

const sampleExerciseSet = [sampleExercise1, sampleExercise2, sampleExercise3];

test('isUserProfileValidVector thruthy', () => {
  const validUserProfile = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  expect(rup.isUserProfileValidVector(validUserProfile)).toBeTruthy();
});

test('isUserProfileValidVector falsy', () => {
  const invalidUserProfile = [1, 2, 3, 4, 5, 6, 7, 8, 'string', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  expect(rup.isUserProfileValidVector(invalidUserProfile)).toBeFalsy();
});

test('validateEachExerciseInExerciseSet valid input', () => {
  const validExercise = [{ ...sampleExercise1 }];
  expect(rup.validateEachExerciseInExerciseSet(validExercise)).toBeTruthy();
});

test('validateEachExerciseInExerciseSet empty object', () => {
  const invalidExercise = [{}];
  expect(rup.validateEachExerciseInExerciseSet(invalidExercise)).toBeFalsy();
});

test('validateEachExerciseInExerciseSet typeof facit invalid', () => {
  const invalidExerciseSet = [{ ...sampleExercise1 }];
  invalidExerciseSet[0].facit = 3.9;
  expect(rup.validateEachExerciseInExerciseSet(invalidExerciseSet)).toBeFalsy();
});

test('validateEachExerciseInExerciseSet typeof questionAnswer invalid', () => {
  const invalidExerciseSet = [{ ...sampleExercise1 }];
  invalidExerciseSet[0].questionAnswers = 3.9;
  expect(rup.validateEachExerciseInExerciseSet(invalidExerciseSet)).toBeFalsy();
});

test('validateEachExerciseInExerciseSet typeof type invalid', () => {
  const invalidExerciseSet = [{ ...sampleExercise1 }];
  invalidExerciseSet[0].type = 666;
  expect(rup.validateEachExerciseInExerciseSet(invalidExerciseSet)).toBeFalsy();
});

test('scalarMultiplication', () => {
  const scalar = 0.5;
  const vector = [2, 4, 6, 10, 3];

  expect(rup.scalarMultiplication(scalar, vector)).toEqual([1, 2, 3, 5, 1.5]);
});

test('isCorrectAnswer correct answer', () => {
  const exerciseWithCorrectAnswer = { ...sampleExercise1 };
  expect(rup.isCorrectAnswer(exerciseWithCorrectAnswer)).toBeTruthy();
});

test('isCorrectAnswer wrong answer', () => {
  const exerciseWithWrongAnswer = { ...sampleExercise1 };
  exerciseWithWrongAnswer.questionAnswers = 'wrong answer';
  expect(rup.isCorrectAnswer(exerciseWithWrongAnswer)).toBeFalsy();
});

test('sumVectorArray', () => {
  const exerciseP = [[2.3, 4, 24], [1, 2.2, 3.9], [9, 1, 4]];
  expect(rup.sumVectorArray(exerciseP)).toEqual([12.3, 7.2, 31.9]);
});

test('sumVectorArrayBig', () => {
  const exerciseP = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  expect(rup.sumVectorArray(exerciseP)).toEqual([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]);
});

test('convertExerciseSetToExerciseProfiles', () => {
  const exSet = [{ ...sampleExercise1 }, { ...sampleExercise1 }];
  exSet[1].questionAnswers = 'wrong answer';
  const testVector = [
    [0, rup.CORRECT_ANSWER_WEIGHT, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, rup.WRONG_ANSWER_WEIGHT, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  expect(rup.convertExerciseSetToExerciseProfiles(exSet)).toEqual(testVector);
});

test('calculateExerciseProfile correct answer', () => {
  const exerciseWithCorrectAnswer = { ...sampleExercise1 };
  expect(rup.calculateExerciseProfile(exerciseWithCorrectAnswer))
    .toEqual([0, rup.CORRECT_ANSWER_WEIGHT, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
});

test('calculateExerciseProfile wrong answer', () => {
  const exerciseWithWrongAnswer = { ...sampleExercise1 };
  exerciseWithWrongAnswer.questionAnswers = 'wrong answer';
  expect(rup.calculateExerciseProfile(exerciseWithWrongAnswer))
    .toEqual([0, rup.WRONG_ANSWER_WEIGHT, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
});

test('calculateUserProfile', () => {
  const exerciseProfiles = [
    [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23],
  ];
  const currentUserProfile = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const newUserProfile = [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5,
    1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];

  expect(rup.calculateUserProfile(exerciseProfiles, currentUserProfile)).toEqual(newUserProfile);
});

test('reviseUserProfile', () => {
  const userProfile = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const newProfileExpected = [0.5, 0.566, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
    0.5, 0.733, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.566];
  const newProfileActual = rup.reviseUserProfile(sampleExerciseSet, userProfile);

  newProfileExpected.forEach((entry, i) => {
    expect(newProfileActual[i]).toBeCloseTo(entry, 2);
  });
});

test('requestBodyUserProfileIsValid number of elements below 23', () => {
  const requestBody = {
    userProfile: [1, 2],
    exerciseSet: [...sampleExerciseSet],
  };
  expect(rup.requestBodyUserProfileIsValid(requestBody)).toBeFalsy();
});

test('requestBodyUserProfileIsValid missing userProfile', () => {
  const requestBody = {
    exerciseSet: [...sampleExerciseSet],
  };
  expect(rup.requestBodyUserProfileIsValid(requestBody)).toBeFalsy();
});

test('requestBodyUserProfileIsValid valid userProfile', () => {
  const requestBody = {
    userProfile: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    exerciseSet: [...sampleExerciseSet],
  };
  expect(rup.requestBodyUserProfileIsValid(requestBody)).toBeTruthy();
});

test('requestBodyExerciseSetIsValid missing exerciseSet', () => {
  const requestBody = {
    userProfile: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  };
  expect(rup.requestBodyExerciseSetIsValid(requestBody)).toBeFalsy();
});

test('requestBodyExerciseSetIsValid valid requestBody', () => {
  const requestBody = {
    userProfile: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    exerciseSet: [...sampleExerciseSet],
  };
  expect(rup.requestBodyExerciseSetIsValid(requestBody)).toBeTruthy();
});

test('requestBodyIsValid valid requestBody', () => {
  const requestBody = {
    userProfile: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    exerciseSet: [...sampleExerciseSet],
  };
  expect(rup.requestBodyIsValid(requestBody)).toBeTruthy();
});

test('requestBodyIsValid invalid requestBody', () => {
  const requestBody = {
    userProfile: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    exerciseSet: [...sampleExerciseSet],
  };
  delete requestBody.exerciseSet[0].facit;
  expect(rup.requestBodyIsValid(requestBody)).toBeFalsy();
});
