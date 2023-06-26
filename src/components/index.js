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
import { enableValidation } from "./validate.js";
import { closePopup, openPopup, changeLoading} from "./utils";
import  Api from "./api.js";
import { createCardFormSubmit } from "./card";
import { disableButton } from "./validate.js";
import {config} from './data'
import { FormValidator } from "./validate.js"

const editProfileValidation = new FormValidator(validationConfig, formEdit);
const editAvatarValidation = new FormValidator(validationConfig, formAvatar);
const newPostValidation = new FormValidator(validationConfig, formAdd);
const api = new Api(config)

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
.then(([userInfo, cards]) => {
  profileTitle.textContent = userInfo.name;
  profileSubtitle.textContent = userInfo.about;
  profileAvatar.src = userInfo.avatar;
  const myUserId = userInfo._id;
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
function submitProfileForm(evt) {
  evt.preventDefault();
  const buttonText = formSubmitButton.textContent;
  changeLoading(formSubmitButton, true, buttonText);
  loadProfileInfo()
    .then((profile) => {
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
//пост новой карточки на сервер
function submitNewCardForm(evt) {
  evt.preventDefault();
  const buttonText = formCreateButton.textContent;
  changeLoading(formCreateButton, true, buttonText);
  postNewCard()
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
  postNewAvatar()
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