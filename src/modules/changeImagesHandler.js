const changeImagesHandler = () => {
  let images = document.querySelectorAll('.command__photo');

  images.forEach((item,) => {
    let defaultImg = item.src
    item.addEventListener('mouseenter', (e) => {
      e.target.src = e.target.dataset.img
    })
    item.addEventListener('mouseleave', (e) => {
      e.target.src = defaultImg;
    })
  })
};

export  default changeImagesHandler;