//открытие и зактрытие основного попапа
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
editButton.addEventListener('click', function openPopup() {
    popup.classList.add('popup_opened');
});
const closeIcon = popup.querySelector('.popup__close-icon');
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

//добавление карточки

const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#template-card').content; //добавили template
const newCard = cardTemplate.querySelector('.card').cloneNode(true);  //клонировали карточку

const newCardText = cardTemplate.querySelector('.card__text');  //текст карточки
const newCardImage = newCard.querySelector('.card__image');  // картинка карточки
const newCardLike = newCardText.querySelector('button');
newCardImage.src ='/images/zenit.jpg';  //ссылка на картинку карточки (значение из формы)
newCardImage.alt = 'Газпром-Арена'; //значение из формы ???

newCardText.querySelector('.card__title').textContent = //значение из формы (заголовок)
cardContainer.append(newCard); // добавили карточку на страницу

cardContainer.append(newCard);



/*function addCard(newCard){
    cardContainer.append(newCard)
}*/

//likes
const cardLike = document.querySelectorAll('.card__like');
cardLike.forEach((item) => item.addEventListener('click', function addClass(){
    item.classList.toggle('card__like_active');
    console.log('clicked');
    }));