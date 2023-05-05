//открытие и зактрытие основного попапа
const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const buttonEdit = profile.querySelector('.profile__edit-button'); 
const popupEditProfile = page.querySelector('.popup_theme_edit');
const popupAddCard = page.querySelector('.popup_theme_add-card');
const buttonAdd = profile.querySelector('.profile__add-button'); 
const popupClosingIcon = page.querySelectorAll('.popup__close-icon');
const formUserName = popupEditProfile.querySelector('.form__input_theme_name');
const formUserDescription = popupEditProfile.querySelector('.form__input_theme_description');
const formEdit = page.querySelector(".form_edit");
const formName = formEdit.querySelector(".form__input_theme_name");
const formDescription = formEdit.querySelector(
  ".form__input_theme_description");
const popupPhoto = page.querySelector('.popup_theme_photo');
const popupPhotoImage = popupPhoto.querySelector('.popup__image');
const popupPhotoDescription = popupPhoto.querySelector('.popup__description');
const cardContainer = page.querySelector(".cards");
const cardTemplate = page.querySelector("#template-card").content; 
const formAdd = page.querySelector('.form_add-card');
const cardNameInput = formAdd.querySelector('.form__input_theme_name-card');
const cardLinkInput =  formAdd.querySelector('.form__input_theme_link');

function openPopup(popupName) {
  popupName.classList.add("popup_opened");
}
function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}
buttonEdit.addEventListener("click", () => {
  formUserName.value = profileTitle.textContent;
  formUserDescription.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});
buttonAdd.addEventListener("click", () => {
  openPopup(popupAddCard);
});

//закрытие всех попапов
popupClosingIcon.forEach((icon) => icon.addEventListener('click', () => {
const iconsPopup = icon.closest('.popup');
  closePopup(iconsPopup)                                   
}));

//изменение имени в форме редактирования профиля
function submitForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = formName.value;
  profileSubtitle.textContent = formDescription.value;
  closePopup(popupEditProfile);
}
formEdit.addEventListener('submit', submitForm);

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

  const clickCard = function(){                                 // открытие попапа картинки
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
     

