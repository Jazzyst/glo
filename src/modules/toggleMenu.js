const toggleMenu = () => {
  const menu = document.querySelector('menu'),
    body = document.querySelector('body');

  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };
  body.addEventListener('click', (e) => {
    let target = e.target;
    if (target.matches('ul>li>a') || target.classList.contains('close-btn') || target.closest('.menu')) {
      handlerMenu();
    } else {
      target = target.closest('menu');
      if (!target) {
        menu.classList.remove('active-menu')
      }
    }
  })

};

export  default toggleMenu;