import {popupPhotoImage, popupPhotoDescription, cardContainer, formAdd, cardLinkInput, cardNameInput, cardTemplate, popupPhoto, popupAddCard, formCreateButton} from './variables.js';
import {closePopup, openPopup, disableButton} from './utils.js';
import { deleteCardOnServer} from './api.js';

function addClassLike(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle("card__like_active")}

 function deleteCard(event, cardId) {
    deleteCardOnServer(cardId);
    const cardToDelete = event.target.closest('.card');
    cardToDelete.remove();                           
  }

const createCard = function (newCardObj, card) {
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
    } else {
      buttonTrash.setAttribute('card-id', card._id); // добавила атрибут id карточки
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
    buttonTrash.addEventListener("click", function(event){
      const cardId = event.target.getAttribute('card-id');
      deleteCard(event, cardId)})
    return newCard;
  };
  const addCard = function (newCardObj, card) {
    const newCard = createCard(newCardObj, card);
    cardContainer.prepend(newCard);
  };

export function createCardFormSubmit(card) {
  const newCardObj = {
    name: card.name,
    link: card.link,
    ownerId: card.owner._id
  };
  addCard(newCardObj, card);
  closePopup(popupAddCard);
  formAdd.reset();
  disableButton(formCreateButton)
}