const { generateExcerciseSet } = require('./generator');

const empty = '';
const allCategories = ['andengradspolynomiumOgLigning',
  'talOgegnearter',
  'ligninger',
  'trigonometri',
  'funktioner',
  'geometri',
  'differebtialregning',
  'sandsynlighedOgKombinatorik',
  'statistik',
  'regression',
  'vektor2d',
  'vektorerI3d',
  'vektorfunktioner',
  'infinitesimalregning',
  'integralregning',
  'funktionerAfToVariable'];

test('generateExerciseSet', () => {
  const numberOfExercises = 10;
  const categories = allCategories;

  const exerciseSet = generateExcerciseSet(categories, numberOfExercises);

  exerciseSet.forEach((exercise) => {
    if (errorInExerciseFields(exercise)) {
      console.info(`error in exercise: ${exercise.txt}`);
      console.info(`exercise type was: ${exercise.type}`);
    }

    expect(typeof exercise.facit).toBe('string');
    expect(typeof exercise.type).toBe('string');
    expect(typeof exercise.point).toBe('number');
    expect(typeof exercise.txt).toBe('string');
    expect(typeof exercise.tegn).toBe('string');

    expect(exercise.txt).not.toBe(empty);
    expect(exercise.type).not.toBe(empty);
  });
});

function errorInExerciseFields(exercise) {
  return typeof exercise.facit !== 'string'
    || typeof exercise.type !== 'string'
    || typeof exercise.point !== 'number'
    || typeof exercise.txt !== 'string'
    || typeof exercise.tegn !== 'string'
    || exercise.txt === empty
    || exercise.type === empty;
}
