

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


  //массив из содержимого карточек

    const contentCards = [
        {
            name: 'Петергоф',
          link: 'https://images.unsplash.com/photo-1635700453672-8e93c5f2e280?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
        },
        {
          name: 'Исаакиевский Собор',
          link: 'https://images.unsplash.com/photo-1555460285-763ba96917d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
        },
        {
          name: 'Лахта центр',
          link: 'https://images.unsplash.com/photo-1539203645471-3ae5d31e0eca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80'
        },
        {
          name: 'Казанский собор',
          link: 'https://images.unsplash.com/photo-1551005756-fd0657e8fbf2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2FpbnQlMjBwZXRlcnNidXJnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
        },
        {
          name: 'Невский проспект',
          link: 'https://images.unsplash.com/photo-1626103254920-d8c4069554da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTl8fHNhaW50JTIwcGV0ZXJzYnVyZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
        },
        {
          name: 'Пушкин',
          link: 'https://images.unsplash.com/photo-1573551673739-6075df0508c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fHNhaW50JTIwcGV0ZXJzYnVyZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
        }
      ];

//Создание карточки
const cardContainer = page.querySelector('.cards');
const cardTemplate = page.querySelector('#template-card').content; //добавили template
const createCard = function(cardName, cardLink){
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);  //клонировали карточку
    const newCardName = newCard.querySelector('.card__title'); // Название карточки
    const newCardImage = newCard.querySelector('.card__image');  // картинка карточки
    newCardName.textContent = cardName; // добавление заголовка карточки
    newCardImage.src = cardLink;  //ссылка на картинку карточки (значение из формы)
    newCardImage.alt = cardName;
    return newCard;
};
const addCard = function(cardName, cardLink) {
  const newCard = createCard(cardName, cardLink);
  const cardLike = newCard.querySelectorAll('.card__like');
  const buttonTrash = newCard.querySelectorAll('.card__trash');
  const cardImage = newCard.querySelectorAll('.card__image');
  /*cardImage.forEach((item) => item.addEventListener('click', () => {
    openPopup(...)
  })*/
  /*cardLike.addEventListener('click', function addClass(){
    cardLike.classList.toggle('card__like_active');          
      });*/
  cardLike.forEach((item) => item.addEventListener('click', function addClass(evt){
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like_active');           //лайк
      }));

  buttonTrash.forEach((item) => item.addEventListener('click', function deleteCard(){
      const cardToDelete = document.querySelector('.card');
      cardToDelete.remove();                                  //удаление карточки
     }));

  cardContainer.prepend(newCard)};

contentCards.forEach(info => {
  addCard(info.name, info.link)})

  /*const cardLike = document.querySelectorAll('.card__like');
  cardLike.forEach((item) => item.addEventListener('click', function addClass(evt){
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like_active');          
      }));*/
 
 
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
     
//открытие просмотра фотографий (открытие попапа)

//const popupPhoto