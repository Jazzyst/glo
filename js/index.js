window.addEventListener('DOMContentLoaded',  () => {
  'use strict';

  //Timer
  const countTimer = (deadline) =>{
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () =>{
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60) % 24,
        days = Math.floor(timeRemaining / 60 / 60 / 24);

      return{ hours, minutes, seconds, days, timeRemaining };
    }

    const updateClock = () => {
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

  countTimer('05 march 2021');

  //Menu
  const toggleMenu = () =>{
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () =>{
      menu.classList.toggle('active-menu');
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach( item => item.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  //popup

  const togglePopUp = () =>{
    const popup = document.querySelector('.popup'),
      popupBtns = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close'),
      popupContent = document.querySelector('.popup-content');
      popupContent.style.transform = `translateY(-500px)`;


      const popupAnimateHandler = () =>{
        let count = -50,
          animation;
        const show = () =>{
          animation = requestAnimationFrame(show);
          count++
          if(count <0 ){
            popupContent.style.transform = `translateY(${count}px)`
          }else{
            cancelAnimationFrame(animation)
          }
        }
        animation = requestAnimationFrame(show);
      }



      popupBtns.forEach(item => item.addEventListener('click', ()=>{
        popup.style.display = 'block';
        if(document.documentElement.clientWidth > 768){
          popupAnimateHandler();
        }else{
          popupContent.style.transform = `translateY(0)`
        }
      }));

      popupClose.addEventListener('click', ()=>{
        popup.style.display = 'none';
      })
  };

  togglePopUp();

});