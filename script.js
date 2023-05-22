//открытие и зактрытие основного попапа
const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const buttonEdit = profile.querySelector('.profile__edit-button'); 
const popups = page.querySelectorAll('.popup');
const popupEditProfile = page.querySelector('.popup_theme_edit');
const popupAddCard = page.querySelector('.popup_theme_add-card');

const forms = page.querySelectorAll('.form');
const formEdit = page.querySelector(".form_edit");
const formInputName = formEdit.querySelector(".form__input_theme_name");
const formDescription = formEdit.querySelector(
  ".form__input_theme_description");
const formAdd = page.querySelector('.form_add-card');
const cardNameInput = page.querySelector('.form__input_theme_name-card');
const cardLinkInput =  formAdd.querySelector('.form__input_theme_link');
const formInput = page.querySelectorAll('.form__input');
const formError = page.querySelector(`.${formInput.id}-error`)

const buttonAdd = profile.querySelector('.profile__add-button'); 
const popupPhoto = page.querySelector('.popup_theme_photo');
const popupContainers = page.querySelectorAll('.popup__container');
const popupClosingIcon = page.querySelectorAll('.popup__close-icon');
const popupPhotoImage = popupPhoto.querySelector('.popup__image');
const popupPhotoDescription = popupPhoto.querySelector('.popup__description');
const cardContainer = page.querySelector(".cards");
const cardTemplate = page.querySelector("#template-card").content; 


function openPopup(popupName) {
  popupName.classList.add("popup_opened");
}
function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}
//закрытие всех попапов
function closeAllPopups(){
  popups.forEach((popup) => {
    if(popup.classList.contains('popup_opened')) {
    closePopup(popup);
 }})}
//закрытие попапов на оверлей
popups.forEach((overlay) => overlay.addEventListener('click', (evt) => {
if(evt.target.classList.contains('popup_opened')){
  closePopup(overlay);
}
}))
// закрытие на esc
document.addEventListener('keydown', (event) => {
  if(event.key === 'Escape'){
    closeAllPopups()
  }
})
buttonEdit.addEventListener("click", () => {
  formInputName.value = profileTitle.textContent;
  formDescription.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});
buttonAdd.addEventListener("click", () => {
  openPopup(popupAddCard);
});

//закрытие всех попапов на крестик
popupClosingIcon.forEach((icon) => icon.addEventListener('click', () => {
const iconsPopup = icon.closest('.popup');
  closePopup(iconsPopup)                                   
}));

//изменение имени в форме редактирования профиля
function submitForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formDescription.value;
  closePopup(popupEditProfile);
}
formEdit.addEventListener('submit', submitForm);

//показать и скрыть ошибку формы
function showInputError(formElement, inputElement, errorMessage){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_theme_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input_error')
}
function hideInputError(formElement, inputElement){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_theme_error');
  errorElement.textContent = "";
  errorElement.classList.remove('form__input_error')
}


//проверка валидности поля ввода
const isValid = (formElement, inputElement) => {
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
//есть ли невалидное поле
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}
//функция переключения кнопки формы
const toggleFormButton = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)){
    buttonElement.disabled = true;
    buttonElement.classList.add('form__button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__button_inactive');
  }
}

//обработчик всем полям внутри формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__button');
  toggleFormButton(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleFormButton(inputList, buttonElement);
    });
  });
}

//обработчик всем формам на странице
const formValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

formValidation()



//Создание карточки
const createCard = function (newCardObj) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true); 
  const newCardName = newCard.querySelector(".card__title"); 
  const newCardImage = newCard.querySelector(".card__image"); 
  newCardName.textContent = newCardObj['name']; 
  newCardImage.src = newCardObj['link']; 
  newCardImage.alt = newCardObj['name'];
  const cardLike = newCard.querySelector(".card__like");
  const buttonTrash = newCard.querySelector(".card__trash");
  const cardImage = newCard.querySelector(".card__image");

  const clickCard = function(){                // открытие попапа картинки
  popupPhotoImage.src = newCardObj['link'];
  popupPhotoImage.alt = newCardObj['name'];
  popupPhotoDescription.textContent = newCardObj['name'];
  openPopup(popupPhoto);
};
  cardImage.addEventListener("click", () => {
      clickCard();                         
    })
  cardLike.addEventListener('click', function addClass(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("card__like_active")});

  buttonTrash.addEventListener("click", function deleteCard(evt) {
      const cardToDelete = evt.target.closest('.card');
      cardToDelete.remove();                           
    })
  return newCard;
};
const addCard = function (newCardObj) {
  const newCard = createCard(newCardObj);
  cardContainer.prepend(newCard);
};

contentCards.forEach((info) => {
  addCard(info);
});
  // добавление карточек на страницу пользователем 
 function createForm(evt){
  evt.preventDefault();
  const newCardObj = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  addCard(newCardObj);
  closePopup(popupAddCard);
  formAdd.reset();
  };  
 
 formAdd.addEventListener('submit',createForm);
     
