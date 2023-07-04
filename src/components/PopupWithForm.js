import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; 
    this._formElement = this._popupName.querySelector(".form");
    this._buttonSubmit = this._formElement.querySelector(".form__button");
    this._inputList = this._formElement.querySelectorAll(".form__input");
    this._submitButtonText = this._buttonSubmit.textContent;
  }

  _getInputValues() {
    this._formValues = {};

    // значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    //объект значений
    return this._formValues;
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this._buttonSubmit.textContent = loadingText;
    } else {
      this._buttonSubmit.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    //форма должна сбрасываться
    this._formElement.reset();
  }
}