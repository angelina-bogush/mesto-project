import {popupPhotoImage, popupPhotoDescription, cardContainer, formAdd, cardLinkInput, cardNameInput, cardTemplate, popupPhoto, popupAddCard, formCreateButton} from './variables.js';
import { contentCards } from './array.js';
import {closePopup, openPopup, disableButton} from './utils.js';

export function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();                           
}
function addClassLike(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle("card__like_active")}

const createCard = function (newCardObj) {
    const newCard = cardTemplate.querySelector(".card").cloneNode(true); 
    const newCardName = newCard.querySelector(".card__title"); 
    const newCardImage = newCard.querySelector(".card__image"); 
    newCardName.textContent = newCardObj['name']; 
    newCardImage.src = newCardObj['link']; 
    newCardImage.alt = newCardObj['name'];
    const cardLike = newCard.querySelector(".card__like");
    const buttonTrash = newCard.querySelector(".card__trash");
    const ownerId = newCardObj['ownerId'];
    if (ownerId !== 'aa85ec022edf5336fad5607c'){
      buttonTrash.style.display = 'none'
    }
    const cardImage = newCard.querySelector(".card__image");
    const clickCard = function(){                // открытие попапа картинки
    popupPhotoImage.src = newCardObj['link'];
    popupPhotoImage.alt = newCardObj['name'];
    popupPhotoDescription.textContent = newCardObj['name'];
    openPopup(popupPhoto);
  };
    cardImage.addEventListener("click", clickCard);
    cardLike.addEventListener('click', addClassLike);
    buttonTrash.addEventListener("click", deleteCard)
    return newCard;
  };
  const addCard = function (newCardObj) {
    const newCard = createCard(newCardObj);
    cardContainer.prepend(newCard);
  };

export function createCardFormSubmit(card) {
  const newCardObj = {
    name: card.name,
    link: card.link,
    ownerId: card.owner._id
  };
  addCard(newCardObj);
  closePopup(popupAddCard);
  formAdd.reset();
  disableButton(formCreateButton)
}