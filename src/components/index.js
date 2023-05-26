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
  formCreateButton,
  formSubmitButton
} from "./variables";
import { enableValidation } from "./validate.js";
import { createCardFormSubmit } from "./card";
import { closePopup, disableButton, openPopup } from "./utils";

buttonEdit.addEventListener("click", () => {
  formInputName.value = profileTitle.textContent;
  formDescription.value = profileSubtitle.textContent;
  openPopup(popupEditProfile, formSubmitButton);
});
buttonAdd.addEventListener("click", () => {
  openPopup(popupAddCard);
});

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
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formDescription.value;
  closePopup(popupEditProfile);
  disableButton(formSubmitButton);
}
formEdit.addEventListener("submit", submitProfileForm);
formAdd.addEventListener("submit", createCardFormSubmit);

enableValidation({
  formSelector: ".form",
  formInput: ".form__input",
  buttonSelector: ".form__button",
  formErrorTheme: "form__input_theme_error",
  formInputError: "form__input_error",
  inactiveButtonClass: "form__button_inactive",
});
