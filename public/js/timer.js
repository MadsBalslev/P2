/**
 * Converts the time into a string
 * @param {number} time Takes the time
 * @returns {string} Returns the time in string format
 */
function timeToString(time) {
  const diffInHrs = time / 3600000;
  const hours = Math.floor(diffInHrs);

  const diffInMin = (diffInHrs - hours) * 60;
  const minutes = Math.floor(diffInMin);

  const diffInSec = (diffInMin - minutes) * 60;
  const seconds = Math.floor(diffInSec);

  const formattedHrs = hours.toString().padStart(2, '0');
  const formattedMM = minutes.toString().padStart(2, '0');
  const formattedSS = seconds.toString().padStart(2, '0');

  return `${formattedHrs}:${formattedMM}:${formattedSS}`;
}

let startTime;
let elapsedTime = 0;
let timerInterval;

/**
* Create function to modify innerHTML
* @param {string} txt Takes the txt string
*/

function print(txt) {
  document.getElementById('display').innerHTML = txt;
}

/**
* Create 'start'
*/
function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
  showButton('PAUSE');
}

/**
* Create 'pause'
*/
function pause() {
  clearInterval(timerInterval);
  showButton('PLAY');
}

/**
* Create 'reset'
*/
function reset() {
  clearInterval(timerInterval);
  print('00:00:00');
  elapsedTime = 0;
  showButton('PLAY');
}

/**
* Create function to display buttons and take their input
* @param {string} buttonKey Takes the input from the button
*/
function showButton(buttonKey) {
  const buttonToShow = buttonKey === 'PLAY' ? playButton : pauseButton;
  const buttonToHide = buttonKey === 'PLAY' ? pauseButton : playButton;
  buttonToShow.style.display = 'block';
  buttonToHide.style.display = 'none';
}

const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');

playButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
