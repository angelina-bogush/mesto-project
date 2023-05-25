import '../pages/index.css';
import { formAdd, buttonEdit, formInputName, formDescription, popupEditProfile, buttonAdd, popupAddCard, popupClosingIcon, profileSubtitle, profileTitle, formEdit} from './components/variables';
import {enableValidation} from './components/validate.js';
import { createForm } from './components/card';
import { closePopup, openPopup } from './components/modal';

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

enableValidation()

 formAdd.addEventListener('submit',createForm);