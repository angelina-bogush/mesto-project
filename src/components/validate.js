export class Validator {
  
}



//показать и скрыть ошибку формы
function showInputError(formElement, inputElement, errorMessage, data) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(data.formErrorTheme);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(data.formInputError);
}
function hideInputError(formElement, inputElement, data) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(data.formErrorTheme);
  errorElement.textContent = "";
  errorElement.classList.remove(data.formInputError);
}

//проверка валидности поля ввода
const isValid = (formElement, inputElement, data) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, data);
  } else {
    hideInputError(formElement, inputElement, data);
  }
};
//есть ли невалидное поле
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
//выключенная кнопка
export const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add('form__button_inactive');
}

//функция переключения кнопки формы
const toggleFormButton = (inputList, buttonElement, data) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement)
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(data.inactiveButtonClass);
  }
};

//обработчик всем полям внутри формы
export const setEventListeners = (formElement, data) => {
  const inputList = Array.from(formElement.querySelectorAll(data.formInput));
  const buttonElement = formElement.querySelector(data.buttonSelector);
  toggleFormButton(inputList, buttonElement, data);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, data);
      toggleFormButton(inputList, buttonElement, data);
    });
  });
};

//обработчик всем формам на странице
export const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement,data);
  });
};
