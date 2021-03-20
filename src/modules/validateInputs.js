const validateInputs = () => {
  const calcBlock = document.querySelector('.calc-block'),
    calcBlockInputs = calcBlock.querySelectorAll('input'),
    body = document.querySelector('body');


  calcBlockInputs.forEach((item) => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/g, '');
    })
  });

  body.addEventListener('input', (e) => {
    let target = e.target;

    if (target.matches('input[name=user_message]')) {
      target.value = target.value.replace(/[^а-я\s\d-,.!?]/ig, '').replace(/\s+/g, ' ').replace(/\-+/g, '-').replace(/^-+|-+$/g, '').replace(/^\s/g, '');
      target.value = target.value.charAt(0).toUpperCase() + target.value.slice(1);
    }

    if (target.matches('input[name=user_name]')) {
      target.value = target.value.replace(/[^а-я\s-]/ig, '').replace(/\s+/g, ' ').replace(/\-+/g, '-').replace(/^-+|-+$/g, '').replace(/^\s/g, '');

      target.value = target.value.toLowerCase()
        .split(' ')
        .map((word) => {
          if (word !== '') {
            return word[0].toUpperCase() + word.substr(1);
          }
        })
        .join(' ');
    }

    if (target.matches('input[name=user_email]')) {
      if(!target.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        target.value === '';
      }
    }

    if (target.matches('input[name=user_phone]')) {

      target.value = target.value.replace(/^\+?[78]([-()]*\d){10}$/, '').replace(/\++/g, '+').replace(/^-+|-+$/g, '').trim();
    }
  }, true);


};

export  default validateInputs;