let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
editButton.addEventListener('click', function openPopup() {
    popup.classList.add('popup_opened');
});
let closeIcon = popup.querySelector('.popup__close-icon');
closeIcon.addEventListener('click', function closePopup() {
    popup.classList.remove('popup_opened');
});
/*form*/
const form = document.querySelector('.form');
const formName = form.querySelector('.')
const formDescription
