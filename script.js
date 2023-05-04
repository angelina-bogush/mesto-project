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


function openPopup(popupName) {
  popupName.classList.add("popup_opened");
}
function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}

const formUserName = popupEditProfile.querySelector('.form__input_theme_name');
const formUserDescription = popupEditProfile.querySelector('.form__input_theme_description');
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
const formEdit = page.querySelector(".form_edit");
const formName = formEdit.querySelector(".form__input_theme_name");
const formDescription = formEdit.querySelector(
  ".form__input_theme_description"
);
//const buttonSubmit = formEdit.querySelector(".form__button_submit");
function submitForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = formName.value;
  profileSubtitle.textContent = formDescription.value;
  closePopup(popupEditProfile);
  formEdit.reset();
}
formEdit.addEventListener('submit', submitForm);

//Создание карточки
const cardContainer = page.querySelector(".cards");
const cardTemplate = page.querySelector("#template-card").content; 

const formAdd = page.querySelector('.form_add-card');
const newCardObj = {
name: formAdd.querySelector('.form__input_theme_name-card').value,
link: formAdd.querySelector('.form__input_theme_link').value }


const createCard = function (newCardObj) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true); 
  const newCardName = newCard.querySelector(".card__title"); 
  const newCardImage = newCard.querySelector(".card__image"); 
  newCardName.textContent = newCardObj['name']; 
  newCardImage.src = newCardObj['link']; 
  newCardImage.alt = newCardObj['name'];
  const cardLikes = newCard.querySelectorAll(".card__like");
  const buttonsTrash = newCard.querySelectorAll(".card__trash");
  const cardImages = newCard.querySelectorAll(".card__image");
const clickCard = function(){                                        // открытие попапа картинки
  popupPhotoImage.src = newCardObj['link'];
  popupPhotoImage.alt = newCardObj['name'];
  popupPhotoDescription.textContent = newCardObj['name'];
  openPopup(popupPhoto);
};
cardImages.forEach((item) =>
    item.addEventListener("click", () => {
      clickCard();                         
    })
  );
  
  cardLikes.forEach((item) =>
    item.addEventListener("click", function addClass(evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle("card__like_active");       //лайк
    })
  );

  buttonsTrash.forEach((item) =>
    item.addEventListener("click", function deleteCard(evt) {
      const cardToDelete = evt.target.closest('.card');
      cardToDelete.remove();                            //удаление карточки
    })
  );
  return newCard;
};

const popupPhoto = page.querySelector('.popup_theme_photo');
const popupPhotoImage = popupPhoto.querySelector('.popup__image');
const popupPhotoDescription = popupPhoto.querySelector('.popup__description');

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
    name: formAdd.querySelector('.form__input_theme_name-card').value,
    link: formAdd.querySelector('.form__input_theme_link').value
  };
  addCard(newCardObj);
  closePopup(popupAddCard);
  formAdd.reset();
  };  
 
 formAdd.addEventListener('submit',createForm);
     

