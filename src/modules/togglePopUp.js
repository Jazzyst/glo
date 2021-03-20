const togglePopUp = () => {
  const popup = document.querySelector('.popup'),
    popupBtns = document.querySelectorAll('.popup-btn'),
    popupContent = document.querySelector('.popup-content');
  popupContent.style.transform = `translateY(-500px)`;


  const popupAnimateHandler = () => {
    let count = -50,
      animation;
    const show = () => {
      animation = requestAnimationFrame(show);
      count++
      if (count < 0) {
        popupContent.style.transform = `translateY(${count}px)`
      } else {
        cancelAnimationFrame(animation)
      }
    }
    animation = requestAnimationFrame(show);
  }

  popupBtns.forEach(item => item.addEventListener('click', () => {
    popup.style.display = 'block';
    if (document.documentElement.clientWidth > 768) {
      popupAnimateHandler();
    } else {
      popupContent.style.transform = `translateY(0)`
    }
  }));

  popup.addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains('popup-close')) {
      popup.style.display = 'none';
    } else {
      target = target.closest('.popup-content')
      if (!target) {
        popup.style.display = 'none';
      }
    }
  })
};

export default togglePopUp;