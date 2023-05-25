import {popups} from './variables';

export function openPopup(popupName) {
  popupName.classList.add("popup_opened");
}
export function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}
//закрытие всех попапов
function closeAllPopups() {
  popups.forEach((popup) => {
    if (popup.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
}

//закрытие попапов на оверлей
popups.forEach((overlay) =>
  overlay.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(overlay);
    }
  })
);
// закрытие на esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllPopups();
  }
});