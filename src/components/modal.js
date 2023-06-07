import { closePopup } from "./utils";
import { popups, avatarLinkInput, profileAvatar, popupAvatar, formAvatar } from "./variables";
import { postNewAvatar } from "./api";
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

export function editAvatar(evt){
evt.preventDefault();
profileAvatar.src = avatarLinkInput.value;
postNewAvatar();
closePopup(popupAvatar);
formAvatar.reset()
}
