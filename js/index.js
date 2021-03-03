window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  //Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining(){
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60) % 24,
        days = Math.floor(timeRemaining / 60 / 60 / 24);

      return{ hours, minutes, seconds, days, timeRemaining };
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timer.hours > 0 ? timerHours.textContent = timer.hours : timerHours.textContent = '00';
      timer.minutes > 0 ? timerMinutes.textContent = timer.minutes : timerMinutes.textContent = '00';
      timer.seconds > 0 ? timerSeconds.textContent = timer.seconds : timerSeconds.textContent = '00';
      if(timer.hours > 0 && timer.hours < 10){
        timerHours.insertAdjacentText('afterbegin', '0');
      }
      if(timer.minutes > 0 && timer.minutes < 10){
        timerMinutes.insertAdjacentText('afterbegin', '0');
      }
      if(timer.seconds > 0 && timer.seconds < 10){
        timerSeconds.insertAdjacentText('afterbegin', '0');
      }

      let intervalId = setInterval(updateClock, 1000);
      if(timer.timeRemaining < 0){
        clearInterval(intervalId)
      }

    }
    updateClock();
  }

  countTimer('04 march 2021');

});