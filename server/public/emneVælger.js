const eksamnessætTypeVælger = document.querySelector('#eksamenssætTypeVælger');
const emneVælger = document.querySelector('#emneVælger');

eksamnessætTypeVælger.addEventListener('input', () => {
  if (eksamnessætTypeVælger.value === 'emneBestemt') {
    emneVælger.removeAttribute('hidden');
  } else if (eksamnessætTypeVælger.value !== 'emneBestemt') {
    emneVælger.setAttribute('hidden', '');
  }
});
