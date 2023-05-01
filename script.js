//открытие и зактрытие основного попапа
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
editButton.addEventListener('click', function openPopup() {
    popup.classList.add('popup_opened');
});
let closeIcon = popup.querySelector('.popup__close-icon');
closeIcon.addEventListener('click', function closePopup() {
    popup.classList.remove('popup_opened');
});

//изменение имени в форме
const form = document.querySelector('.form');
const formName = form.querySelector('.form__input_theme_name');
const formDescription = form.querySelector('.form__input_theme_description');
const buttonSubmit = form.querySelector('.form__button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

buttonSubmit.addEventListener('click', function formSubmit(evt){
    evt.preventDefault();
    profileTitle.textContent = formName.value;
    profileSubtitle.textContent = formDescription.value;
    popup.classList.remove('popup_opened');
    });
    
// likes

let cardLike = document.querySelectorAll('.card__like');
cardLike.forEach((item) => item.addEventListener('click', function addClass(){
    item.classList.toggle('card__like_active');
    console.log('clicked');
    }));


