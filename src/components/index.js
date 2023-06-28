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
import { config, profileInfo } from './data'
import { FormValidator } from "./FormValidator.js"
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";


const editProfileValidation = new FormValidator(validationConfig, formEdit);
const editAvatarValidation = new FormValidator(validationConfig, formAvatar);
const newPostValidation = new FormValidator(validationConfig, formAdd);
const api = new Api(config)
const userInfo = new UserInfo(profileInfo);

// enableValidation({
//   formSelector: ".form",
//   formInput: ".form__input",
//   buttonSelector: ".form__button",
//   formErrorTheme: "form__input_theme_error",
//   formInputError: "form__input_error",
//   inactiveButtonClass: "form__button_inactive",
// });
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

//закрытие всех попапов на крестик
popupClosingIcon.forEach((icon) =>
  icon.addEventListener("click", () => {
    const iconsPopup = icon.closest(".popup");
    closePopup(iconsPopup);
  })
);

//изменение имени в форме редактирования профиля
// function submitProfileForm(evt) {
//   evt.preventDefault();
const changeUserInfo = new PopupWithForm({
  popupSelector: ".popup_theme_edit",
  handleFormSubmit: (inputValue) => {
    changeUserInfo.renderLoading(true);
  api.loadProfileInfo({ name: inputValue.formInputName, about: inputValue.formDescription })
    .then((profile) => {
      //Продолжение от сюда 
      profileTitle.textContent = profile.name;
      profileSubtitle.textContent = profile.about;
      // changeLoading(formSubmitButton, true, loadingText, buttonText)
      closePopup(popupEditProfile);

      // disableButton(formSubmitButton);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      changeLoading(formSubmitButton, false, buttonText)
    })
}
})


//пост новой карточки на сервер
function submitNewCardForm(evt) {
  evt.preventDefault();
  const buttonText = formCreateButton.textContent;
  changeLoading(formCreateButton, true, buttonText);
  api.postNewCard()
    .then((data) => {
      createCardFormSubmit(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeLoading(formCreateButton, false, buttonText)
    })
}
//добавление нового аватара
 function submitAvatarForm(evt){
  const buttonText = buttonSaveAvatar.textContent;
  changeLoading(buttonSaveAvatar, true, buttonText);
  evt.preventDefault();
  api.postNewAvatar()
    .then((data) => {
      profileAvatar.src = data.avatar;
      closePopup(popupAvatar);
      formAvatar.reset();

      // disableButton(buttonSaveAvatar)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeLoading(buttonSaveAvatar, false, buttonText)
    })
}
buttonEdit.addEventListener("click", () => {
  formInputName.value = profileTitle.textContent;
  formDescription.value = profileSubtitle.textContent;
  openPopup(popupEditProfile, formSubmitButton);
  editProfileValidation.disableButton();
  editProfileValidation.hideError();
});


buttonAdd.addEventListener("click", () => {
  openPopup(popupAddCard);
  newPostValidation.hideError();
  newPostValidation.disableButton();
});

buttonAvatar.addEventListener('click', () => {
  openPopup(popupAvatar)
  editAvatarValidation.disableButton();
  editAvatarValidation.hideError();
})

// formEdit.addEventListener("submit", submitProfileForm);
// formAdd.addEventListener("submit", submitNewCardForm);
// formAvatar.addEventListener('submit', submitAvatarForm);

newPostValidation.enableValidation();
editAvatarValidation.enableValidation();
editProfileValidation.enableValidation();