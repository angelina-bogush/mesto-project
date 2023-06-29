import "../pages/index.css";
import {
  formAdd,
  buttonEdit,
  formInputName,
  formDescription,
  popupEditProfile,
  buttonAdd,
  popupAddCard,
  popupClosingIcon,
  profileSubtitle,
  profileTitle,
  formEdit,
  formSubmitButton,
  formCreateButton,
  buttonSaveAvatar,
  buttonAvatar,
  popupAvatar,
 formAvatar,
 profileAvatar,
 validationConfig
} from "./variables";
import { enableValidation } from "./FormValidator.js";
import { changeLoading } from "./utils";
import { Popup } from "./Popup"
import  Api from "./Api.js";
import { createCardFormSubmit } from "./card";
import { disableButton } from "./FormValidator.js";
import { config, profileInfo } from './data.js'
import { FormValidator } from "./FormValidator.js"
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js"

let userId;
let cardList;

const editProfileValidation = new FormValidator(validationConfig, formEdit);
const editAvatarValidation = new FormValidator(validationConfig, formAvatar);
const newPostValidation = new FormValidator(validationConfig, formAdd);
const api = new Api(config)
const userInfo = new UserInfo(profileInfo);

//инфо о пользователе и вывод карточек с сервера
api.getInfo()
.then(([userData, cards]) => {
  // profileTitle.textContent = userInfo.name;
  // profileSubtitle.textContent = userInfo.about;
  // profileAvatar.src = userInfo.avatar;
  // const myUserId = userInfo._id;
  userInfo.setUserInfo(userData);
  userId = userData._id;
  cards.forEach((card) => {
        const userId = card.owner._id;
        createCardFormSubmit(card, myUserId, userId)})
})
.catch((err) => {
  console.log(err)
})

// закрытие всех попапов на крестик
// popupClosingIcon.forEach((icon) =>
//   icon.addEventListener("click", () => {
//     const iconsPopup = icon.closest(".popup");
//     closePopup(iconsPopup);
//   })
// );

//изменение имени в форме редактирования профиля
const changeUserInfo = new PopupWithForm({
  popupSelector: ".popup_theme_edit",
  handleFormSubmit: (inputValue) => {
    changeUserInfo.renderLoading(true);
  api.loadProfileInfo({ name: inputValue.formInputName, about: inputValue.formDescription })
    .then((profile) => {
      userInfo.setUserInfo({ name: profile.name, about: profile.about });
      changeUserInfo.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      changeUserInfo.renderLoading(false);
    })
}
})

//пост новой карточки на сервер
const submitNewCardForm = new PopupWithForm ({
  popupSelector: ".popup_theme_add-card",
  handleFormSubmit: (inputValue) => {
  submitNewCardForm.renderLoading(true);
  api.postNewCard({ name: inputValue.cardNameInput, link: inputValue.cardLinkInput })
    .then((data) => {
      //НАДО ДОБИТЬ ТУТ!!!!!
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeLoading(formCreateButton, false, buttonText)
    })
  }
})

//добавление нового аватара
const submitAvatarForm = new PopupWithForm ({
  popupSelector: ".popup_theme_avatar",
  handleFormSubmit: (inputValue) => {
    submitAvatarForm.renderLoading(true);
    api.postNewAvatar({ avatar: inputValue.avatarInput })
    .then((data) => {
      userInfo.setUserInfo({ avatar: data.avatar });
      submitAvatarForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitAvatarForm.renderLoading(false);
    })
  }
})

//Открытие попап редактирование профилья и валидация
function handleProfileForm() {
  const userObject = userInfo.getUserInfo();
  formInputName.value = userObject.name;
  formDescription.value = userObject.about;
  editProfileValidation.disableButton();
  editProfileValidation.hideError();
  changeUserInfo.open();
}

changeUserInfo.setEventListeners();
buttonEdit.addEventListener("click", handleProfileForm);

//Открытие попап изменение аватара и валидация
function handleAvatarForm() {
  editAvatarValidation.disableButton();
  editAvatarValidation.hideError();
  submitAvatarForm.open();
}

submitAvatarForm.setEventListeners();
buttonAvatar.addEventListener("click", handleAvatarForm);

//Открытие попап добавление карточки и валидация
function handlePostForm() {
  newPostValidation.hideError();
  newPostValidation.disableButton();
  submitNewCardForm.open()
}

submitNewCardForm.setEventListeners();
buttonAdd.addEventListener("click", handlePostForm);




// formEdit.addEventListener("submit", submitProfileForm);
// formAdd.addEventListener("submit", submitNewCardForm);
// formAvatar.addEventListener('submit', submitAvatarForm);

newPostValidation.enableValidation();
editAvatarValidation.enableValidation();
editProfileValidation.enableValidation();