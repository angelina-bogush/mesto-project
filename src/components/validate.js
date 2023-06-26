

export class FormValidator {
constructor(validationConfig, formElement) {
  this._validationConfig = validationConfig;
  this._formElement = formElement;
  this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.formInput));
  this._buttonElement = this._formElement.querySelector(this._validationConfig.buttonSelector);
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.formErrorTheme);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.formInputError);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.formErrorTheme);
    errorElement.textContent = "";
    errorElement.classList.remove(this._validationConfig.formInputError);
  }
  _isValid (inputElement) {
    // if (inputElement.validity.patternMismatch) {
    //   inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    // } else {
    //   inputElement.setCustomValidity("");
    // }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners () {
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

  _toggleFormButton () {
    if (this._hasInvalidInput()) {
      this.disableButton()
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    }
  }

  disableButton () {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
  }

  _hasInvalidInput () {
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



// //показать и скрыть ошибку формы
// function showInputError(formElement, inputElement, errorMessage, data) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(data.formErrorTheme);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(data.formInputError);
// }
// function hideInputError(formElement, inputElement, data) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(data.formErrorTheme);
//   errorElement.textContent = "";
//   errorElement.classList.remove(data.formInputError);
// }

// //проверка валидности поля ввода
// const isValid = (formElement, inputElement, data) => {
//   if (inputElement.validity.patternMismatch) {
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//   } else {
//     inputElement.setCustomValidity("");
//   }
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, data);
//   } else {
//     hideInputError(formElement, inputElement, data);
//   }
// };
// //есть ли невалидное поле
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };
// //выключенная кнопка
// export const disableButton = (buttonElement) => {
//   buttonElement.disabled = true;
//   buttonElement.classList.add('form__button_inactive');
// }

// //функция переключения кнопки формы
// const toggleFormButton = (inputList, buttonElement, data) => {
//   if (hasInvalidInput(inputList)) {
//     disableButton(buttonElement)
//   } else {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove(data.inactiveButtonClass);
//   }
// };

// //обработчик всем полям внутри формы
// export const setEventListeners = (formElement, data) => {
//   const inputList = Array.from(formElement.querySelectorAll(data.formInput));
//   const buttonElement = formElement.querySelector(data.buttonSelector);
//   toggleFormButton(inputList, buttonElement, data);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       isValid(formElement, inputElement, data);
//       toggleFormButton(inputList, buttonElement, data);
//     });
//   });
// };

// //обработчик всем формам на странице
// export const enableValidation = (data) => {
//   const formList = Array.from(document.querySelectorAll(data.formSelector));
//   formList.forEach((formElement) => {
//     setEventListeners(formElement,data);
//   });
// };
