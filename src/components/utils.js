
const handleCloseEscape = (event) => {
  if (event.key === "Escape") {
    const openedPopup =  document.querySelector('.popup_opened');
    closePopup(openedPopup);
  } }

export const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add('form__button_inactive');
}
export function openPopup(popupName) {
    popupName.classList.add("popup_opened");
    document.addEventListener("keydown",handleCloseEscape)
  }
export function closePopup(popupName) {
    popupName.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleCloseEscape)
  }
// export function changeLoading(button, isLoading, loadingText = 'Сохранить', buttonText = 'Сохранение...'){
//   if(isLoading) {
//     button.textContent = loadingText
// } else {
//     button.textContent = buttonText
// }
// }
export function changeLoadingButton(button, loadingText="Сохранение..."){
  button.textContent = loadingText
}
export function changeSaveButton(button, buttonText = 'Сохранить'){
  button.textContent = buttonText
}