import {popupPhotoImage, popupPhotoDescription, cardContainer, formAdd, cardLinkInput, cardNameInput, cardTemplate, popupPhoto, popupAddCard, formCreateButton} from './variables.js';
import { contentCards } from './array.js';
import {closePopup, openPopup, disableButton} from './utils.js';
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
    cardImage.addEventListener("click", clickCard);
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
export function createCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardObj = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  addCard(newCardObj);
  closePopup(popupAddCard);
  formAdd.reset();
  disableButton(formCreateButton)
}