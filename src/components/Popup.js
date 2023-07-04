export class Popup {
  constructor(popupSelector) {
    this._popupName = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOverlay = this._handleClickOverlay.bind(this);
  }

  open() {
    this._popupName.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleClickOverlay);
  }

  close() {
    this._popupName.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleClickOverlay);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleClickOverlay(event) {
    if (event.target.classList.contains("popup_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupName
      .querySelector(".popup__close-icon")
      .addEventListener("click", () => this.close());
  }
}

// export function openPopup(popupName) {
//   popupName.classList.add("popup_opened");
//   document.addEventListener("keydown",handleCloseEscape);
//   document.addEventListener('click', closePopupOverlay)
// }

// export function closePopup(popupName) {
//   popupName.classList.remove("popup_opened");
//   document.removeEventListener("keydown", handleCloseEscape)
// }

// //закрытие всех попапов
// export function closeAllPopups() {
//   popups.forEach((popup) => {
//     if (popup.classList.contains("popup_opened")) {
//       closePopup(popup);
//     }
//   });
// }
// export const handleCloseEscape = (event) => {
//   if (event.key === "Escape") {
//     const openedPopup =  document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   } }
// export function closePopupOverlay(evt){
//     if(evt.target.classList.contains('popup_opened')){
//       closePopup(evt.target)
//     }
//     }
