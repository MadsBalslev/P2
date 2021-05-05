const rup = require('./reviseUserProfile');

const sampleExercise = {
  txt: 'Find x i følgende ligning.',
  type: 'ligninger_C',
  point: 5,
  tegn: '-',
  exerciseVars: {
    ligning: '11x - 14 = 29',
  },
  facit: '3.9',
  questionNumber: 1,
  questionAnswers: '3.9',
};

test('isUserProfileValidVector thruthy', () => {
  const validUserProfile = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  expect(rup.isUserProfileValidVector(validUserProfile)).toBeTruthy();
});

test('isUserProfileValidVector falsy', () => {
  const invalidUserProfile = [1, 2, 3, 4, 5, 6, 7, 8, 'string', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  expect(rup.isUserProfileValidVector(invalidUserProfile)).toBeFalsy();
});

test('validateEachExerciseInExerciseSet valid input', () => {
  const validExercise = [sampleExercise];
  expect(rup.validateEachExerciseInExerciseSet(validExercise)).toBeTruthy();
});

test('validateEachExerciseInExerciseSet empty object', () => {
  const invalidExercise = [{}];
  expect(rup.validateEachExerciseInExerciseSet(invalidExercise)).toBeFalsy();
});

test('validateEachExerciseInExerciseSet typeof facit invalid', () => {
  const invalidExerciseSet = [sampleExercise];
  invalidExerciseSet[0].facit = 3.9;
  expect(rup.validateEachExerciseInExerciseSet(invalidExerciseSet)).toBeFalsy();
});

test('validateEachExerciseInExerciseSet typeof questionAnswer invalid', () => {
  const invalidExerciseSet = [sampleExercise];
  invalidExerciseSet[0].questionAnswers = 3.9;
  expect(rup.validateEachExerciseInExerciseSet(invalidExerciseSet)).toBeFalsy();
});

test('validateEachExerciseInExerciseSet typeof type invalid', () => {
  const invalidExerciseSet = [sampleExercise];
  invalidExerciseSet[0].type = 666;
  expect(rup.validateEachExerciseInExerciseSet(invalidExerciseSet)).toBeFalsy();
});

test('scalarMultiplication', () => {
  const scalar = 0.5;
  const vector = [2, 4, 6, 10, 3];

  expect(rup.scalarMultiplication(scalar, vector)).toEqual([1, 2, 3, 5, 1.5]);
});

test('isCorrectAnswer correct answer', () => {
  const exerciseWithCorrectAnswer = sampleExercise;
  expect(rup.isCorrectAnswer(exerciseWithCorrectAnswer)).toBeTruthy();
});

test('isCorrectAnswer wrong answer', () => {
  const exerciseWithWrongAnswer = sampleExercise;
  exerciseWithWrongAnswer.questionAnswers = 'something wrong';
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
