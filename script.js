//открытие и зактрытие основного попапа
const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const addButton = profile.querySelector('.profile__add-button');  //кнопка добавления карточки
const popup = page.querySelector('.popup');
const popupEditProfile = page.querySelector('.popup_theme_edit');
const popupAddCard = page.querySelector('.popup_theme_add-card'); // 2 попапа
function openPopup() {
    popup.classList.add('popup_opened');}

editButton.addEventListener('click', openPopup);
const closeIcon = popup.querySelector('.popup__close-icon');
closeIcon.addEventListener('click', function closePopup() {
    popup.classList.remove('popup_opened');
});
addButton.addEventListener('click', openPopup);

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


    // добавление карточки на страницу


    //массив из содержимого карточек

    const contentCards = [
        {
            name: 'Архыз',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
          name: 'Челябинская область',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
          name: 'Иваново',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
          name: 'Камчатка',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
          name: 'Холмогорский район',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
          name: 'Байкал',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
      ];
/*const contentCardsNames = contentCards.map(item => {
    return item.name;
})                                                      //массивы отдельно с именами и ссылками
const contentCardsLinks = contentCards.map(item => {
    return item.link;
})*/

//Создание карточки

const cardContainer = page.querySelector('.cards');
const cardTemplate = page.querySelector('#template-card').content; //добавили template
const addCard = function(cardName, cardLink){
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);  //клонировали карточку
    //const newCardText = cardTemplate.querySelector('.card__text');  //текст карточки
    const newCardName = newCard.querySelector('.card__title'); // Название карточки
    const newCardImage = newCard.querySelector('.card__image');  // картинка карточки
    newCardName.textContent = cardName; // добавление заголовка карточки
    newCardImage.src = cardLink;  //ссылка на картинку карточки (значение из формы)
    newCardImage.alt = cardName;
    cardContainer.append(newCard);
};

// добавление карточек на страницу

contentCards.forEach(info => {
    addCard(info.name, info.link);
})


// Лайки
const cardLike = page.querySelectorAll('.card__like');
cardLike.forEach((item) => item.addEventListener('click', function addClass(){
    item.classList.toggle('card__like_active');
    }));