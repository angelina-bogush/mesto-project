import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotoDescription = this._popupName.querySelector(".popup__description");
    this._popupPhotoImage = this._popupName.querySelector(".popup__image");
  }

  open(link, name) {    
    super.open()
    this._popupPhotoImage.src = link;
    this._popupPhotoDescription.textContent = name;
    this._popupPhotoImage.alt = name;
  };
}



