const cardIcons = document.querySelectorAll('.card__icon');
const modalWindow = document.querySelector('.modal');
const closeButton = document.querySelector('.form__button');
const cornIcon = document.querySelector('.corn__icon');

for (const cardIcon of cardIcons) {
   
cardIcon.addEventListener('click', function(evt) {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');

   
}
)
}
closeButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
})