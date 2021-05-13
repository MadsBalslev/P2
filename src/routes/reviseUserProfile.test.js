const rup = require('./reviseUserProfile');

const sampleExercise1 = {
  txt: 'Find x i følgende ligning.',
  type: 'vektor3d',
  facit: '3.9',
  questionAnswers: '3.9',
};

const sampleExercise2 = {
  txt: 'sample text',
  type: 'statistik',
  facit: 'correct answer',
  questionAnswers: 'correct answer',
};

const sampleExercise3 = {
  txt: 'sample text',
  type: 'trigonometri',
  facit: 'wrong answer',
  questionAnswers: 'correct answer',
};

const sampleExerciseSet = [sampleExercise1, sampleExercise2, sampleExercise3];

describe('validateEachExerciseInExerciseSet', () => {
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
});

describe('isCorrectAnswer', () => {
  test('isCorrectAnswer correct answer', () => {
    const exerciseWithCorrectAnswer = { ...sampleExercise1 };
    expect(rup.isCorrectAnswer(exerciseWithCorrectAnswer)).toBeTruthy();
  });

  test('isCorrectAnswer wrong answer', () => {
    const exerciseWithWrongAnswer = { ...sampleExercise1 };
    exerciseWithWrongAnswer.questionAnswers = 'wrong answer';
    expect(rup.isCorrectAnswer(exerciseWithWrongAnswer)).toBeFalsy();
  });
});

describe('sumVectorArray', () => {
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
    expect(rup.sumVectorArray(exerciseP)).toEqual([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
      3, 3, 3, 3, 3, 3, 3]);
  });
});

describe('convertExerciseSetToExerciseProfiles', () => {
  test('convertExerciseSetToExerciseProfiles', () => {
    const exSet = [{ ...sampleExercise1 }, { ...sampleExercise1 }];
    exSet[1].questionAnswers = 'wrong answer';
    const testVector = [
      [0, rup.CORRECT_ANSWER_WEIGHT, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, rup.WRONG_ANSWER_WEIGHT, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    expect(rup.convertExerciseSetToExerciseProfiles(exSet)).toEqual(testVector);
  });
});

describe('calculateExerciseProfile', () => {
  test('calculateExerciseProfile correct answer', () => {
    const exerciseWithCorrectAnswer = { ...sampleExercise1 };
    expect(rup.calculateExerciseProfile(exerciseWithCorrectAnswer))
      .toEqual([0, rup.CORRECT_ANSWER_WEIGHT, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  test('calculateExerciseProfile wrong answer', () => {
    const exerciseWithWrongAnswer = { ...sampleExercise1 };
    exerciseWithWrongAnswer.questionAnswers = 'wrong answer';
    expect(rup.calculateExerciseProfile(exerciseWithWrongAnswer))
      .toEqual([0, rup.WRONG_ANSWER_WEIGHT, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});

describe('calculateUserProfile', () => {
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
});

describe('reviseUserProfile', () => {
  test('reviseUserProfile', () => {
    const userProfile = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const newProfileExpected = [0.5, 0.5666666667, 0.5, 0.5, 0.5, 0.5, 0.5666666667, 0.5, 0.7333333333, 0.5, 0.5];
    const newProfileActual = rup.reviseUserProfile(sampleExerciseSet, userProfile);

    newProfileExpected.forEach((entry, i) => {
      expect(newProfileActual[i]).toBeCloseTo(entry);
    });
  });
});

describe('requestBodyUserProfileIsValid', () => {
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
      userProfile: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      exerciseSet: [...sampleExerciseSet],
    };
    expect(rup.requestBodyUserProfileIsValid(requestBody)).toBeTruthy();
  });

  test('requestBodyUserProfileIsValid userProfile is number', () => {
    const requestBody = {
      userProfile: 5,
      exerciseSet: [...sampleExerciseSet],
    };
    expect(rup.requestBodyUserProfileIsValid(requestBody)).toBeFalsy();
  });

  test('requestBodyUserProfileIsValid userProfile is boolean', () => {
    const requestBody = {
      userProfile: true,
      exerciseSet: [...sampleExerciseSet],
    };
    expect(rup.requestBodyUserProfileIsValid(requestBody)).toBeFalsy();
  });

  test('requestBodyUserProfileIsValid userProfile is object', () => {
    const requestBody = {
      userProfile: { temp1: 1, temp2: 2 },
      exerciseSet: [...sampleExerciseSet],
    };
    expect(rup.requestBodyUserProfileIsValid(requestBody)).toBeFalsy();
  });

  test('requestBodyUserProfileIsValid userProfile is string', () => {
    const requestBody = {
      userProfile: 'string',
      exerciseSet: [...sampleExerciseSet],
    };
    expect(rup.requestBodyUserProfileIsValid(requestBody)).toBeFalsy();
  });
});

describe('requestBodyExerciseSetIsValid', () => {
  test('requestBodyExerciseSetIsValid missing exerciseSet', () => {
    const requestBody = {
      userProfile: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
    expect(rup.requestBodyExerciseSetIsValid(requestBody)).toBeFalsy();
  });

  test('requestBodyExerciseSetIsValid valid requestBody', () => {
    const requestBody = {
      userProfile: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      exerciseSet: [...sampleExerciseSet],
    };
    expect(rup.requestBodyExerciseSetIsValid(requestBody)).toBeTruthy();
  });
});

describe('requestBodyIsValid', () => {
  test('requestBodyIsValid valid requestBody', () => {
    const requestBody = {
      userProfile: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      exerciseSet: [...sampleExerciseSet],
    };
    expect(rup.requestBodyIsValid(requestBody)).toBeTruthy();
  });

  test('requestBodyIsValid invalid requestBody', () => {
    const requestBody = {
      userProfile: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      exerciseSet: [...sampleExerciseSet],
    };
    delete requestBody.exerciseSet[0].facit;
    expect(rup.requestBodyIsValid(requestBody)).toBeFalsy();
  });
});
