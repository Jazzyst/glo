const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

  const forms = document.querySelectorAll('form');
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size:2rem';

  forms.forEach( (form)=>{
    const elementsForm = [...form.elements].filter(item =>{
      return item.tagName.toLowerCase() !=='BUTTON' && item.type !== 'submit';
    });
    elementsForm.forEach(item => item.required = true);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      form.append(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form)
      let body ={};
      formData.forEach((val, key) =>{
        body[key] = val;
      });
      const popup = document.querySelector('.popup');
      postData(body)
        .then((response)=>{
          if(response.status !== 200){
            throw new Error('status network not 200');
          }
          statusMessage.textContent = successMessage;
          setTimeout(()=>{
            statusMessage.style.display = 'none';
          },2000);

          elementsForm.forEach(elem => elem.value = '');
          if(popup){
            statusMessage.style.color = '#ffffff';

            setTimeout(()=>{
              popup.style.display='none';
            },2000);

          }
        })
        .catch(error => {
          statusMessage.textContent = errorMessage;
          console.log(error)
        });
    });
  })

  const postData = (body)=>{
    return fetch('./server.php', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }
};

export default sendForm;