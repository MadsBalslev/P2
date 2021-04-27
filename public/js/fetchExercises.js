/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * Gets the generated exercise set from the server.
 * @param event
 * @returns New promise for a resolve or reject.
 */
const getExerciseSetFromServer = () => new Promise((resolve, reject) => {
  const baseUrl = window.location.href;
  const exerciseAmount = document.querySelector('#amount').value;
  const exerciseSubjects = getExerciseSubjects();

  fetch(`${baseUrl}opgaver`, {
    method: 'GET',
    headers: {
      subjects: exerciseSubjects,
      amount: exerciseAmount,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      console.log(exerciseSubjects);
    })
    .catch((error) => reject(error));
});
