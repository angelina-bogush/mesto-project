export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.formInput)
    );
    this._buttonElement = this._formElement.querySelector(
      this._validationConfig.buttonSelector
    );
  }
  //показать и скрыть ошибку формы
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._validationConfig.formErrorTheme);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.formInputError);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._validationConfig.formErrorTheme);
    errorElement.textContent = "";
    errorElement.classList.remove(this._validationConfig.formInputError);
  }

  //проверка валидности поля ввода
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleFormButton(this._inputList);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleFormButton(this._inputList);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  //переключения кнопки формы
  _toggleFormButton() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(
        this._validationConfig.inactiveButtonClass
      );
    }
  }

  disableButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(
      this._validationConfig.inactiveButtonClass
    );
  }

  //есть ли невалидное поле
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  hideError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
