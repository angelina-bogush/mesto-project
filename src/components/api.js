
import {
  formInputName,
  cardLinkInput,
  avatarLinkInput,
  formDescription,
  cardNameInput,
} from "../utils/constants";

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
    headers: this._headers,
  })
    .then(this._checkAnswer)
};
//инфо о пользователе
loadProfileInfo(data){
  return fetch(`${this._url}/users/me`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({data}),
  })
  .then(this._checkAnswer);
};
//пост новой карточки
postNewCard(data){
  return fetch(`${this._url}/cards`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify(data),
  })
    .then(this._checkAnswer)
};
//новый аватар
postNewAvatar(data){
  return fetch(`${this._url}/users/me/avatar`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({data}),
  })
  .then(this._checkAnswer);
};
//удаление карточки
deleteCardOnServer(cardId){
  return fetch(`${this._url}/cards/${cardId}`, {
    method: "DELETE",
    headers: this._headers,
  })
  .then(this._checkAnswer)
};
//добавление лайка
addLikeCard(cardId){
  return fetch(`${this._url}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: this._headers,
  })
  .then(this._checkAnswer)
};
//удаление лайка
deleteLikeCard(cardId){
  return fetch(`${this._url}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: this._headers,
  })
  .then(this._checkAnswer)
};
//отображение всей информации
getInfo(){
  return Promise.all([this.getUserInfo(), this.getCardsInfo()])};
}
