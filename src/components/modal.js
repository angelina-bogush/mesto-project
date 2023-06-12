import { closePopup, changeLoadingButton, changeSaveButton } from "./utils";
import { popups, avatarLinkInput, profileAvatar, popupAvatar, formAvatar, buttonSaveAvatar } from "./variables";
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

export function submitAvatarForm(evt, loadingText='Сохранение...', buttonText='Сохранить'){
  evt.preventDefault();
  changeLoadingButton(buttonSaveAvatar, loadingText);
  postNewAvatar()
    .then((data) => {
      profileAvatar.src = data.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
  changeSaveButton(buttonSaveAvatar, buttonText);
  closePopup(popupAvatar);
  formAvatar.reset();
}
