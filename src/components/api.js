import {formInputName, cardLinkInput, avatarLinkInput, formDescription, cardNameInput } from "./variables"
import { createCardFormSubmit } from "./card"
const congif = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25/',
    headers: {
        authorization: '469baa30-a404-4c2f-8acf-7186e9d2571a',
        'Content-Type': 'application/json'
      }
}

export const getUserInfo = () => {
return fetch ('https://nomoreparties.co/v1/plus-cohort-25/users/me', {
    headers: {
        authorization: '469baa30-a404-4c2f-8acf-7186e9d2571a'
}
   })
.then(res => res.json())
.then(data => {
    console.log(data)
})}
          // массив карточек с сервера
export let cardDataId;
export const getCardsInfo = () => {
    return fetch ('https://nomoreparties.co/v1/plus-cohort-25/cards', {
        headers: {
            authorization: '469baa30-a404-4c2f-8acf-7186e9d2571a'
    }
       })
    .then(res => res.json())
    .then(data => {
        data.forEach((card) => {
            createCardFormSubmit(card);
        })
    })
    }
 export const loadProfileInfo = () => {
        return fetch ('https://nomoreparties.co/v1/plus-cohort-25/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '469baa30-a404-4c2f-8acf-7186e9d2571a',
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formInputName.value,
            about: formDescription.value
        })
           })
           .then(res => res.json())
           .then(data => {
        console.log(data)})
        
    }
export const postNewCard = (evt) => {
    evt.preventDefault();
    return fetch ('https://nomoreparties.co/v1/plus-cohort-25/cards',{
        method: 'POST',
        headers: {
            authorization: '469baa30-a404-4c2f-8acf-7186e9d2571a',
             'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardNameInput.value,
            link: cardLinkInput.value
        })
    })
    .then(res => res.json())
    .then((data) => {
         createCardFormSubmit(data)
         console.log(data)
        })
};
export const postNewAvatar = () => {
    return fetch ('https://nomoreparties.co/v1/plus-cohort-25/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: '469baa30-a404-4c2f-8acf-7186e9d2571a',
             'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarLinkInput.value
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}
export const deleteCardOnServer = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '469baa30-a404-4c2f-8acf-7186e9d2571a'
        }
    })
}



