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
} from "./variables";
import { enableValidation } from "./validate.js";
import { createForm } from "./card";
import { closePopup, openPopup } from "./utils";
import { closeAllPopups } from "./modal";

buttonEdit.addEventListener("click", () => {
  formInputName.value = profileTitle.textContent;
  formDescription.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
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
//закрытие модальных окон на Esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllPopups();
  }
});

//изменение имени в форме редактирования профиля
function submitForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formDescription.value;
  closePopup(popupEditProfile);
}
formEdit.addEventListener("submit", submitForm);
formAdd.addEventListener("submit", createForm);

enableValidation({
  formSelector: ".form",
  formInput: ".form__input",
  buttonSelector: ".form__button",
  formErrorTheme: "form__input_theme_error",
  formInputError: "form__input_error",
  inactiveButtonClass: "form__button_inactive",
});
