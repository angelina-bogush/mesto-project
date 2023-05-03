//открытие и зактрытие основного попапа
const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button'); 
const popup = page.querySelector('.popup');
const popupEditProfile = page.querySelector('.popup_theme_edit');
const popupAddCard = page.querySelector('.popup_theme_add-card');
const addButton = profile.querySelector('.profile__add-button'); 
const closeIconAdd = page.querySelector('.popup__close-icon_add-card');  
const closeIconEdit = popup.querySelector('.popup__close-icon_edit');  
const closeIconPhoto = page.querySelectorAll('.popup__close-icon_photo');

function openPopup(popupName) {
  popupName.classList.add("popup_opened");
}
function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}

editButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
});
addButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});
closeIconEdit.addEventListener("click", () => {
  closePopup(popupEditProfile);
});
closeIconAdd.addEventListener("click", () => {
  closePopup(popupAddCard);
});
 

//изменение имени в форме редактирования профиля
const formEdit = page.querySelector(".form_edit");
const formName = formEdit.querySelector(".form__input_theme_name");
const formDescription = formEdit.querySelector(
  ".form__input_theme_description"
);
const buttonSubmit = formEdit.querySelector(".form__button_submit");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

buttonSubmit.addEventListener("click", function submitForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = formName.value;
  profileSubtitle.textContent = formDescription.value;
  popupEditProfile.classList.remove("popup_opened");
});


  //массив из содержимого карточек

    const contentCards = [
      {
        id: '1',
        name: "Петергоф",
        link: "https://images.unsplash.com/photo-1635700453672-8e93c5f2e280?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        id:'2',
        name: "Исаакиевский Собор",
        link: "https://images.unsplash.com/photo-1555460285-763ba96917d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      },
      {
        id:'3',
        name: "Лахта центр",
        link: "https://images.unsplash.com/photo-1539203645471-3ae5d31e0eca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
      },
      {
        id: '4',
        name: "Казанский собор",
        link: "https://images.unsplash.com/photo-1551005756-fd0657e8fbf2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2FpbnQlMjBwZXRlcnNidXJnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
      {
        id: '5',
        name: "Невский проспект",
        link: "https://images.unsplash.com/photo-1626103254920-d8c4069554da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTl8fHNhaW50JTIwcGV0ZXJzYnVyZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      },
      {
        id: '6',
        name: "Пушкин",
        link: "https://images.unsplash.com/photo-1573551673739-6075df0508c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fHNhaW50JTIwcGV0ZXJzYnVyZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      },
    ];

//Создание карточки
const cardContainer = page.querySelector(".cards");
const cardTemplate = page.querySelector("#template-card").content; 
const createCard = function (cardName, cardLink, cardId) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true); 
  const newCardName = newCard.querySelector(".card__title"); 
  const newCardImage = newCard.querySelector(".card__image"); 
  newCardName.textContent = cardName; 
  newCardImage.src = cardLink; 
  newCardImage.alt = cardName;
  newCard.id = cardId;
  return newCard;
};


const popupPhoto = page.querySelector('.popup_theme_photo');
const popupPhotoImage = popupPhoto.querySelector('.popup__image');
const popupPhotoDescription = popupPhoto.querySelector('.popup__description');
const addCard = function (cardName, cardLink, cardId) {
  const newCard = createCard(cardName, cardLink, cardId);
  const cardLike = newCard.querySelectorAll(".card__like");
  const buttonTrash = newCard.querySelectorAll(".card__trash");
  const cardImage = newCard.querySelectorAll(".card__image");
  
const cardClick = function(){                                        // открытие попапа картинки
  popupPhotoImage.src = cardLink;
  popupPhotoImage.alt = cardName;
  popupPhotoDescription.textContent = cardName;
  openPopup(popupPhoto);
};

cardImage.forEach((item) =>
    item.addEventListener("click", () => {
      cardClick();                         
    })
  );
  closeIconPhoto.forEach((item) =>
    item.addEventListener("click", () => {
      closePopup(popupPhoto);                                    //закрыть попап фото
    })
  );
  
  cardLike.forEach((item) =>
    item.addEventListener("click", function addClass(evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle("card__like_active");       //лайк
    })
  );

  buttonTrash.forEach((item) =>
    item.addEventListener("click", function deleteCard() {
      const cardToDelete = document.getElementById(cardId);
      cardToDelete.remove();                            //удаление карточки
    })
  );

  cardContainer.prepend(newCard);
};

contentCards.forEach((info) => {
  addCard(info.name, info.link, info.id);
});
  // добавление карточек на страницу пользователем 
  
 const formAdd = page.querySelector('.form_add-card');
 const formNameCard = formAdd.querySelector('.form__input_theme_name-card');
 const formLink = formAdd.querySelector('.form__input_theme_link');
 const buttonCreate = formAdd.querySelector('.form__button_create');
 
    buttonCreate.addEventListener('click', function createForm(evt){
     evt.preventDefault();
     const userCardName = formNameCard.value;
     const userCardLink = formLink.value;
     const userCardId = String(contentCards.length + 1);
     addCard(userCardName, userCardLink, userCardId);
     popupAddCard.classList.remove('popup_opened');
     formAdd.reset();
     })
     

