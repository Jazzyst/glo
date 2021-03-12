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


  //slider

  const slider = () => {
    const slides = document.querySelectorAll('.portfolio-item'),
      slider = document.querySelector('.portfolio-content'),
      dotsWrap = document.querySelector('.portfolio-dots');


    for(let i = 0; i < slides.length; i++){
      let dot = document.createElement('li');
      dot.classList.add('dot');
      dotsWrap.append(dot);
    }

    let dots = document.querySelectorAll('.dot');
    dots[0].classList.add('dot-active');

    let currentSlide = 0,
    interval;

    const prevSlide = (elem, index, strClass) =>{
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) =>{
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () =>{
      prevSlide(slides, currentSlide, 'portfolio-item-active');
      prevSlide(dots, currentSlide, 'dot-active')
      currentSlide++;
      if (currentSlide >=slides.length){
        currentSlide = 0;
      }
      nextSlide(slides, currentSlide, 'portfolio-item-active');
      nextSlide(dots,currentSlide, 'dot-active');
    };

    const startSlide = (time = 1500) =>{
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () =>{
      clearInterval(interval);
    };

    slider.addEventListener('click', (e)=>{
      e.preventDefault();
      let target = e.target;

      if(!target.matches('.portfolio-btn, .dot')){
        return;
      }

      prevSlide(slides, currentSlide, 'portfolio-item-active');
      prevSlide(dots,currentSlide, 'dot-active')

      if(target.matches('#arrow-right')){
        currentSlide++;
      }else if(target.matches('#arrow-left')){
        currentSlide--;
      }else if(target.matches('.dot')){
        dots.forEach((item, i)=> {
          if(item === target){
            currentSlide = i;
          }
        })
      }

      if(currentSlide >=slides.length){
        currentSlide = 0;
      }
      if(currentSlide < 0){
        currentSlide = slides.length -1;
      }

      nextSlide(slides, currentSlide, 'portfolio-item-active');
      nextSlide(dots,currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (e)=>{
      if(e.target.matches('.portfolio-btn') || e.target.matches('.dot') ){
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (e)=>{
      if(e.target.matches('.portfolio-btn') || e.target.matches('.dot') ){
        startSlide();
      }
    })

    startSlide(2000);

  };

  slider();


  //changeImagesHandler

  const changeImagesHandler = () =>{
    let images = document.querySelectorAll('.command__photo');

    images.forEach((item,)=>{
      let defaultImg = item.src
      item.addEventListener('mouseenter', (e) =>{
        e.target.src = e.target.dataset.img
      })
      item.addEventListener('mouseleave', (e) =>{
        e.target.src = defaultImg;
      })
    })
  }
  changeImagesHandler();

  //validate inputs

  const validateInputs = () =>{
    const calcBlock = document.querySelector('.calc-block'),
      calcBlockInputs = calcBlock.querySelectorAll('input'),
      body = document.querySelector('body');


    calcBlockInputs.forEach((item)=>{
      item.addEventListener('input', ()=>{
        item.value = item.value.replace(/\D/g, '');
      })
    });

    body.addEventListener('blur', (e)=>{
      let target = e.target;

      if(target.matches('input[name=user_message]')){
        target.value = target.value.replace(/[^а-я\s-,.!?]/ig, '').replace(/\s+/g, ' ').replace(/\-+/g, '-').replace(/^-+|-+$/g, '').replace(/^\s|\s$/g, '');
        target.value = target.value.charAt(0).toUpperCase() + target.value.slice(1).trim();
      }

      if(target.matches('input[name=user_name]')){
        target.value = target.value.replace(/[^а-я\s-]/ig, '').replace(/\s+/g, ' ').replace(/\-+/g, '-').replace(/^-+|-+$/g, '').replace(/^\s/g, '').trim();

        target.value = target.value.toLowerCase()
          .split(' ')
          .map((word) =>{
            if(word !== ''){
              return word[0].toUpperCase() + word.substr(1);
            }
          })
          .join(' ');
      }

      if(target.matches('input[name=user_email]')){
        target.value = target.value.toLowerCase().replace(/[^a-z@-_.!~*']/ig, '').replace(/\^/g, '').replace(/^-+|-+$/g, '').replace(/^\s|\s$/g, '');
      }

      if(target.matches('input[name=user_phone]')){
        target.value = target.value.replace(/[^0-9 ()-]/ig, '').replace(/\-+/g, '-').replace(/^-+|-+$/g, '').trim();
      }
    }, true);


  }

  validateInputs();
});