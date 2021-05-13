const dbConnection = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
};

function cosineSimilarity(vectorA, vectorB) {
  return dotProduct(vectorA, vectorB) / (lengthOfVector(vectorA) * lengthOfVector(vectorB));
}

function dotProduct(vectorA, vectorB) {
  let dotProductProcedual = 0;
  vectorA.forEach((element, i) => {
    dotProductProcedual += vectorA[i] * vectorB[i];
  });
  return dotProductProcedual;
}

function lengthOfVector(vector) {
  let temp = 0;
  vector.forEach((element) => {
    temp += element ** 2;
  });
  return Math.sqrt(temp);
}

describe('dotProduct', () => {
  test('dotProduct 1', () => {
    const vector = [1, 2, 3];
    expect(gus.dotProduct(vector, vector)).toBe(14);
  });

  test('dotProduct 2', () => {
    const vectorA = [42, 11, 14];
    const vectorB = [83, 15, 89];
    expect(gus.dotProduct(vectorA, vectorB)).toBe(4897);
  });

  test('dotProduct 3', () => {
    const vectorA = [18, -52, -45];
    const vectorB = [-43, -51, -98];
    expect(gus.dotProduct(vectorA, vectorB)).toBe(6288);
  });
});

describe('lenghtOfVector', () => {
  test('lenghtOfVector 1', () => {
    const vector = [1, 2, 3];
    expect(gus.lengthOfVector(vector)).toBeCloseTo(3.741657387);
  });

  test('lenghtOfVector 2', () => {
    const vector = [42, 11, 14];
    expect(gus.lengthOfVector(vector)).toBeCloseTo(45.61797891);
  });

  test('lenghtOfVector 3', () => {
    const vector = [18, -52, -45];
    expect(gus.lengthOfVector(vector)).toBeCloseTo(71.08445681);
  });
});

describe('cosineSimilarity', () => {
  test('cosineSimilarity 1', () => {
    const vector = [1, 2, 3];
    expect(gus.cosineSimilarity(vector, vector)).toBeCloseTo(1);
  });

  test('cosineSimilarity 2', () => {
    const vectorA = [42, 11, 14];
    const vectorB = [83, 15, 89];
    expect(gus.cosineSimilarity(vectorA, vectorB)).toBeCloseTo(0.8754721752);
  });

  test('cosineSimilarity 3', () => {
    const vectorA = [18, -52, -45];
    const vectorB = [-43, -51, -98];
    expect(gus.cosineSimilarity(vectorA, vectorB)).toBeCloseTo(0.7461702151);
  });
});
