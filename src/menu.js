const popup = document.querySelector('.nav');
const openButton = document.querySelector('.menu__button');
const burgerIcon = document.querySelector('.menu__burger-icon');
const closeIcon = document.querySelector('.menu__close-icon');
openButton.addEventListener('click', function(evt) {
  if (popup.classList.contains('hide')) {
      popup.classList.add('show');
      popup.classList.remove('hide');
      burgerIcon.style.display = "none";
      closeIcon.style.display = "block";
  }else{
    popup.classList.add('hide');
    popup.classList.remove('show');
    burgerIcon.style.display = "block";
    closeIcon.style.display = "none";
  }
});