const timer = document.getElementById('timer');
var hours = 0;
var minutes = 0;
var seconds = 0;
var stoptime = true;

function startTimer() {
  if (stoptime === true) {
        stoptime = false;
        timerCycle();
    }
    else if (exerciseForm) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
  if (stoptime === false) {
    stoptime = true;
  }
}

function timerCycle() {
    if (stoptime === false) {
    seconds = parseInt(seconds);
    minutes = parseInt(minutes);
    hours = parseInt(hours);
    
    seconds++;

    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours ++;
      minutes = 0;
      seconds = 0;
    }

    if (seconds < 10 || seconds === 0) {
      seconds = '0' + seconds;
    }
    if (minutes < 10 || minutes === 0) {
      minutes = '0' + minutes;
    }
    if (hours < 10 || hours === 0) {
      hours = '0' + hours;
    }

    timer.innerHTML = hours + ':' + minutes + ':' + seconds;

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
    seconds = "00"
    minutes = "00"
    hours = "00"
    timer.innerHTML = '00:00:00';
};