

//открытие и зактрытие основного попапа
const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const popup = page.querySelector('.popup');
const popupEditProfile = page.querySelector('.popup_theme_edit'); //попап редактирования профиля
const popupAddCard = page.querySelector('.popup_theme_add-card');
const addButton = profile.querySelector('.profile__add-button'); //кнопка добавления карточки
const closeIconAdd = page.querySelector('.popup__close-icon_add-card');  // закрытие окна добавления карточки
const closeIcon = popup.querySelector('.popup__close-icon'); // общяя кнопка закрытия окна (?)
const closeIconEdit = popup.querySelector('.popup__close-icon_edit');  // закрытие окна редактирования профиля

function openPopup(popupName) {                                   //функция открыть попап
    popupName.classList.add('popup_opened');}

editButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
});
addButton.addEventListener('click', () => {
    openPopup(popupAddCard)});

function closePopup(popupName) {
    popupName.classList.remove('popup_opened')};     
                                                      //функция закрыть попап
 closeIconEdit.addEventListener('click', () => {
    closePopup(popupEditProfile)});
 closeIconAdd.addEventListener('click', () => {
    closePopup(popupAddCard)});
 

//изменение имени в форме редактирования профиля
//const form = document.querySelector('.form');
const formEdit = page.querySelector('.form_edit');
const formName = formEdit.querySelector('.form__input_theme_name');
const formDescription = formEdit.querySelector('.form__input_theme_description');
const buttonSubmit = formEdit.querySelector('.form__button_submit');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

buttonSubmit.addEventListener('click', function submitForm(evt){
    evt.preventDefault();
    profileTitle.textContent = formName.value;
    profileSubtitle.textContent = formDescription.value;
    popupEditProfile.classList.remove('popup_opened');
    });


   /* // добавление карточек на страницу пользователем 
const formAdd = page.querySelector('.form_add-card');
const formNameCard = formAdd.querySelector('.form__input_theme_name-card');
const formLink = formAdd.querySelector('.form__input_theme_link');
const buttonCreate = formAdd.querySelector('.form__button_create');

/*buttonCreate.addEventListener('click', function createForm(evt){
    evt.preventDefault();
    
})

console.log(buttonCreate)*/

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

//Создание карточки

const cardContainer = page.querySelector('.cards');
const cardTemplate = page.querySelector('#template-card').content; //добавили template
const addCard = function(cardName, cardLink){
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);  //клонировали карточку
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

 // добавление карточек на страницу пользователем 
 const formAdd = page.querySelector('.form_add-card');
 const formNameCard = formAdd.querySelector('.form__input_theme_name-card');
 const formLink = formAdd.querySelector('.form__input_theme_link');
 const buttonCreate = formAdd.querySelector('.form__button_create');
 
 buttonCreate.addEventListener('click', function createForm(evt){
     evt.preventDefault();
     const userCardName = formNameCard.value;
     const userCardLink = formLink.value;
     addCard(userCardName, userCardLink);
     popupAddCard.classList.remove('popup_opened');
     
 })

// Лайки
const cardLike = page.querySelectorAll('.card__like');
cardLike.forEach((item) => item.addEventListener('click', function addClass(){
    item.classList.toggle('card__like_active');
    }));