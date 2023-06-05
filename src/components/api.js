import { profileTitle, profileSubtitle, profileAvatar, formInputName, cardLinkInput } from "./variables"
import { createCardFormSubmit } from "./card"
import { closePopup } from "./utils"
const congif = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25/',
    headers: {
        authorization: '469baa30-a404-4c2f-8acf-7186e9d2571a',
        'Content-Type': 'application/json'
      }
}
// const user = {
//     "name": profileTitle.textContent,
//     "about": profileSubtitle.textContent,
//     "avatar": profileAvatar.src,
//     "_id": "469baa30-a404-4c2f-8acf-7186e9d2571a",
//     "cohort": "cohort-25-plus"
//   }
// export const postUserInfo = () => {
//    return fetch('https://nomoreparties.co/v1/plus-cohort-25/users/me', {
//   method: 'POST',
//   headers: {
//     authorization: '469baa30-a404-4c2f-8acf-7186e9d2571a',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(user)
// })
// }

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

export const getCardsInfo = () => {
    return fetch ('https://nomoreparties.co/v1/plus-cohort-25/cards', {
        headers: {
            authorization: '469baa30-a404-4c2f-8acf-7186e9d2571a'
    }
       })
    .then(res => res.json())
    .then(data => {
        data.forEach((card) => {
            createCardFormSubmit(card)
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
            name: profileTitle.textContent,
            about: profileSubtitle.textContent
        })
           })
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
            name: formInputName.value,
            link: cardLinkInput.value
        })
    })
    .then(res => res.json())
    .then(data => {
         createCardFormSubmit(data)
        })
}
