import {popupPhotoImage, popupPhotoDescription, cardContainer, formAdd, cardTemplate, popupPhoto, popupAddCard, formCreateButton} from './variables.js';
import {closePopup, openPopup, disableButton} from './utils.js';
import { deleteCardOnServer, addLikeCard, myUserId, deleteLikeCard} from './api.js';

function addClassLike(event, cardId) {
  event.target.classList.add("card__like_active");
  addLikeCard(cardId)
   .then((data) => {
    const cardLikes = event.target.closest('.card').querySelector('.card__like-count');
    cardLikes.textContent =  data.likes.length;
   })
}

 function removeClassLike(event, cardId) {
  event.target.classList.remove("card__like_active");
  deleteLikeCard(cardId)
  .then((data) => {
    const cardLikes = event.target.closest('.card').querySelector('.card__like-count');
    cardLikes.textContent = data.likes.length;
  })
}

 function deleteCard(event, cardId) {
    deleteCardOnServer(cardId, event);
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
    const cardImage = newCard.querySelector(".card__image");
    const cardLikeCount = newCard.querySelector('.card__like-count');
    cardLikeCount.textContent = card.likes.length;
    const buttonTrash = newCard.querySelector(".card__trash");
    const ownerId = newCardObj['ownerId'];
    if (ownerId !== myUserId){
      buttonTrash.style.display = 'none'
    } else {
      buttonTrash.setAttribute('card-id', card._id); // добавила атрибут id карточки
    }
    cardLike.setAttribute('cardLike-id', card._id);
    const clickCard = function(){                // открытие попапа картинки
    popupPhotoImage.src = newCardObj['link'];
    popupPhotoImage.alt = newCardObj['name'];
    popupPhotoDescription.textContent = newCardObj['name'];
    openPopup(popupPhoto);
  };
    cardImage.addEventListener("click", clickCard);
    cardLike.addEventListener('click', function(event){
      const cardId = event.target.getAttribute('cardLike-id');
      if(!event.target.classList.contains('card__like_active')){
      addClassLike(event, cardId)} else {
      removeClassLike(event, cardId)}
    });
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
    ownerId: card.owner._id,
    likes: card.likes.length
  };
  addCard(newCardObj, card);
  closePopup(popupAddCard);
  formAdd.reset();
  disableButton(formCreateButton)
}