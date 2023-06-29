import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotoDescription = this._popupName.querySelector(".popup__description");
    this._popupPhotoImage = this._popupName.querySelector(".popup__image");
  }

  open(link, name) {    
    super.open()
    popupPhotoImage.src = link;
    popupPhotoDescription.textContent = name;
    popupPhotoImage.alt = name;
  };
}



