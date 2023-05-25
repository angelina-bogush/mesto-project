import '../pages/index.css';
import { formAdd, buttonEdit, formInputName, formDescription, popupEditProfile, buttonAdd, popupAddCard, popupClosingIcon, profileSubtitle, profileTitle, formEdit} from './components/variables';
import {enableValidation} from './components/validate.js';
import { createForm } from './components/card';
import { closePopup, openPopup } from './components/utils';

buttonEdit.addEventListener("click", () => {
  formInputName.value = profileTitle.textContent;
  formDescription.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});
buttonAdd.addEventListener("click", () => {
  openPopup(popupAddCard);
});

//закрытие всех попапов на крестик
popupClosingIcon.forEach((icon) => icon.addEventListener('click', () => {
const iconsPopup = icon.closest('.popup');
  closePopup(iconsPopup)                                   
}));

//изменение имени в форме редактирования профиля
function submitForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formDescription.value;
  closePopup(popupEditProfile);
}
formEdit.addEventListener('submit', submitForm);
formAdd.addEventListener('submit',createForm);

enableValidation({
    formSelector: '.form',
    formInput: '.form__input',
    buttonSelector: '.form__button',
    formErrorTheme: 'form__input_theme_error',
    formInputError: 'form__input_error',
    inactiveButtonClass: 'form__button_inactive'
});

