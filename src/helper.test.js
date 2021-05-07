const helper = require('./helper.js');

describe('isUserProfileValidVector', () => {
  test('isUserProfileValidVector thruthy', () => {
    const validUserProfile = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    expect(helper.isUserProfileValidVector(validUserProfile)).toBeTruthy();
  });

  test('isUserProfileValidVector falsy', () => {
    const invalidUserProfile = [1, 2, 3, 4, 5, 6, 7, 8, 'string', 10, 11, 12, 13, 14, 15, 16, 17,
      18, 19, 20, 21, 22, 23];
    expect(helper.isUserProfileValidVector(invalidUserProfile)).toBeFalsy();
  });
});
