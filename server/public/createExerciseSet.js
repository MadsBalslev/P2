document.querySelector('#form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const exerciseSet = await getExerciseSetFromServer(event);
  console.log(exerciseSet);
  buildExercisePage(exerciseSet);
});

const getExerciseSetFromServer = (event) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8080/opgaver', {
      method: 'GET',
      headers: {
        subjects: 'vektor2d',
        amount: 3
      }
    })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

const buildExercisePage = (exerciseSet) => {

};
