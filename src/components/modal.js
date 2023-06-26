import {  } from "./utils";
import { popups } from "./variables";

export function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener("keydown",handleCloseEscape);
  document.addEventListener('click', closePopupOverlay)
}

export function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleCloseEscape)
}


//закрытие всех попапов
export function closeAllPopups() {
  popups.forEach((popup) => {
    if (popup.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
}
export const handleCloseEscape = (event) => {
  if (event.key === "Escape") {
    const openedPopup =  document.querySelector('.popup_opened');
    closePopup(openedPopup);
  } }
export function closePopupOverlay(evt){
    if(evt.target.classList.contains('popup_opened')){
      closePopup(evt.target)
    }
    }

