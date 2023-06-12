import {
  formInputName,
  cardLinkInput,
  avatarLinkInput,
  formDescription,
  cardNameInput,
} from "./variables";
import { createCardFormSubmit } from "./card";

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
    authorization: "469baa30-a404-4c2f-8acf-7186e9d2571a",
    "Content-Type": "application/json",
  },
};
export const myUserId = "aa85ec022edf5336fad5607c";

const checkAnswer = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(checkAnswer)
  .catch((err) => {
    console.log(err)
  })
};
//загрузка карточек с сервера
export const getCardsInfo = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(checkAnswer)
};
//инфо о пользователе
export const loadProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: formInputName.value,
      about: formDescription.value,
    }),
  })
  .then(checkAnswer);
};
//пост новой карточки
export const postNewCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardNameInput.value,
      link: cardLinkInput.value,
    }),
  })
    .then(checkAnswer)
};
//новый аватар
export const postNewAvatar = () => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLinkInput.value,
    }),
  })
  .then(checkAnswer);
};
//удаление карточки
export const deleteCardOnServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(checkAnswer)
  .catch((err) => {
    console.log(err)
  })
};
//добавление лайка
export const addLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then(checkAnswer)
  .catch((err) => {
    console.log(err)
  })
};
//удаление лайка
export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(checkAnswer)
  .catch((err) => {
    console.log(err)
  })
};

