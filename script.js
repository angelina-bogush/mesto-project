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
let formName = form.querySelector('.form__input_theme_name');
let formDescription = form.querySelector('.form__input_theme_description');
const buttonSubmit = form.querySelector('.form__button');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');

buttonSubmit.addEventListener('click', function formSubmit(evt){
    evt.preventDefault();
    profileTitle.textContent = formName.value;
    profileSubtitle.textContent = formDescription.value;
    popup.classList.remove('popup_opened');
    });