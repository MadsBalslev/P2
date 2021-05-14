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
    })
    .catch((error) => reject(error));
});

const getUserExerciseSetFromServer = () => new Promise((resolve, reject) => {
  const baseUrl = window.location.href;
  const exerciseAmount = document.querySelector('#userExerciseFormAmount').value;
  const requestBody = localStorage.getItem('userProfile');

  fetch(`${baseUrl}generateUserSet`, {
    method: 'POST',
    headers: {
      amount: exerciseAmount,
    },
    body: requestBody,
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => reject(error));
});

const makeServerReviseUserProfile = () => new Promise((resolve, reject) => {
  const baseUrl = window.location.href;
  const jsonRequestBody = {
    userProfile: JSON.parse(localStorage.getItem('userProfile')),
    exerciseSet,
  };
  const stringRequestBody = JSON.stringify(jsonRequestBody);

  fetch(`${baseUrl}reviseUserProfile`, {
    method: 'POST',
    headers: {
    },
    body: stringRequestBody,
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => reject(error));
});
