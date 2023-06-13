
const handleCloseEscape = (event) => {
  if (event.key === "Escape") {
    const openedPopup =  document.querySelector('.popup_opened');
    closePopup(openedPopup);
  } }
export function openPopup(popupName) {
    popupName.classList.add("popup_opened");
    document.addEventListener("keydown",handleCloseEscape)
  }
export function closePopup(popupName) {
    popupName.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleCloseEscape)
  }
export function changeLoading(button, isLoading, buttonText, loadingText = 'Сохранение...'){
  if(isLoading) {
    button.textContent = loadingText
} else {
    button.textContent = buttonText
}
}
// export function setLoadingButton(evt, button, loadingText = 'Сохранение...'){
// evt.preventDefault();
// // const buttonSubmit = evt.target.closest('.form__button');
// const startText = button.textContent;
//   .then(() =>
//     changeLoading(button, true, loadingText, startText))
//   .catch((err) => {
//     console.log(err)
//     })
//   .finally(() => {
//       changeLoading(button, false, loadingText, startText)
// })

// }