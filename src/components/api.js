
import {
  formInputName,
  cardLinkInput,
  avatarLinkInput,
  formDescription,
  cardNameInput,
} from "./variables";

// const config = {
//   baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
//   headers: {
//     authorization: "469baa30-a404-4c2f-8acf-7186e9d2571a",
//     "Content-Type": "application/json",
//   },
// };
export default class Api {
  constructor({baseUrl, headers}){
    this._url = baseUrl;
    this._headers = headers
  }
 _checkAnswer(res){
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };
getUserInfo(){
  return fetch(`${this._url}/users/me`, {
    headers: this._headers,
  })
  .then(this._checkAnswer)
};
//загрузка карточек с сервера
getCardsInfo(){
  return fetch(`${this._url}/cards`, {
    headers: config.headers,
  })
    .then(this._checkAnswer)
};
//инфо о пользователе
loadProfileInfo(){
  return fetch(`${this._url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: formInputName.value,
      about: formDescription.value,
    }),
  })
  .then(this._checkAnswer);
};
//пост новой карточки
postNewCard(){
  return fetch(`${this._url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardNameInput.value,
      link: cardLinkInput.value,
    }),
  })
    .then(this._checkAnswer)
};
//новый аватар
postNewAvatar(){
  return fetch(`${this._url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLinkInput.value,
    }),
  })
  .then(this._checkAnswer);
};
//удаление карточки
deleteCardOnServer(cardId){
  return fetch(`${this._url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(this._checkAnswer)
};
//добавление лайка
addLikeCard(cardId){
  return fetch(`${this._url}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then(this._checkAnswer)
};
//удаление лайка
deleteLikeCard(cardId){
  return fetch(`${this._url}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(this._checkAnswer)
};
}
