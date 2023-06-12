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
  buttonAvatar,
  popupAvatar,
 formAvatar,
 buttonSaveNewCard,
 buttonSaveEdit,
 profileAvatar
} from "./variables";
import { enableValidation } from "./validate.js";
import { closePopup, disableButton, openPopup, changeSaveButton, changeLoadingButton} from "./utils";
import { getUserInfo, getCardsInfo, loadProfileInfo, postNewCard } from "./api";
import { submitAvatarForm } from "./modal";
import { createCardFormSubmit } from "./card";

enableValidation({
  formSelector: ".form",
  formInput: ".form__input",
  buttonSelector: ".form__button",
  formErrorTheme: "form__input_theme_error",
  formInputError: "form__input_error",
  inactiveButtonClass: "form__button_inactive",
});

//инфо о пользователе и вывод карточек с сервера
Promise.all([getUserInfo(), getCardsInfo()])
.then(([userInfo, cards]) => {
  profileTitle.textContent = userInfo.name;
  profileSubtitle.textContent = userInfo.about;
  profileAvatar.src = userInfo.avatar;
  cards.forEach((card) => {
        createCardFormSubmit(card)})
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
function submitProfileForm(evt,loadingText = 'Сохранение...', buttonText = 'Сохранить') {
  evt.preventDefault();
  changeLoadingButton(buttonSaveEdit, loadingText)
  loadProfileInfo()
    .then((profile) => {
      profileTitle.textContent = profile.name;
      profileSubtitle.textContent = profile.about;
    })
    .catch((err) => {
      console.log(err)
    })
  closePopup(popupEditProfile);
  disableButton(formSubmitButton);
  changeSaveButton(buttonSaveEdit, buttonText)
}
//пост новой карточки на сервер
function submitNewCardForm(
  evt,
  loadingText = "Сохранение...",
  buttonText = "Создать"
) {
  evt.preventDefault();
  changeLoadingButton(buttonSaveNewCard, loadingText);
  postNewCard()
    .then((data) => {
      createCardFormSubmit(data);
    })
    .catch((err) => {
      console.log(err);
    });
  changeSaveButton(buttonSaveNewCard, buttonText);
}
buttonEdit.addEventListener("click", () => {
  formInputName.value = profileTitle.textContent;
  formDescription.value = profileSubtitle.textContent;
  openPopup(popupEditProfile, formSubmitButton);
});
buttonAdd.addEventListener("click", () => {
  openPopup(popupAddCard);
});

buttonAvatar.addEventListener('click', () => {
  openPopup(popupAvatar)
})

formEdit.addEventListener("submit", submitProfileForm);
formAdd.addEventListener("submit", submitNewCardForm);
formAvatar.addEventListener('submit', submitAvatarForm);
