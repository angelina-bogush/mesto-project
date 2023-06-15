import { closePopup} from "./utils";
import { popups } from "./variables";
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

