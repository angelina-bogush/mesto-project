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
//закрытие попапов на оверлей
popups.forEach((overlay) =>
  overlay.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(overlay);
    }
  })
);

