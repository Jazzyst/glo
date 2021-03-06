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
    const menu = document.querySelector('menu'),
      body = document.querySelector('body');

    const handlerMenu = () =>{
      menu.classList.toggle('active-menu');
    };
    body.addEventListener('click', (e)=>{
      let target = e.target;
      if(target.matches('ul>li>a') || target.classList.contains('close-btn') || target.closest('.menu')){
        handlerMenu();
      }else{
        target = target.closest('menu');
        if(!target){
          menu.classList.remove('active-menu')
        }
      }
    })

  };

  toggleMenu();

  //popup

  const togglePopUp = () =>{
    const popup = document.querySelector('.popup'),
      popupBtns = document.querySelectorAll('.popup-btn'),
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

    popup.addEventListener('click', (e)=>{
      let target = e.target;
      if(target.classList.contains('popup-close')){
        popup.style.display = 'none';
      }else{
        target = target.closest('.popup-content')
        if(!target){
          popup.style.display = 'none';
        }
      }
    })
  };

  togglePopUp();

  //Tabs

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
    tabs = tabHeader.querySelectorAll('.service-header-tab'),
    tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) =>{
      for(let i = 0; i < tabContent.length; i++){
        if (index === i){
          tabs[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        }else{
          tabs[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (e) =>{
      let target = e.target;
        target = target.closest('.service-header-tab');

        if(target){
          tabs.forEach((item, i) =>{
            if(item === target){
              toggleTabContent(i);
            }
          });
        }
    })
  };

  tabs();

});