import {popupPhotoImage, popupPhotoDescription, cardContainer, formAdd, cardTemplate, popupPhoto, popupAddCard, formCreateButton} from '../utils/constants.js';
import { Popup } from './Popup.js';
import { deleteCardOnServer, addLikeCard, deleteLikeCard, getUserInfo, Api} from './Api.js';
import { FormValidator } from './FormValidator.js';


export class Card {
  constructor({
    title,
    ownerId,
    link,
    cardId,
    userId,
    likes,
    cardSelector,
    handleAddLikeClick,
    handleRemoveLikeClick,
    handleDeleteClick,
    handleCardClick
  }){
    this._title = title;
    this._link = link;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._userId = userId;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleRemoveLikeClick = handleRemoveLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = handleCardClick;
    this.clickButtonDelete = this.clickButtonDelete.bind(this);

  }
_getElement(){
  const cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);

    return cardElement;
}

_showDeleteButton() {
  if (this._ownerId !== this._userId) {
    this._element.querySelector(".card__trash").remove();
  }
}
setLike() {
  this._like.classList.toggle("card__like_active");
}
_handleLike() {
  if (!this._like.classList.contains("card__like_active")) {
    this._handleAddLikeClick();
  } else {
    this._handleRemoveLikeClick();
  }
}
showLikeCount(arrayLikes) {
  this._likeCounter.textContent = arrayLikes;
}
_showMyLike() {
  if (this._likes.find((item) => this._userId === item._id)) {
    this._like.classList.add("card__like_active");
  }
}
generate() {
  this._element = this._getElement();
  this._like = this._element.querySelector(".card__like");
  this._likeCounter = this._element.querySelector(".card__like-count");
  this._cardImage = this._element.querySelector(".card__image");

  this._setEventListeners();
  this._showDeleteButton();
  this.showLikeCount(this._likes.length);
  this._showMyLike();

  this._cardImage.src = this._link;
//название карточки
  this._element.querySelector(".card__title").textContent = this._title;
  this._cardImage.alt = this._title;

  return this._element;
}
clickButtonDelete() {
  this._element.remove();
}
_setEventListeners() {
  this._cardImage.addEventListener("click", this._handleCardClick);

  this._like.addEventListener("click", () => {
    this._handleLike();
  });
  this._element.querySelector(".card__trash").addEventListener("click", () => {
    this._handleDeleteClick();
  });
}
}
// function addClassLike(event, cardId, Api) {
//   Api.addLikeCard(cardId)
//    .then((data) => {
//     event.target.classList.add("card__like_active");
//     const cardLikes = event.target.closest('.card').querySelector('.card__like-count');
//     cardLikes.textContent =  data.likes.length;
//    })
//    .catch((err) => {
//     console.log(err)
//   })
// }

//  function removeClassLike(event, cardId, Api) {
//   Api.deleteLikeCard(cardId)
//   .then((data) => {
//     event.target.classList.remove("card__like_active");
//     const cardLikes = event.target.closest('.card').querySelector('.card__like-count');
//     cardLikes.textContent = data.likes.length;
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// }

//  function deleteCard(event, cardId, Api) {
//     Api.deleteCardOnServer(cardId)
//     .then(() => {
//     event.target.closest('.card').remove();
//     })  
//     .catch((err) => {
//       console.log(err)
//     })                         
//   }

// const createCard = function (newCardObj, card, myUserId, userId) {
//     const newCard = cardTemplate.querySelector(".card").cloneNode(true); 
//     const newCardName = newCard.querySelector(".card__title"); 
//     const newCardImage = newCard.querySelector(".card__image"); 
//     newCardName.textContent = newCardObj['name']; 
//     newCardImage.src = newCardObj['link']; 
//     newCardImage.alt = newCardObj['name'];
//     const cardLike = newCard.querySelector(".card__like");
//     const cardImage = newCard.querySelector(".card__image");
//     const cardLikeCount = newCard.querySelector('.card__like-count');
//     cardLikeCount.textContent = card.likes.length;
//     const buttonTrash = newCard.querySelector(".card__trash");
//     if (userId !== myUserId){
//       buttonTrash.style.display = 'none'
//     } else {
//       buttonTrash.setAttribute('card-id', card._id); // добавила атрибут id карточки
//     } 
//     cardLike.setAttribute('cardLike-id', card._id);
//   //   const clickCard = function(){                // открытие попапа картинки
//   //   popupPhotoImage.src = newCardObj['link'];
//   //   popupPhotoImage.alt = newCardObj['name'];
//   //   popupPhotoDescription.textContent = newCardObj['name'];
//   //   openPopup(popupPhoto);
//   // };
//     cardImage.addEventListener("click", clickCard);
//     cardLike.addEventListener('click', function(event){
//       const cardId = event.target.getAttribute('cardLike-id');
//       if(!event.target.classList.contains('card__like_active')){
//       addClassLike(event, cardId)} else {
//       removeClassLike(event, cardId)}
//     });
//     buttonTrash.addEventListener("click", function(event){
//       const cardId = event.target.getAttribute('card-id');
//       deleteCard(event, cardId)})
//     return newCard;
//   };
//   const addCard = function (newCardObj, card, myUserId, userId) {
//     const newCard = createCard(newCardObj, card, myUserId, userId);
//     cardContainer.prepend(newCard);
//   };

// export function createCardFormSubmit(card, myUserId, userId) {
//   const newCardObj = {
//     name: card.name,
//     link: card.link,
//     likes: card.likes.length
//   };
//   addCard(newCardObj, card, myUserId, userId);
//   closePopup(popupAddCard);
//   formAdd.reset();
  
  
  // disableButton(formCreateButton)
